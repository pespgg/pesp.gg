<script setup lang="ts">
useSeoMeta({
  robots: "noindex,nofollow"
});
</script>

<template>
  <div id="layout">
    <DashboardNavbar />
    <slot />
    <BackToTop />
  </div>
</template>

<style>
@import "~/assets/css/admin.css";
</style>
