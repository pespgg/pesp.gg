<script setup lang="ts">
import { twFlagPanama } from "nuxt-twemoji/emojis";

const { data: posts } = await useFetch("/api/posts", {
  query: {
    props: ["titulo", "fecha", "permalink", "updated"].join(","),
    limit: 2
  }
});
</script>

<template>
  <!-- Footer -->
  <footer class="text-center text-white bg-dark">
    <section class="d-flex justify-content-between px-4 py-3 bg-primary">
      <div class="me-3">
        <p class="m-0">{{ t("keep_connected") }}</p>
      </div>
      <div>
        <a v-for="(social, i) of SITE.socials" :key="i" class="text-white me-4" :href="social.link" target="_blank" :title="social.name">
          <Icon :name="social.icon" size="1.2rem" />
        </a>
      </div>
    </section>
    <section>
      <div class="container-fluid text-center text-md-start mt-5">
        <div class="row mt-3 overflow-hidden">
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <Icon class="mb-3 w-100 p-2 p-sm-0" name="LogoFull" width="100%" height="100" />
            <p>{{ SITE.description }}</p>
          </div>
          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold">{{ t("sobre_nosotros") }}</h6>
            <hr class="mb-4 mt-0 d-inline-block mx-auto" style="width: 60px;">
            <p v-for="(item, i) of footer.sobre_nosotros" :key="i" class="scale-hover">
              <NuxtLink :to="item.link" class="text-white">{{ item.name }}</NuxtLink>
            </p>
          </div>
          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold">{{ t("ayuda") }}</h6>
            <hr class="mb-4 mt-0 d-inline-block mx-auto" style="width: 60px;">
            <p v-for="(item, i) of footer.ayuda" :key="i" class="scale-hover">
              <NuxtLink :to="item.link" class="text-white">{{ item.name }}</NuxtLink>
            </p>
          </div>
          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h5 class="text-uppercase fw-bold">{{ t("ultimo") }}</h5>
            <NuxtLink v-for="(post, i) of posts" :key="i" class="d-flex align-items-center mb-2 text-white" :to="`/p/${post.permalink}`">
              <div class="lo-ultimo">
                <img class="rounded" :src="getPostImage(post.permalink, post.updated)" :alt="post.titulo">
              </div>
              <div class="ms-2 small text-start">
                <p class="m-0">{{ post.titulo }}</p>
                <div class="d-flex align-items-center">
                  <Icon name="solar:calendar-linear" />
                  <p class="text-body ms-1 m-0"> {{ formatDate(post.fecha) }}</p>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    <div class="d-flex flex-wrap p-3 align-items-center justify-content-center small" style="background-color: rgba(0, 0, 0, 0.2)">
      <span class="me-2">
        {{ t("copyright") }}. © PESP.GG {{ currentYear() }}.
      </span>
      <Twemoji :emoji="twFlagPanama" size="1.2rem" />
    </div>
  </footer>
</template>

<script lang="ts">
export default {
  name: "FooterPage",
  data () {
    return {
      footer: {
        sobre_nosotros: [
          {
            name: t("nosotros"),
            link: SCHEMA_pages.nosotros.to
          },
          {
            name: t("servicios"),
            link: SCHEMA_pages.servicios.to
          },
          {
            name: t("contacto"),
            link: SCHEMA_pages.contacto.to
          }
        ],
        ayuda: [
          {
            name: t("faq"),
            link: "/faq"
          },
          {
            name: t("privacy"),
            link: "/privacy"
          },
          {
            name: t("tos"),
            link: "/tos"
          }
        ]
      }
    };
  }
};
</script>
