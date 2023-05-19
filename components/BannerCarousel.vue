<template>
  <section>
    <div id="banner" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button v-for="(banner, i) of banners" :key="i" type="button" data-bs-target="#banner" :data-bs-slide-to="i" :class="{ active: !i }" aria-current="true" aria-label="Slide" />
      </div>
      <div class="carousel-inner">
        <div v-for="(banner, i) of banners" :key="i" class="carousel-item" :class="{ active: !i }" data-bs-interval="10000">
          <img :src="`${SITE.dirs.banners}/${banner}`" class="d-block w-100" alt="PESP.GG Banner">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    banners: {
      type: Array,
      required: true
    }
  },
  beforeCreate () {
    const images = this.banners.map(banner => `${SITE.dirs.banners}/${banner}`);
    preloadImage(images);
  }
};
</script>
