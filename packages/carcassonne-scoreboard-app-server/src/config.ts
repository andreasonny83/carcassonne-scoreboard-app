import { config as dotEnvConfig } from 'dotenv';
dotEnvConfig();

class Config {
  private envName: string;

  constructor() {
    this.envName = process.env.NODE_ENV || 'development';
  }
  public getEnv() {
    return this.envName;
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

    return process.env[propName];
  }
}

export const config: Config = new Config();
