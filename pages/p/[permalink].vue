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
    <section>
      <div id="banner" class="position-relative bg-black">
        <img :src="post.image" class="d-block w-100" :alt="post.titulo">
      </div>
    </section>
    <article>
      <div class="container py-4">
        <h1>
          <strong>{{ post.titulo }}</strong>
        </h1>
        <hr>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <LoadPost :permalink="post.permalink" />
      </div>
    </article>
  </main>
</template>
