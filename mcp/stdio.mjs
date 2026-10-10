import {serveStdio} from '@modelcontextprotocol/server/stdio';
import {createServer} from './server.mjs';
await serveStdio(createServer);
