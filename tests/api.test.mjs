import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../server/handler.js';
import svgRoute from '../api/svg.js';
import generateRoute from '../api/generate.js';
import { normalizeConfig, renderSvg } from '../src/svg.js';
import { imageUrl, workflowMarkdown, parseWorkflowParams } from '../src/links.js';
import { Client } from '@modelcontextprotocol/client';
import { StdioClientTransport } from '@modelcontextprotocol/client/stdio';
import { resolve } from 'node:path';

function assertToolAnnotations(tools) {
  for (const tool of tools) {
    assert.deepEqual(
      tool.annotations,
      {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: tool.name === 'generate_workflow',
      },
      `${tool.name} must expose all four boolean hints`,
    );
  }
}

test('generation enforces the byte limit during streamed reads and cancels excess input', async () => {
  let cancelled = false,
    reads = 0;
  const stream = new ReadableStream(
    {
      pull(controller) {
        reads++;
        controller.enqueue(new Uint8Array(8192));
      },
      cancel() {
        cancelled = true;
      },
    },
    { highWaterMark: 0 },
  );
  const response = await worker.fetch(
    new Request('https://example.com/generate', {
      method: 'POST',
      body: stream,
      duplex: 'half',
      headers: { 'Content-Length': '1' }, // A false declaration must not bypass the streaming limit.
    }),
  );
  assert.equal(response.status, 413);
  assert.deepEqual(await response.json(), { error: 'Request is too large.' });
  assert.equal(cancelled, true);
  assert.equal(reads, 3);

  let earlyReads = 0,
    earlyCancelled = false;
  const early = new ReadableStream(
    {
      pull() {
        earlyReads++;
      },
      cancel() {
        earlyCancelled = true;
      },
    },
    { highWaterMark: 0 },
  );
  const rejected = await worker.fetch(
    new Request('https://example.com/generate', {
      method: 'POST',
      body: early,
      duplex: 'half',
      headers: { 'Content-Length': '16385' },
    }),
  );
  assert.equal(rejected.status, 413);
  assert.equal(earlyReads, 0);
  assert.equal(earlyCancelled, true);
});

test('streaming accepts exactly 16 KB and handles split UTF-8 and failed reads', async () => {
  const payload = JSON.stringify({ steps: ['Build é', 'Test', 'Ship'] });
  const bytes = new TextEncoder().encode(
    payload + ' '.repeat(16384 - new TextEncoder().encode(payload).length),
  );
  let cursor = 0;
  const response = await worker.fetch(
    new Request('https://example.com/generate', {
      method: 'POST',
      duplex: 'half',
      body: new ReadableStream({
        pull(controller) {
          if (cursor === bytes.length) controller.close();
          else controller.enqueue(bytes.subarray(cursor, ++cursor));
        },
      }),
    }),
  );
  assert.equal(response.status, 200);
  assert.equal((await response.json()).config.steps[0], 'Build é');
  const oversized = await worker.fetch(
    new Request('https://example.com/generate', {
      method: 'POST',
      body: 'é'.repeat(8193),
    }),
  );
  assert.equal(oversized.status, 413);
  const failed = await worker.fetch(
    new Request('https://example.com/generate', {
      method: 'POST',
      duplex: 'half',
      body: new ReadableStream({
        start(controller) {
          controller.error(Error('Disconnected'));
        },
      }),
    }),
  );
  assert.equal(failed.status, 400);
});

test('Vercel adapters preserve URL settings, request bodies and HTTP methods', async () => {
  const response = await svgRoute.fetch(
    new Request('https://example.com/api/svg?steps=Build;Test;Ship&traveler=rocket'),
  );
  assert.equal(response.status, 200);
  assert.ok((await response.text()).includes('data-element="rocket"'));
  const head = await svgRoute.fetch(new Request('https://example.com/api/svg', { method: 'HEAD' }));
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
  const generated = await generateRoute.fetch(
    new Request('https://example.com/api/generate', {
      method: 'POST',
      body: JSON.stringify({ steps: ['Build', 'Test', 'Ship'], theme: 'github' }),
    }),
  );
  assert.equal(generated.status, 200);
  assert.equal((await generated.json()).config.theme, 'github');
});

