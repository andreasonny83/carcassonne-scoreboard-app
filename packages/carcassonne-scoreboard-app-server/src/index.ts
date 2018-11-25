import fetch from 'node-fetch';
import { server } from './server';

const PORT: number = Number(process.env.PORT) || 8888;

export interface Global {
  fetch: any;
}

global.fetch = fetch;

declare var global: Global;

server.setPort(PORT).start();
