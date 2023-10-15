<script setup>
setScrollBehavior();

const { $bootstrap, $toasts } = useNuxtApp();

onMounted(() => {
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
  <NuxtLayout>
    <div id="page">
      <NuxtPage />
      <BackToTop />
    </div>
  </NuxtLayout>
  <ToastsController />
</template>
