import { createMcpHandler } from '@modelcontextprotocol/server';
import { createServer, generateWorkflowAsync, options } from '../mcp/server.mjs';
import { googleFontBytes } from './google-fonts.mjs';
import { parseWorkflowParams, EDITOR_URL, REPO_URL } from '../src/links.js';

const mcp = createMcpHandler(createServer, { maxRequestBodySize: 16384 });
const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, MCP-Protocol-Version, MCP-Session-Id',
  'Access-Control-Expose-Headers': 'MCP-Session-Id, MCP-Protocol-Version',
  'X-Content-Type-Options': 'nosniff',
};
const json = (value, status = 200) =>
  new Response(JSON.stringify(value), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json; charset=utf-8' },
  });
const maxBodyBytes = 16384;
class BodyTooLarge extends Error {}
async function readBody(request) {
  const length = request.headers.get('Content-Length');
  if (length && /^\d+$/.test(length) && Number(length) > maxBodyBytes) {
    void request.body?.cancel().catch(() => {});
    throw new BodyTooLarge();
  }
  if (!request.body) return '';
  const reader = request.body.getReader(),
    decoder = new TextDecoder();
  let size = 0,
    body = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return body + decoder.decode();
      size += value.byteLength;
      if (size > maxBodyBytes) {
        void reader.cancel().catch(() => {});
        throw new BodyTooLarge();
      }
      body += decoder.decode(value, { stream: true });
    }
  } finally {
    reader.releaseLock();
  }
}
export function route(path) {
  return {
    fetch(request) {
      const url = new URL(request.url);
      url.pathname = path;
      return handler.fetch(new Request(url, request));
    },
  };
}
const handler = {
  async fetch(request) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (url.pathname === '/mcp') {
      const response = await mcp.fetch(request);
      const headers = new Headers(response.headers);
      for (const [key, value] of Object.entries(cors)) headers.set(key, value);
      return new Response(response.body, { status: response.status, headers });
    }
    if (url.pathname === '/r' && ['GET', 'HEAD'].includes(request.method))
      return new Response(null, {
        status: 302,
        headers: { ...cors, Location: REPO_URL, 'Cache-Control': 'public, max-age=3600' },
      });
    if (url.pathname === '/font' && request.method === 'GET') {
      try {
        const bytes = await googleFontBytes(
          url.searchParams.get('family'),
          Number(url.searchParams.get('weight') || 400),
        );
        return new Response(bytes, {
          headers: {
            ...cors,
            'Content-Type': 'font/ttf',
            'Cache-Control': 'public, max-age=86400, s-maxage=604800',
          },
        });
      } catch (error) {
        return json({ error: error.message }, 400);
      }
    }
    if (url.pathname === '/svg' && ['GET', 'HEAD'].includes(request.method)) {
      if (url.search.length > 8192) return json({ error: 'Workflow URL is too long.' }, 414);
      try {
        const output = await generateWorkflowAsync(parseWorkflowParams(url.searchParams));
        const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(output.svg));
        const etag =
          '"' +
          Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('') +
          '"';
        const headers = {
          ...cors,
          'Content-Type': 'image/svg+xml; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=86400',
          ETag: etag,
          'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'",
        };
        if (request.headers.get('If-None-Match') === etag)
          return new Response(null, { status: 304, headers });
        return new Response(request.method === 'HEAD' ? null : output.svg, { headers });
      } catch {
        return json(
          {
            error:
              'Invalid workflow settings. Use 3–12 nonempty steps, valid connections, supported options, and valid hex colors.',
          },
          400,
        );
      }
    }
    if (url.pathname === '/generate' && request.method === 'POST') {
      try {
        const body = await readBody(request);
        return json(await generateWorkflowAsync(JSON.parse(body)));
      } catch (error) {
        if (error instanceof BodyTooLarge) return json({ error: 'Request is too large.' }, 413);
        const message = error instanceof Error ? error.message : '';
        return json(
          {
            error: message.startsWith('Google')
              ? message
              : 'Invalid workflow configuration or font could not be loaded.',
          },
          400,
        );
      }
    }
    if (url.pathname === '/options' && request.method === 'GET') return json(options());
    if (url.pathname === '/' && ['GET', 'HEAD'].includes(request.method))
      return json({
        name: 'readme-flow-svg image service',
        generator: EDITOR_URL,
        image: '/svg?steps=Upload;Validate;Compress;Download',
        generate: '/generate',
        mcp: '/mcp',
        repository: REPO_URL,
      });
    return json({ error: 'Not found.' }, 404);
  },
};
export default handler;
