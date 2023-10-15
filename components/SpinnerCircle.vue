<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="spinner-border spinner-lg text-light" :class="{ 'spinner-border-sm': sm }" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sm: {
      type: Boolean,
      default: false
    }
  }
};
</script>
