import cors, { CorsOptions } from 'cors';
import { RequestHandler } from 'express';

export interface CorsConfig {
  whitelist?: string[];
}

const serverConfig: CorsConfig = {
  whitelist: ['localhost'],
};

const corsOptions = (whitelist?: string[]): CorsOptions => ({
  origin(origin: any, callback: (err: Error | null, allow?: boolean) => void) {
    if (!(whitelist && whitelist.length)) {
      callback(null, true);
    }

    console.log(origin, 'Is whitelisted?', whitelist!.indexOf(origin) !== -1);

    if (whitelist!.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
});

const options: CorsOptions = corsOptions(serverConfig.whitelist);

export const corsMiddleware: RequestHandler = cors(options);
