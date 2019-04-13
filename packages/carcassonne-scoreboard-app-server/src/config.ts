import { config as dotEnvConfig } from 'dotenv';

class Config {
  public static getInstance() {
    if (!Config.instance) {
      Config.instance = new Config();
    }

    return Config.instance;
  }

  private static instance: Config;
  private envName: string;
  private port: string;

  private constructor() {
    this.envName = process.env.NODE_ENV || 'development';
    this.port = process.env.PORT || '8888';
    dotEnvConfig();
  }

  public getEnv() {
    return this.envName;
  }

  public getPort() {
    return this.port;
  }

  public isDev() {
    return this.envName === 'development';
  }

  public isPlaygroundEnabled() {
    return process.env.PLAYGROUND_ENABLED === 'true';
  }

  public isDebug() {
    return process.env.DEBUG === 'true';
  }

  public get(propName: string) {
    if (propName === 'NODE_ENV') {
      return this.getEnv();
    }

    if (propName === 'PORT') {
      return this.getPort();
    }

    return process.env[propName];
  }
}

const configInstance = Config.getInstance();

export type IConfig = typeof configInstance;
export const config = configInstance;
