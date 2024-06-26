<script setup lang="ts">
useSeoMeta({
  title: `${t("servicios")} | ${SITE.name.web}`,
  description: t("servicios_description"),
  keywords: t("servicios_keywords"),
  ogUrl: `${SITE.url}/servicios/`,
  ogTitle: `${t("servicios")} | ${SITE.name.web}`,
  ogDescription: t("servicios_description"),
  twitterTitle: `${t("servicios")} | ${SITE.name.web}`,
  twitterDescription: t("servicios_description")
});

useHead({
  link: [
    { rel: "canonical", href: `${SITE.url}/servicios` }
  ]
});
</script>

<template>
  <main>
    <!-- Banner -->
    <BannerPage banner="servicios.jpg" :text="t('servicios')" />
    <section id="servicios">
      <div class="container py-5">
        <template v-for="(servicio, i) of SCHEMA_servicios" :key="i">
          <div :id="servicio.title" class="row m-0 p-0 bg-dark rounded overflow-hidden" :class="{ 'mb-4': i < SCHEMA_servicios.length - 1 }">
            <!-- Info col -->
            <div class="col-md-8 col-lg-6 p-sm-4 shadow overflow-hidden" :class="i % 2 ? 'order-1 order-md-2' : 'order-1 order-md-1'">
              <h3 class="text-uppercase mb-4 mt-4" :data-aos="i % 2 ? 'fade-right' : 'fade-left'" data-aos-duration="2000"><strong>{{ t(servicio.title) }}</strong></h3>
              <span data-aos="fade-in" data-aos-duration="3000">
                <!-- eslint-disable-next-line vue/no-v-html -->
                <p v-for="(p, j) of servicio.content" :key="j" v-html="t(p)" />
              </span>
            </div>
            <!-- Image col -->
            <div class="col-md-4 col-lg-6 p-0 text-center shadow overflow-hidden" :class="i % 2 ? 'order-2 order-md-1' : 'order-2 order-md-2'">
              <div class="scale-hover h-100">
                <img class="img-fluid w-100 h-100 object-fit-cover" :src="`${SITE.dirs.servicios}/${servicio.images[1]}`" :alt="t(servicio.title)" data-aos="zoom-out" data-aos-duration="2000">
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>
    <StatsBand :stats="SCHEMA_stats.experience" />
    <section id="casos-exito">
      <div class="container-fluid py-5">
        <h2 class="text-center text-uppercase mb-4">
          <strong>{{ t("casos_exito") }}</strong>
        </h2>
        <div class="glide-wrapper overflow-hidden rounded">
          <div class="glide bullets">
            <div class="glide__track" data-glide-el="track" data-aos="fade-in" data-aos-duration="2000">
              <ul class="glide__slides">
                <li v-for="(caso, i) of SCHEMA_casos_exito" :key="i" class="glide__slide p-0 px-sm-3" :class="{ 'glide__slide--active': !i }">
                  <div class="rounded overflow-hidden shadow bg-dark">
                    <div class="row mx-0">
                      <div class="order-2 order-md-1 col-md-7 p-4">
                        <h3 class="text-uppercase text-light"><strong>{{ t(caso.title) }}</strong></h3>
                        <p class="m-0">{{ t(caso.description) }}</p>
                      </div>
                      <div class="order-1 order-md-2 col-md-5 p-0">
                        <img :src="`${SITE.dirs.casos_exito}/${caso.image}`" class="img-fluid w-100 h-100 object-fit-cover" :alt="t(caso.title)">
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="glide__arrows" data-glide-el="controls">
              <span class="glide__arrow glide__arrow--left shadow" data-glide-dir="<">
                <Icon name="solar:alt-arrow-left-bold" size="30" />
              </span>
              <span class="glide__arrow glide__arrow--right shadow" data-glide-dir=">">
                <Icon name="solar:alt-arrow-right-bold" size="30" />
              </span>
            </div>
            <div class="glide__bullets" data-glide-el="controls[nav]">
              <button v-for="(caso, i) of SCHEMA_casos_exito" :key="i" class="glide__bullet" :data-glide-dir="`=${i}`" :aria-label="caso.title" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="marcas">
      <div class="container-fluid bg-light py-4 text-dark">
        <div class="row align-items-center">
          <div class="col-lg-5">
            <div class="text-center text-dark">
              <h1>
                <strong>{{ t("confian") }}</strong>
              </h1>
              <p class="m-0">{{ t("patrocina") }}</p>
            </div>
          </div>
          <div class="col-lg-7">
            <div class="glide overflow-hidden rounded-pill">
              <div class="glide__track" data-glide-el="track">
                <ul class="glide__slides">
                  <li v-for="(marca, i) of SCHEMA_marcas" :key="i" class="glide__slide" :class="{ 'glide__slide--active': !i }">
                    <img :src="`${SITE.dirs.marcas}/${marca.image}`" class="img-fluid" width="150" height="150" :alt="marca.name" :title="marca.name">
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
export default {
  mounted () {
    this.$nuxt.$glide("#casos-exito .glide", {
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

    this.$nuxt.$glide("#marcas .glide", {
      type: "carousel",
      autoplay: 500,
      animationDuration: 1500,
      perView: 4
    });
  }
};
</script>
