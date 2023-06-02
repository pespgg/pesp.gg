<script setup>
useSeoMeta({
  title: `${t("nosotros")} | ${SITE.name.web}`,
  description: t("nosotros_description"),
  keywords: t("nosotros_keywords"),
  ogUrl: `${SITE.url}/quienes-somos/`,
  ogTitle: `${t("nosotros")} | ${SITE.name.web}`,
  ogDescription: t("nosotros_description"),
  twitterTitle: `${t("nosotros")} | ${SITE.name.web}`,
  twitterDescription: t("nosotros_description")
});

useHead({
  link: [
    { rel: "canonical", href: `${SITE.url}/quienes-somos/` }
  ]
});
</script>

<template>
  <main>
    <!-- Banner -->
    <BannerPage banner="quienes-somos.jpg" :text="t('nosotros')" />
    <section id="quienes-somos">
      <div class="container py-5">
        <template v-for="(nosotros, i) of SCHEMA.nosotros" :key="i">
          <div :id="nosotros.title" class="row m-0 p-0 bg-dark rounded overflow-hidden" :class="{ 'mb-4': i < SCHEMA.nosotros.length - 1 }">
            <!-- Info col -->
            <div class="col-md-8 col-lg-6 p-sm-4 shadow" :class="i % 2 ? 'order-1 order-md-2' : 'order-1 order-md-1'">
              <h3 class="text-uppercase mb-4 mt-4"><strong>{{ t(nosotros.title) }}</strong></h3>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <p v-for="(p, j) of nosotros.content" :key="j" v-html="t(p)" />
            </div>
            <!-- Image col -->
            <div class="col-md-4 col-lg-6 p-0 text-center shadow overflow-hidden" :class="i % 2 ? 'order-2 order-md-1' : 'order-2 order-md-2'">
              <div class="carousel slide h-100">
                <div class="carousel-indicators">
                  <button v-for="j of nosotros.images.length" :key="j" type="button" :data-bs-target="`#${nosotros.title} .carousel`" :data-bs-slide-to="j" :class="{ active: !j }" aria-current="true" aria-label="Slide" />
                </div>
                <div class="carousel-inner h-100">
                  <div v-for="(image, j) of nosotros.images" :key="j" class="carousel-item scale-hover h-100" :class="{ active: !j }" data-bs-interval="10000">
                    <img :src="`${SITE.dirs.nosotros}/${image}`" class="img-fluid w-100 h-100 object-fit-cover" :alt="t(nosotros.title)">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>
    <StatsBand :stats="SCHEMA.stats.socials" :col="3" />
    <section id="comentarios">
      <div class="container-fluid py-5 bg-dark">
        <h2 class="text-center text-uppercase mb-4">
          <strong>{{ t("comentarios") }}</strong>
        </h2>
        <div class="glide-wrapper rounded">
          <div class="glide">
            <div class="glide__track" data-glide-el="track">
              <ul class="glide__slides">
                <li v-for="(comentario, i) of SCHEMA.comentarios" :key="i" class="glide__slide p-0 px-sm-3" :class="{'glide__slide--active': !i}">
                  <div class="rounded shadow bg-light p-3 p-sm-4 text-center position-relative">
                    <img class="rounded-circle shadow-sm mb-3 p-2" :src="`${SITE.dirs.marcas}/${comentario.image}`" width="130" height="130" :alt="comentario.marca">
                    <p class="text-dark m-0">
                      <Icon name="fa6-solid:quote-left" />
                      {{ t(comentario.content) }}
                      <Icon name="fa6-solid:quote-right" />
                    </p>
                    <h5 class="text-end text-dark mt-3">
                      <strong>— {{ t(comentario.marca) }}</strong>
                    </h5>
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
          </div>
        </div>
      </div>
    </section>
    <section id="galeria">
      <div class="container-fluid py-5">
        <h2 class="text-center text-uppercase mb-4">
          <strong>{{ t("galeria") }}</strong>
        </h2>
        <div class="glide-wrapper overflow-hidden rounded">
          <div class="glide bullets">
            <div class="glide__track" data-glide-el="track">
              <ul class="glide__slides">
                <li v-for="(image, i) of SCHEMA.galeria" :key="i" class="glide__slide p-0 px-sm-3" :class="{'glide__slide--active': !i}">
                  <img :src="`${SITE.dirs.galeria}/${image}`" class="img-fluid w-100 rounded shadow">
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
              <button v-for="(caso, i) of SCHEMA.galeria" :key="i" class="glide__bullet" :data-glide-dir="`=${i}`" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  mounted () {
    SCHEMA.nosotros.forEach((nosotros) => {
      this.$nuxt.$bootstrap.startCarousel(`#${nosotros.title} .carousel`);
    });

    this.$nuxt.$glide("#comentarios .glide", {
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

    this.$nuxt.$glide("#galeria .glide", {
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
