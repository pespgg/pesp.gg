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
        <img :src="'https://pesp.gg/images/posts/' + post.image" class="d-block w-100" :alt="post.titulo_es">
      </div>
    </section>
    <section>
      <div class="container py-4">
        <h1>
          <strong>{{ post.titulo_es }}</strong>
        </h1>
        <hr>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="post.p_es" />
      </div>
    </section>
  </main>
</template>
