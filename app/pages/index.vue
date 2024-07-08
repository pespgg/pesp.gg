<script setup lang="ts">
const { data: posts } = await useFetch("/api/posts", {
  query: {
    props: ["titulo", "fecha", "permalink", "tag", "updated"].join(","),
    limit: 3
  }
});

const schemaOrg = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE.name.full,
    "alternateName": SITE.name.short,
    "url": SITE.url,
    "logo": `${SITE.url}/images/card.jpg`,
    "sameAs": [
      ...SITE.socials.map(social => social.link),
      SITE.url
    ]
  }
};

useSeoMeta({
  description: t("home_description"),
  keywords: t("home_keywords"),
  ogUrl: SITE.url,
  ogDescription: t("home_description"),
  twitterTitle: `${SITE.name.web} | ${SITE.name.full}`,
  twitterDescription: t("home_description")
});

useHead({
  script: [
    { type: "application/ld+json", children: JSON.stringify(schemaOrg.organization) }
  ],
  link: [
    { rel: "canonical", href: SITE.url }
  ]
});
</script>

<template>
  <main>
    <!-- Banner -->
    <BannerCarousel :banners="banners" />
    <!-- Actualidad Preview -->
    <section id="actualidad">
      <div class="container-fluid py-5">
        <h2 class="text-center text-uppercase mb-4">
          <strong>{{ t("actualidad") }}</strong>
        </h2>
        <div class="glide-wrapper" data-aos="fade-in">
          <div class="glide bullets">
            <div class="glide__track" data-glide-el="track">
              <ul class="glide__slides">
                <li v-for="(post, i) of posts" :key="i" class="glide__slide p-0 px-sm-3" :class="{ 'glide__slide--active': !i }">
                  <article class="card mx-auto border-0 shadow overflow-hidden" itemscope itemtype="https://schema.org/BlogPosting">
                    <div class="overflow-hidden">
                      <img :src="getPostImage(post.permalink, post.updated)" class="card-img-top post" :alt="post.titulo" itemprop="image" data-aos="zoom-out" data-aos-duration="2000">
                    </div>
                    <div class="card-body bg-dark">
                      <h4 class="card-title">
                        <strong>
                          <NuxtLink :to="`/p/${post.permalink}`">
                            <span itemprop="headline">{{ post.titulo }}</span>
                          </NuxtLink>
                        </strong>
                      </h4>
                      <div class="bg-body-tertiary text-light text-center mb-2 rounded small text-uppercase" role="button">{{ getTagName(post.tag) }}</div>
                      <LoadPost :permalink="post.permalink" :truncate="220" />
                    </div>
                    <div class="card-footer bg-dark p-0 rounded-bottom overflow-hidden">
                      <div class="d-flex align-items-center ps-3">
                        <Icon class="text-light" name="solar:calendar-linear" size="1.1rem" />
                        <small class="text-body-secondary ms-1" :title="String(post.fecha)" itemprop="datePublished" :content="formatDate(post.fecha, { type: 'iso' })">
                          {{ formatDate(post.fecha) }}
                        </small>
                        <NuxtLink class="hover ms-auto bg-primary text-light py-1 px-3" :to="`/p/${post.permalink}`">
                          <small>{{ t("abrir") }} <Icon name="solar:arrow-right-bold" size="1.5rem" /></small>
                        </NuxtLink>
                      </div>
                    </div>
                    <div class="d-none" itemprop="author" itemscope itemtype="https://schema.org/Organization">
                      <meta itemprop="name" :content="SITE.name.full">
                      <link itemprop="url" :href="SITE.url">
                    </div>
                  </article>
                </li>
              </ul>
            </div>
            <div class="glide__bullets" data-glide-el="controls[nav]">
              <button v-for="(post, i) of posts" :key="i" class="glide__bullet" :data-glide-dir="`=${i}`" :aria-label="post.titulo" />
            </div>
          </div>
        </div>
        <div class="text-center my-3">
          <NuxtLink :to="SCHEMA_pages.actualidad.to">{{ t("ver_actualidad") }}</NuxtLink>
        </div>
      </div>
    </section>
    <!-- Categorías -->
    <section id="categorias">
      <div class="categorias bg-dark py-5">
        <div class="container">
          <h2 class="text-center text-uppercase mb-4">
            <strong>{{ t("categorias") }}</strong>
          </h2>
          <div class="row">
            <template v-for="(n, i) of 12" :key="i">
              <Transition name="tab">
                <div v-if="n <= 6 || moreCategorias" class="col-6 col-md-4 p-2 p-md-3">
                  <div class="overflow-hidden rounded shadow" data-aos="fade-in" data-aos-duration="2000">
                    <img class="img-fluid" :src="`${SITE.dirs.categorias}/${SCHEMA_categorias[i]!.image}`" :title="SCHEMA_categorias[i]!.name">
                  </div>
                </div>
              </Transition>
            </template>
          </div>
          <div class="text-center mt-4">
            <button class="btn btn-outline-light rounded-pill position-relative px-4" @click="moreCategorias = !moreCategorias">
              {{ moreCategorias ? t("ver_menos") : t("ver_mas") }}
              <Transition name="fade" mode="out-in">
                <Icon v-if="moreCategorias" class="position-absolute bottom-100 start-50 translate-middle-x text-light" name="solar:alt-arrow-up-bold" size="2rem" />
                <Icon v-else class="position-absolute top-100 start-50 translate-middle-x text-light" name="solar:alt-arrow-down-bold" size="2rem" />
              </Transition>
            </button>
          </div>
        </div>
      </div>
    </section>
    <!-- Servicios -->
    <section id="servicios">
      <div class="container py-5">
        <h2 class="text-center text-uppercase mb-4">
          <strong>{{ t("servicios") }}</strong>
        </h2>
        <div class="row">
          <template v-for="(servicio, i) of SCHEMA_servicios" :key="i">
            <div class="col-md-6 p-2 p-md-3">
              <div class="position-relative rounded overflow-hidden scale-position-hover">
                <div class="scale-position">
                  <img class="img-fluid shadow" :src="`${SITE.dirs.servicios}/${servicio.images[0]}`" :alt="t(servicio.title)" data-aos="zoom-out" data-aos-duration="2000">
                </div>
                <NuxtLink class="position-absolute bottom-0 bg-dark w-100 bg-opacity-75 px-3 py-2 text-light d-flex justify-content-between align-items-center" :to="`${SCHEMA_pages.servicios.to}#${servicio.title}`" data-aos="fade-in">
                  <p class="m-0 h5">{{ t(servicio.title) }}</p>
                  <Icon name="solar:square-bottom-up-linear" size="1.5rem" />
                </NuxtLink>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
export default {
  data () {
    return {
      rendered: false,
      moreCategorias: false,
      banners: [
        "home-1.jpg",
        "home-2.jpg",
        "home-3.jpg"
      ]
    };
  },
  mounted () {
    this.$nuxt.$glide("#actualidad .glide", {
      type: "carousel",
      autoplay: 5000,
      animationDuration: 500,
      gap: 0,
      focusAt: "center",
      perView: 1,
      peek: {
        before: 0,
        after: 0
      }
    });
  }
};
</script>
