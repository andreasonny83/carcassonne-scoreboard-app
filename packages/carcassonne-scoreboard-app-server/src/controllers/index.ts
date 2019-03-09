import fetch from 'node-fetch';
(global as any).fetch = fetch;

export * from './main';
export * from './admin';
