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
