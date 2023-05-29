<script setup>
const { params } = useRoute();
const post = useState(params.permalink, () => {
  return {};
});

if (!Object.keys(post.value).length) {
  const { data } = await useFetch("/api/posts", {
    query: {
      permalink: params.permalink
    }
  });
  post.value = data;
}
</script>

<template>
  <main>
    <section>
      <div id="banner" class="position-relative bg-black">
        <img :src="post.image" class="d-block w-100" :alt="post.titulo">
      </div>
    </section>
    <section>
      <div class="container py-4">
        <h1>
          <strong>{{ post.titulo }}</strong>
        </h1>
        <hr>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <LoadPost :permalink="post.permalink" />
      </div>
    </section>
  </main>
</template>
