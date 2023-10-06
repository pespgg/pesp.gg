export {};

declare global {
  interface PespSession {
    user?: PespUser;
  }
  interface PespUser {
    username: string;
  }
}
