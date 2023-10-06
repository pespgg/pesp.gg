import type { RouteMeta } from "vue-router";

export {};

declare global {
  interface PespSession {
    user?: PespUser;
  }
  interface PespUser {
    username: string;
  }
  interface PespPost {
    permalink: string;
    titulo: string;
    tag: string;
    visible: number;
    updated: number;
    fecha: number;
  }
  interface PespEditorMeta extends RouteMeta {
    edit?: boolean;
    data?: {
      titulo: string;
      content: string;
      banner: {
        src: string;
        type: string;
      };
      tag: string;
      fecha: string;
      permalink: string;
      visible: boolean;
      updated: number;
    }
  }
}
