<script setup>
setScrollBehavior();
</script>

<template>
  <NuxtLayout>
    <Transition name="page" mode="out-in">
      <div id="page">
        <NuxtPage />
      </div>
    </Transition>
  </NuxtLayout>
</template>

<script>
export default {
  mounted () {
    // Preload banners
    const banners = Object.keys(import.meta.glob("~/public/images/banners/*.jpg")).map((path) => {
      return path.replace(/^.*[\\/]/, "");
    });

    banners.forEach((banner) => {
      const img = new Image();
      img.src = `/images/banners/${banner}`;
    });
  }
};
</script>
