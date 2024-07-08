<script setup lang="ts">
defineProps({
  banners: {
    type: Array,
    required: true
  }
});

onMounted(() => {
  const { $bootstrap } = useNuxtApp();
  $bootstrap.startCarousel("#banner .carousel");
});
</script>

<template>
  <section id="banner">
    <div class="carousel slide carousel-fade">
      <div class="carousel-indicators">
        <button v-for="(banner, i) of banners" :key="i" type="button" data-bs-target="#banner .carousel" :data-bs-slide-to="i" :class="{ active: !i }" aria-current="true" aria-label="Slide" />
      </div>
      <div class="carousel-inner">
        <div v-for="(banner, i) of banners" :key="i" class="carousel-item" :class="{ active: !i }" data-bs-interval="10000">
          <img :src="`${SITE.dirs.banners}/${banner}`" class="d-block w-100" :alt="`${SITE.name.web} Banner`" data-aos="zoom-out" data-aos-duration="2000">
        </div>
      </div>
    </div>
  </section>
</template>
