<script setup>
const { statusCode, statusMessage, message } = useError().value;
</script>

<template>
  <div class="container vh-100 d-flex justify-content-center align-items-center">
    <div>
      <h1>Error {{ statusCode }}</h1>
      <h5>Lo sentimos, ha ocurrido un error. {{ message || statusMessage }}</h5>
      <p>Volver: <NuxtLink :to="SCHEMA_pages.inicio.to" class="text-decoration-underline">pesp.gg</NuxtLink></p>
    </div>
  </div>
</template>