test('hosted image URLs preserve exact steps, icons, custom colors and motion', async () => {
  const config = normalizeConfig({
    steps: ['Read; parse', 'Validate [input]', 'Ship & smile'],
    icons: ['file', 'shield', 'deploy'],
    theme: 'custom',
    customTheme: { accent: '#fc9', background: '#0c1420' },
    traveler: 'rocket',
    duration: 4,
  });
  const url = imageUrl(config),
    parsed = normalizeConfig(parseWorkflowParams(new URL(url).searchParams));
  assert.deepEqual(parsed, config);
  const response = await worker.fetch(new Request(url));
  assert.equal(response.status, 200);
  assert.ok(response.headers.get('Content-Type').startsWith('image/svg+xml'));
  assert.equal(await response.text(), renderSvg(config));
  const markdown = workflowMarkdown(config);
  assert.ok(markdown.startsWith('[!['));
  assert.ok(markdown.includes(url));
  assert.ok(!markdown.includes('./workflow.svg'));
  assert.ok(workflowMarkdown(config, true).endsWith('(./workflow.svg)'));
});
test('SVG service is cacheable and supports HEAD and conditional requests', async () => {
  const url = 'https://example.com/svg?steps=Upload;Validate;Download&theme=github&traveler=file';
  const response = await worker.fetch(new Request(url));
  assert.equal(response.status, 200);
  assert.ok(response.headers.get('Cache-Control').includes('public'));
  const etag = response.headers.get('ETag');
  assert.ok(etag);
  const cached = await worker.fetch(new Request(url, { headers: { 'If-None-Match': etag } }));
  assert.equal(cached.status, 304);
  assert.equal(await cached.text(), '');
  const head = await worker.fetch(new Request(url, { method: 'HEAD' }));
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
  assert.equal(head.headers.get('ETag'), etag);
});
test('invalid configurations fail without producing executable markup', async () => {
  for (const query of [
    'steps=One;Two',
    'steps=%5Bbroken',
    'theme=__proto__',
    'customTheme=%7B%22accent%22%3A%22%3Cscript%3E%22%7D',
    'duration=hello',
  ])
    assert.equal((await worker.fetch(new Request('https://example.com/svg?' + query))).status, 400);
  const escaped = await worker.fetch(
    new Request('https://example.com/svg?steps=%3Cscript%3E;Safe;Done'),
  );
  assert.equal(escaped.status, 200);
  assert.ok(!(await escaped.text()).includes('<script>'));
  const tooLong = await worker.fetch(
    new Request('https://example.com/svg?steps=' + 'x'.repeat(9000)),
  );
  assert.equal(tooLong.status, 414);
});
test('REST generation and repository redirect expose the expected public contract', async () => {
  const response = await worker.fetch(
    new Request('https://example.com/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preset: 'ai', theme: 'ocean', traveler: 'spark' }),
    }),
  );
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.ok(result.svg.startsWith('<svg'));
  assert.ok(result.markdown.includes('/svg?'));
  assert.equal(result.config.preset, 'ai');
  const redirect = await worker.fetch(new Request('https://example.com/r'));
  assert.equal(redirect.status, 302);
  assert.equal(redirect.headers.get('Location'), 'https://github.com/infinuts/readme-flow-svg');
});
test('MCP HTTP transport initializes, lists tools and generates SVGs', async () => {
  async function rpc(method, params, id) {
    const response = await worker.fetch(
      new Request('https://example.com/mcp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/event-stream',
        },
        body: JSON.stringify({ jsonrpc: '2.0', id, method, params }),
      }),
    );
    assert.equal(response.status, 200);
    const text = await response.text();
    return response.headers.get('Content-Type').includes('text/event-stream')
      ? JSON.parse(
          text
            .split('\n')
            .find((line) => line.startsWith('data:'))
            .slice(5),
        )
      : JSON.parse(text);
  }
  const init = await rpc(
    'initialize',
    {
      protocolVersion: '2025-03-26',
      capabilities: {},
      clientInfo: { name: 'tests', version: '1.0.0' },
    },
    1,
  );
  assert.equal(init.result.serverInfo.name, 'readme-flow-svg');
  const listed = await rpc('tools/list', {}, 2);
  assertToolAnnotations(listed.result.tools);
  assert.deepEqual(listed.result.tools.map((t) => t.name).sort(), [
    'generate_workflow',
    'list_options',
  ]);
  const result = await rpc(
    'tools/call',
    {
      name: 'generate_workflow',
      arguments: { steps: ['Build', 'Test', 'Ship'], theme: 'github', traveler: 'rocket' },
    },
    3,
  );
  assert.equal(result.result.isError, undefined);
  assert.ok(result.result.structuredContent.svg.includes('Build'));
  assert.ok(result.result.structuredContent.markdown.includes('/svg?'));
});
test('official MCP client connects over stdio and rejects invalid input', async () => {
  const client = new Client({ name: 'readme-flow-svg-test', version: '1.0.0' }),
    transport = new StdioClientTransport({
      command: process.execPath,
      args: [resolve('mcp/stdio.mjs')],
    });
  try {
    await client.connect(transport);
    const tools = await client.listTools();
    assert.equal(tools.tools.length, 2);
    assertToolAnnotations(tools.tools);
    const options = await client.callTool({ name: 'list_options', arguments: {} });
    assert.equal(Object.keys(options.structuredContent.presets).length, 9);
    const result = await client.callTool({
      name: 'generate_workflow',
      arguments: { steps: ['Upload', 'Validate', 'Download'], theme: 'github' },
    });
    assert.ok(result.structuredContent.svg.startsWith('<svg'));
    assert.ok(result.structuredContent.markdown.includes('/svg?'));
    const invalid = await client.callTool({
      name: 'generate_workflow',
      arguments: { steps: ['Only one'] },
    });
    assert.equal(invalid.isError, true);
  } finally {
    await client.close();
  }
});
