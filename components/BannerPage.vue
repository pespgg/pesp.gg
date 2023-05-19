<template>
  <section>
    <div id="banner" class="position-relative bg-black">
      <img :src="`${SITE.dirs.banners}/${banner}`" class="d-block w-100" alt="PESP.GG Banner">
      <h1 v-if="text" class="text-uppercase text-center position-absolute start-50 top-50 translate-middle m-0 w-100">
        <strong>{{ text }}</strong>
      </h1>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    banner: {
      type: String,
      required: true
    },
    text: {
      type: String,
      default: ""
    }
  },
  beforeCreate () {
    preloadImage(`${SITE.dirs.banners}/${this.banner}`);
  }
};
</script>
