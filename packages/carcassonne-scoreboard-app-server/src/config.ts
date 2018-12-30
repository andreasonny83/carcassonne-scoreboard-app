import { config as dotEnvConfig } from 'dotenv';

export interface IConfig {
  get(propName: string): string | undefined;
  isDebug(): boolean;
  isDev(): boolean;
  getEnv(): string;
  getPort(): string;
}

class Config implements IConfig {
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

  public isDebug() {
    return this.envName !== 'production';
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

export const config: IConfig = Config.getInstance();
