declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    DB: string;
    JWT_SECRET: string;
  }
}
