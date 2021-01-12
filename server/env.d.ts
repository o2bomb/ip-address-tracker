declare namespace NodeJS {
  export interface ProcessEnv {
    IPIFY_SECRET_KEY: string;
    CORS_ORIGIN: string;
    PORT: string;
  }
}
