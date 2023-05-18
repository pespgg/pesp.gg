import { SITE } from "./utils/site.js";

export default {
  app: {
    head: {
      title: SITE.name.full,
      htmlAttrs: {
        lang: "es"
      },
      bodyAttrs: {
        "data-bs-theme": "dark"
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        { name: "robots", content: "index, follow" },
        { name: "apple-mobile-web-app-title", content: SITE.name.full },
        { name: "application-name", content: SITE.name.full },
        { name: "msapplication-TileColor", content: "#071018" },
        { name: "theme-color", content: "#071018" }
      ],
      link: [
        { href: "/fonts/Gilroy-Bold.woff", rel: "preload", as: "font", crossorigin: true, type: "font/woff" },
        { href: "/fonts/Gilroy-Regular.woff", rel: "preload", as: "font", crossorigin: true, type: "font/woff" },
        { href: "/fonts/Gilroy-SemiBold.woff", rel: "preload", as: "font", crossorigin: true, type: "font/woff" }
      ]
    }
  },
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "~/assets/css/main.css",
    "~/assets/css/dark.css",
    "~/assets/css/transitions.css"
  ],
  modules: [
    "nuxt-icons",
    "@pinia/nuxt"
  ],
  pinia: {
    autoImports: [
      "defineStore",
      ["defineStore", "definePiniaStore"]
    ]
  },
  imports: {
    dirs: ["stores"]
  },
  experimental: {
    payloadExtraction: true
  },
  nitro: {
    prerender: {
      crawlLinks: true
    }
  }
};
