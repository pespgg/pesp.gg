<script setup>
const { data: posts } = await useFetch("/api/posts", {
  query: {
    props: ["image", "titulo_es", "titulo_en", "fecha", "permalink"].join(","),
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
          <Icon :name="social.icon" />
        </a>
      </div>
    </section>
    <section>
      <div class="container-fluid text-center text-md-start mt-5">
        <div class="row mt-3">
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <Icon class="mb-3" name="brand/full" size="full" />
            <p>{{ SITE.description }}</p>
          </div>
          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold">{{ t("sobre_nosotros") }}</h6>
            <hr class="mb-4 mt-0 d-inline-block mx-auto" style="width: 60px;">
            <p v-for="(item, i) of footer.sobre_nosotros" :key="i">
              <NuxtLink :to="item.link" class="text-white">{{ item.name }}</NuxtLink>
            </p>
          </div>
          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold">{{ t("ayuda") }}</h6>
            <hr class="mb-4 mt-0 d-inline-block mx-auto" style="width: 60px;">
            <p v-for="(item, i) of footer.ayuda" :key="i">
              <NuxtLink :to="item.link" class="text-white">{{ item.name }}</NuxtLink>
            </p>
          </div>
          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h5 class="text-uppercase fw-bold">{{ t("ultimo") }}</h5>
            <NuxtLink v-for="(n, i) of 2" :key="n" class="d-flex align-items-center mb-2 text-white" :to="posts[i].permalink">
              <div class="lo-ultimo">
                <img class="rounded" :src="'https://pesp.gg/images/posts/' + posts[i].image">
              </div>
              <div class="ms-2 small text-start">
                <p class="m-0">{{ posts[i].titulo_es }}</p>
                <p class="text-body m-0"><Icon name="utils/calendar" /> {{ formatDate(posts[i].fecha) }}</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2)">
      <small>
        {{ t("copyright") }}. © PESP.GG {{ currentYear() }}
      </small>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterPage",
  data () {
    return {
      footer: {
        sobre_nosotros: [
          {
            name: t("nosotros"),
            link: "/quienes-somos/"
          },
          {
            name: t("servicios"),
            link: "/servicios/"
          },
          {
            name: t("contacto"),
            link: "/contacto/"
          }
        ],
        ayuda: [
          {
            name: t("faq"),
            link: "/faq/"
          },
          {
            name: t("privacy"),
            link: "/privacy/"
          },
          {
            name: t("tos"),
            link: "/tos/"
          }
        ]
      }
    };
  }
};
</script>
