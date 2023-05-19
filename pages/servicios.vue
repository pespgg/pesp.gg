<template>
  <!-- Banner -->
  <BannerPage banner="servicios.jpg" :text="t('servicios')" />
  <section>
    <div class="container py-5">
      <template v-for="(servicio, i) of SITE.servicios" :key="i">
        <div class="row" :class="{ 'mb-4': i < SITE.servicios.length - 1 }">
          <div class="col-md-6 p-4 bg-dark shadow" :class="i % 2 ? 'order-1 order-md-2' : 'order-1 order-md-1'">
            <h3 class="text-uppercse mb-4 mt-4"><b>{{ t(servicio.title) }}</b></h3>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p v-for="(p, j) of servicio.content" :key="j" v-html="t(p)" />
          </div>
          <div class="col-md-6 p-0 text-center bg-dark align-self-center shadow" :class="i % 2 ? 'order-2 order-md-1' : 'order-2 order-md-2'">
            <img class="img-fluid" :src="`${SITE.dirs.servicios}/${servicio.images[1]}`" :alt="t(servicio.title)">
          </div>
        </div>
      </template>
    </div>
  </section>
</template>
