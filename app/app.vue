<script setup>
setScrollBehavior();

const { $toasts } = useNuxtApp();

onMounted(() => {
  // eslint-disable-next-line no-global-assign
  $fetch = $fetch.create({
    onResponseError: ({ response }) => {
      const message = response.status === 500 ? t("error") : response._data.message;
      $toasts.add({ message, success: false });
    }
  });
});
</script>

<template>
  <NuxtLoadingIndicator :throttle="0" />
  <BackToTop />
  <NuxtLayout>
    <div id="page">
      <NuxtPage />
    </div>
  </NuxtLayout>
  <ToastsController />
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
