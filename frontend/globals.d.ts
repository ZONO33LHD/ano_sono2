declare namespace NodeJS {
    interface ProcessEnv {
      // next-auth.js
      readonly NEXTAUTH_SECRET: string;
      readonly NEXTAUTH_URL: string;
    }
  }