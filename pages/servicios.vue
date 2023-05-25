<template>
  <!-- Banner -->
  <BannerPage banner="servicios.jpg" :text="t('servicios')" />
  <section id="servicios">
    <div class="container mt-0 mt-sm-5 mb-5">
      <template v-for="(servicio, i) of SCHEMA.servicios" :key="i">
        <div :id="servicio.title" class="row px-2 px-sm-0 bg-dark rounded overflow-hidden" :class="{ 'mb-4': i < SCHEMA.servicios.length - 1 }">
          <!-- Info col -->
          <div class="col-md-8 col-lg-6 p-sm-4 shadow" :class="i % 2 ? 'order-1 order-md-2' : 'order-1 order-md-1'">
            <h3 class="text-uppercse mb-4 mt-4"><strong>{{ t(servicio.title) }}</strong></h3>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p v-for="(p, j) of servicio.content" :key="j" v-html="t(p)" />
          </div>
          <!-- Image col -->
          <div class="col-md-4 col-lg-6 p-0 text-center shadow overflow-hidden" :class="i % 2 ? 'order-2 order-md-1' : 'order-2 order-md-2'">
            <div class="scale-hover h-100">
              <img class="img-fluid w-100 h-100 object-fit-cover" :src="`${SITE.dirs.servicios}/${servicio.images[1]}`" :alt="t(servicio.title)">
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
  <StatsBand :stats="SCHEMA.stats.experience" />
  <section id="casos-exito">
    <div class="container-fluid my-5">
      <h2 class="text-center text-uppercase mb-4">
        <strong>{{ t("casos_exito") }}</strong>
      </h2>
      <div class="glide-wrapper overflow-hidden rounded">
        <div class="glide">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              <li v-for="(caso, i) of SCHEMA.casos_exito" :key="i" class="glide__slide p-0 px-sm-3" :class="{'glide__slide--active': !i}">
                <div class="rounded overflow-hidden shadow bg-dark">
                  <div class="row mx-0">
                    <div class="order-2 order-md-1 col-md-7 p-4">
                      <h3 class="text-uppercase text-white"><strong>{{ t(caso.title) }}</strong></h3>
                      <p class="text-white m-0">{{ t(caso.description) }}</p>
                    </div>
                    <div class="order-1 order-md-2 col-md-5 p-0">
                      <img :src="`${SITE.dirs.casos_exito}/${caso.image}`" class="img-fluid w-100 h-100 object-fit-cover">
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
            <button class="glide__bullet" data-glide-dir="=0" />
            <button class="glide__bullet" data-glide-dir="=1" />
            <button class="glide__bullet" data-glide-dir="=2" />
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="marcas">
    <div class="container-fluid bg-light mt-5 py-4 text-dark">
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
                <li v-for="(marca, i) of SCHEMA.marcas" :key="i" class="glide__slide" :class="{'glide__slide--active': !i}">
                  <img :src="`${SITE.dirs.marcas}/${marca.image}`" class="img-fluid" width="150" height="150" :alt="marca.name">
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
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
