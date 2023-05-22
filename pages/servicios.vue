<template>
  <!-- Banner -->
  <BannerPage banner="servicios.jpg" :text="t('servicios')" />
  <section id="servicios">
    <div class="container my-5">
      <template v-for="(servicio, i) of SCHEMA.servicios" :key="i">
        <div :id="servicio.title" class="row px-2 px-sm-0 bg-dark rounded overflow-hidden" :class="{ 'mb-4': i < SCHEMA.servicios.length - 1 }">
          <!-- Info col -->
          <div class="col-md-8 col-lg-6 p-sm-4 shadow" :class="i % 2 ? 'order-1 order-md-2' : 'order-1 order-md-1'">
            <h3 class="text-uppercse mb-4 mt-4"><strong>{{ t(servicio.title) }}</strong></h3>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p v-for="(p, j) of servicio.content" :key="j" v-html="t(p)" />
          </div>
          <!-- Image col -->
          <div class="col-md-4 col-lg-6 p-0 text-center shadow" :class="i % 2 ? 'order-2 order-md-1' : 'order-2 order-md-2'">
            <img class="img-fluid h-100 object-fit-cover" :src="`${SITE.dirs.servicios}/${servicio.images[1]}`" :alt="t(servicio.title)">
          </div>
        </div>
      </template>
    </div>
  </section>
  <StatsBand :stats="SCHEMA.stats.experience" />
  <section id="marcas">
    <div class="bg-white my-5 py-5 text-dark">
      <div class="text-center text-dark">
        <h1>
          <strong>Ellos confían en nosotros</strong>
        </h1>
        Marcas patrocinadoras de nuestros eventos
      </div>
    </div>
  </section>
</template>
