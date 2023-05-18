<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nuxt-icon :name="name" :size="size" filled />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: "24"
    }
  }
};
</script>

<style>
.nuxt-icon {
  display: inline-flex;
  vertical-align: text-bottom;
}

.nuxt-icon svg {
  width: 1rem;
  height: 1rem;
  margin-bottom: 0;
}

.nuxt-icon[size="sm"] svg {
  width: 1.5rem;
  height: 1.5rem;
}

.nuxt-icon[size="md"] svg {
  width: 2rem;
  height: 2rem;
}

.nuxt-icon[size="lg"] svg {
  width: 3rem;
  height: 3rem;
}

.nuxt-icon[size="full"] svg {
  width: 100%;
  height: 100%;
}
</style>
