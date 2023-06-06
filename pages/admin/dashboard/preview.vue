<template>
  <main>
    <article id="post" class="container">
      <header class="my-3">
        <img :src="post.banner.src" class="img-fluid w-100 rounded shadow" :alt="post.titulo">
      </header>
      <div class="d-flex mb-2">
        <NuxtLink class="d-flex align-items-center rounded overflow-hidden text-white" :to="`/tag/${post.tag}/`">
          <div class="bg-primary px-1">
            <Icon class="text-white" name="solar:tag-linear" size="1.1rem" />
          </div>
          <div class="bg-body px-2">{{ getTagName(post.tag) }}</div>
        </NuxtLink>
      </div>
      <p class="m-0">{{ t("publicado_el") }} {{ formatDate(new Date(post.fecha).getTime()) }}</p>
      <h1>
        <strong>{{ post.titulo }}</strong>
      </h1>
      <hr>
      <div class="p-0 p-lg-3">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="post.content" />
      </div>
    </article>
  </main>
  <div class="position-fixed bottom-0 start-0 p-3" style="z-index: 11">
    <button type="button" class="btn btn-lg btn-warning py-3 fw-bold text-uppercase" @click="backToEditor()">
      <Icon name="solar:arrow-left-bold" size="2rem" />
      {{ t("volver_editor") }}
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      post: {}
    };
  },
  mounted () {
    this.post = this.$route.meta.data;
  },
  methods: {
    backToEditor () {
      this.$router.beforeEach((to, from, next) => {
        if (to.name === "admin-dashboard-publicar") {
          to.meta.data = this.$route.meta.data;
        }
        next();
      });
      this.$router.push({ name: "admin-dashboard-publicar" });
    }
  }
};
</script>
