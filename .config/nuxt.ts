import { SITE } from "../shared/utils/site";

export default defineNuxtConfig({
  // future: { compatibilityVersion: 4 },

  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "nuxt-twemoji",
    "@nuxtjs/turnstile",
    "@nuxtjs/sitemap",
    "nuxt-aos",
    "@nuxthub/core",
    "nuxt-mailchannels",
    "nuxt-email-renderer"
  ],

  $production: {
    nitro: {
      preset: "cloudflare-module"
    }
  },

  imports: {
    dirs: ["utils/schema"]
  },

  devtools: { enabled: true },

  app: {
    pageTransition: { name: "fade", mode: "out-in" },
    layoutTransition: { name: "fade", mode: "out-in" },
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
        { name: "twitter:site", content: SITE.twitter },
        { name: "darkreader-lock", content: "darkreader" }
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
    "ckeditor5/ckeditor5.css",
    "~/assets/css/main.css",
    "~/assets/css/theme.css",
    "~/assets/css/transitions.css",
    "~/assets/css/glidejs.css",
    "~/assets/css/forms.css"
  ],

  site: {
    url: SITE.url
  },

  runtimeConfig: {
    secure: {
      salt: ""
    },
    session: {
      password: ""
    },
    mailchannels: {
      apiKey: "",
      dkim: {
        domain: SITE.domain,
        privateKey: "",
        selector: ""
      },
      from: {
        name: "Panama Esports (PESP)",
        email: `contacto@${SITE.domain}`
      },
      bcc: {
        email: `eventos@${SITE.domain}`
      }
    },
    turnstile: {
      secretKey: ""
    },
    cloudflare: {
      apiKey: "",
      email: "",
      account: "",
      siteTag: ""
    }
  },

  routeRules: {
    "/api/_nuxt_icon/**": { cache: { maxAge: 1.577e+7 } }
  },

  features: {
    inlineStyles: false
  },

  experimental: {
    purgeCachedData: false,
    granularCachedData: false
  },
  compatibilityDate: "2025-12-20",

  nitro: {
    experimental: {
      tasks: true
    },
    cloudflare: {
      pages: {
        routes: {
          exclude: ["/images/*", "/fonts/*"]
        }
      }
    }
  },

  hub: {
    db: {
      dialect: "sqlite",
      casing: "snake_case"
    },
    blob: true
  },

  typescript: {
    tsConfig: {
      include: [
        "../emails/**/*"
      ]
    }
  },

  eslint: {
    config: {
      autoInit: false,
      stylistic: true
    }
  },

  icon: {
    mode: "svg",
    clientBundle: {
      scan: true,
      sizeLimitKb: 2048
    }
  },

  sitemap: {
    sources: ["/api/__sitemap__"],
    exclude: ["/admin/**"],
    urls: [
      { loc: "/", priority: 1, lastmod: new Date().toISOString() }
    ],
    defaults: { priority: 0.8, lastmod: new Date().toISOString() },
    xslColumns: [
      { label: "URL", width: "65%" },
      { label: "Priority", select: "sitemap:priority", width: "12.5%" },
      { label: "Last Modified", select: "sitemap:lastmod", width: "35%" }
    ]
  },

  turnstile: {
    siteKey: "0x4AAAAAAAFcwNNtzi_jhLif",
    addValidateEndpoint: true
  }
});
