<script setup>
definePageMeta({ layout: "dashboard", middleware: "auth" });
useSeoMeta({
  robots: "noindex,nofollow"
});
</script>

<template>
  <main v-if="post">
    <article id="post" class="container">
      <header class="my-3">
        <img :src="post.banner.src" class="img-fluid w-100 rounded shadow" :alt="post.titulo">
      </header>
      <div class="d-flex mb-2">
        <NuxtLink class="d-flex align-items-center rounded overflow-hidden text-white" :to="`/tag/${post.tag}/`">
          <div class="bg-primary px-1">
            <Icon class="text-white" name="solar:tag-linear" size="1.1rem" />
          </div>
          <div class="bg-body-tertiary px-2">{{ getTagName(post.tag) }}</div>
        </NuxtLink>
      </div>
      <p class="m-0">{{ t("publicado_el") }} {{ formatDate(new Date(post.fecha).getTime()) }}</p>
      <h1>
        <strong>{{ post.titulo }}</strong>
      </h1>
      <hr>
      <div class="p-0 p-lg-3">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="ck-content" v-html="post.content" />
      </div>
    </article>
    <div class="position-fixed bottom-0 p-3 z-1 d-flex flex-wrap justify-content-between w-100">
      <button type="button" class="btn btn-warning py-3 fw-bold text-uppercase shadow" @click="backToEditor()">
        <Icon name="solar:arrow-left-bold" size="2rem" />
        {{ t("volver_editor") }}
      </button>
      <button type="button" class="btn btn-info py-3 fw-bold text-uppercase shadow">
        <Icon name="solar:archive-minimalistic-line-duotone" size="2rem" />
        {{ t("publicar") }}
      </button>
    </div>
  </main>
</template>

<script>
export default {
  data () {
    return {
      post: null
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

<style>
@import "~/assets/css/ckeditor.css";
</style>
