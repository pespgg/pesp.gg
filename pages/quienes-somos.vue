<template>
  <main>
    <!-- Banner -->
    <BannerPage banner="quienes-somos.jpg" :text="t('nosotros')" />
    <section id="servicios">
      <div class="container py-5">
        <template v-for="(nosotros, i) of SCHEMA.nosotros" :key="i">
          <div :id="nosotros.title" class="row m-0 p-0 bg-dark rounded overflow-hidden" :class="{ 'mb-4': i < SCHEMA.servicios.length - 1 }">
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
                  <button v-for="(image, j) of nosotros.images" :key="j" type="button" :data-bs-target="`#${nosotros.title} .carousel`" :data-bs-slide-to="j" :class="{ active: !j }" aria-current="true" aria-label="Slide" />
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
  </main>
</template>

<script>
export default {
  mounted () {
    SCHEMA.nosotros.forEach((nosotros) => {
      this.$nuxt.$bootstrap.startCarousel(`#${nosotros.title} .carousel`);
    });
  }
};
</script>
