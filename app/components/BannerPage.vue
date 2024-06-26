<template>
  <section id="banner">
    <div class="position-relative bg-black overflow-hidden">
      <img :src="`${SITE.dirs.banners}/${banner}`" class="d-block w-100" :alt="`${SITE.name.web} Banner`" data-aos="zoom-out" data-aos-duration="2000">
      <h1 v-if="text" class="text-uppercase text-center position-absolute start-50 top-50 translate-middle m-0 w-100" data-aos="fade-in" data-aos-duration="2000">
        <strong>{{ text }}</strong>
      </h1>
    </div>
  </section>
</template>

<script lang="ts">
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
  }
};
</script>
