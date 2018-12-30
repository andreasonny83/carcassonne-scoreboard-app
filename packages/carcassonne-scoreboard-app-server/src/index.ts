import { server } from './server';
import { config } from './config';
import { app } from './app';

const port: string = config.getPort();

server.start(app, port);
