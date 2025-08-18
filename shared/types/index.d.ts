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
    fecha: number;
    updatedAt: number;
    createdAt: number;
  }
  interface PespEditorMeta extends RouteMeta {
    edit?: boolean;
    data?: {
      titulo: string;
      content: string;
      banner: {
        file: File | null | undefined;
        src: string;
        type: string;
      };
      tag: string;
      fecha: string;
      permalink: string;
      visible: boolean;
      updatedAt: number;
      createdAt: number;
    };
  }
  interface PespStats {
    title: string;
    icon?: string;
    counter?: number;
    seguidores?: boolean;
    carousel?: {
      icon: string;
      title: string;
    }[];
  }
  interface PespToast {
    message: string;
    success: boolean;
    id?: number;
  }
  type Locale = "en" | "es";
}
