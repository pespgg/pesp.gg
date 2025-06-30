<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps({
  error: { type: Object as () => NuxtError, required: true }
});
</script>

<template>
  <div class="container vh-100 d-flex justify-content-center align-items-center">
    <div>
      <h1>Error {{ error.statusCode }}</h1>
      <h5>Lo sentimos, ha ocurrido un error. {{ error.message || error.statusMessage }}</h5>
      <p>Volver: <NuxtLink :to="SCHEMA_pages.inicio.to" class="text-decoration-underline">pesp.gg</NuxtLink></p>
    </div>
  </div>
</template>
