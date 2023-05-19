import { readdirSync } from "fs";
import { SITE } from "./utils/site.js";

const banners = readdirSync("./public/images/banners");
const preload_banners = banners.map((image) => {
  return { rel: "preload", href: `${SITE.dirs.banners}/${image}`, as: "image", fetchpriority: "high" };
});

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
        { rel: "preload", href: "/fonts/Gilroy-Bold.woff", as: "font", type: "font/woff" },
        { rel: "preload", href: "/fonts/Gilroy-Regular.woff", as: "font", type: "font/woff" },
        { rel: "preload", href: "/fonts/Gilroy-SemiBold.woff", as: "font", type: "font/woff" },
        ...preload_banners
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
