<template>
  <Transition name="tab">
    <button v-if="scrolled" class="top rounded position-fixed m-3 end-0 bottom-0 btn btn-light btn-lg shadow d-none d-lg-block" role="button" @click="topFunction()"><Icon name="solar:arrow-up-bold" size="1.5rem" /></button>
  </Transition>
</template>

<script>
export default {
  data () {
    return {
      scrolled: false,
      maxScroll: 600
    };
  },
  mounted () {
    window.onscroll = () => {
      this.scrolled = (document.body.scrollTop > this.maxScroll || document.documentElement.scrollTop > this.maxScroll);
    };
  },
  methods: {
    topFunction () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
};
</script>

<style scoped>
.top {
  z-index: 10021;
}
</style>
