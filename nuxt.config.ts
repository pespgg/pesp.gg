import { SITE } from "./utils/site";

export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: SITE.name.full,
      htmlAttrs: {
        lang: "es"
      },
      meta: [
        { name: "robots", content: "index, follow" },
        { name: "apple-mobile-web-app-title", content: SITE.name.web },
        { name: "application-name", content: SITE.name.web },
        { name: "msapplication-TileColor", content: "#071018" },
        { name: "theme-color", content: "#071018" },
        { name: "apple-mobile-web-app-capable", content: SITE.name.web },
        { property: "og:type", content: "website" },
        { property: "og:title", content: SITE.name.web },
        { property: "og:site_name", content: SITE.name.full },
        { property: "og:image", content: `${SITE.url}/images/card.jpg` },
        { property: "og:image:alt", content: SITE.name.full },
        { property: "og:image:width", content: 400 },
        { property: "og:image:height", content: 400 },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:image", content: `${SITE.url}/images/card.jpg` },
        { name: "twitter:site", content: SITE.twitter }
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
    "~/assets/css/theme.css",
    "~/assets/css/transitions.css",
    "~/assets/css/glidejs.css",
    "~/assets/css/forms.css"
  ],

  modules: [
    "nuxt-icon",
    "nuxt-twemoji",
    "@nuxtjs/turnstile",
    "nuxt-simple-sitemap"
  ],

  turnstile: {
    siteKey: "0x4AAAAAAAFcwNNtzi_jhLif",
    addValidateEndpoint: true
  },

  imports: {
    dirs: ["utils/schema"]
  },

  runtimeConfig: {
    session: {
      name: "nuxt-session",
      password: ""
    },
    mail: {
      bcc: "",
      from: "",
      fromName: "",
      host: "",
      port: "",
      login: "",
      pass: ""
    },
    turnstile: {
      secretKey: ""
    },
    cloudflare: {
      apiKey: "",
      email: "",
      account: "",
      zoneTag: ""
    }
  },

  site: {
    url: SITE.url
  },

  sitemap: {
    dynamicUrlsApiEndpoint: "/__sitemap",
    xslColumns: [
      { label: "URL", width: "65%" },
      { label: "Priority", select: "sitemap:priority", width: "12.5%" },
      { label: "Last Modified", select: "sitemap:lastmod", width: "35%" }
    ]
  },

  routeRules: {
    "/": { sitemap: { priority: 1 } },
    "/*/**": { sitemap: { priority: 0.8 } },
    "/admin/**": { index: false },
  },

  experimental: {
    inlineSSRStyles: false,
    appManifest: false
  }
});
