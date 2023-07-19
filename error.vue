<script setup>
const { statusCode, message } = useError().value;
</script>

<template>
  <div class="vh-100 d-flex justify-content-center align-items-center">
    <div>
      <h1>Error {{ statusCode }}</h1>
      <h5>Lo sentimos, ha ocurrido un error. {{ message }}</h5>
      <p>Volver: <NuxtLink to="/" class="text-decoration-underline">pesp.gg</NuxtLink></p>
    </div>
  </div>
</template>
