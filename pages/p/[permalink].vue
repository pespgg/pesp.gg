<script setup>
const { params } = useRoute();
const { data: post } = await useFetch("/api/posts", {
  query: {
    permalink: params.permalink
  }
});
</script>

<template>
  <main>
    <article class="container">
      <header class="my-3">
        <img :src="getPostImage(post.permalink, post.updated)" class="d-block w-100 rounded shadow" :alt="post.titulo">
      </header>
      <div class="d-flex mb-2">
        <NuxtLink class="d-flex align-items-center rounded overflow-hidden text-white" :to="`/tag/${post.tag}/`">
          <div class="bg-primary px-1">
            <Icon class="text-white" name="solar:tag-linear" size="1.1rem" />
          </div>
          <div class="bg-body px-2">{{ getTagName(post.tag) }}</div>
        </NuxtLink>
      </div>
      <p class="m-0">{{ t("publicado_el") }} {{ formatDate(post.fecha) }}</p>
      <h1>
        <strong>{{ post.titulo }}</strong>
      </h1>
      <hr>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="p-3">
        <LoadPost :permalink="post.permalink" />
      </div>
    </article>
  </main>
</template>
