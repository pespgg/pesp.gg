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
        <img :src="post.image" class="d-block w-100 rounded shadow" :alt="post.titulo">
      </header>
      <h1>
        <strong>{{ post.titulo }}</strong>
      </h1>
      <hr>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <LoadPost :permalink="post.permalink" />
    </article>
  </main>
</template>
