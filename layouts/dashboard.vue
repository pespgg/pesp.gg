<script setup>
useSeoMeta({
  robots: "noindex,nofollow"
});
</script>

<template>
  <div id="layout">
    <DashboardNavbar />
    <slot />
  </div>
</template>

<style>
@import "~/assets/css/admin.css";
</style>
