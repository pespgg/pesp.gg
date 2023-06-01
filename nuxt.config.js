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
        { name: "apple-mobile-web-app-title", content: SITE.name.web },
        { name: "application-name", content: SITE.name.web },
        { name: "msapplication-TileColor", content: "#071018" },
        { name: "theme-color", content: "#071018" },
        { name: "apple-mobile-web-app-capable", content: SITE.name.web }
      ],
      link: [
        { rel: "preload", href: "/fonts/Gilroy-Bold.woff", as: "font", type: "font/woff", crossorigin: "anonymous" },
        { rel: "preload", href: "/fonts/Gilroy-Regular.woff", as: "font", type: "font/woff", crossorigin: "anonymous" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "icon", type: "image/png", sizes: "192x192", href: "/android-chrome-192x192.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#f80357" }
      ]
    }
  },

  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "@glidejs/glide/dist/css/glide.core.min.css",
    "@glidejs/glide/dist/css/glide.theme.min.css",
    "~/assets/css/main.css",
    "~/assets/css/dark.css",
    "~/assets/css/transitions.css",
    "~/assets/css/glidejs.css",
    "~/assets/css/forms.css"
  ],

  modules: [
    "nuxt-icon",
    "nuxt-twemoji",
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
  },
  devtools: {
    enabled: true
  }
};
