<script setup lang="ts">
definePageMeta({ layout: "dashboard", middleware: "auth" });
useSeoMeta({
  robots: "noindex,nofollow"
});
</script>

<template>
  <main v-if="post">
    <article id="post" class="container">
      <header class="my-3">
        <img :src="post.banner.src ? post.banner.src : '/images/placeholder.png'" class="img-fluid w-100 rounded shadow bg-body-tertiary" :alt="post.titulo">
      </header>
      <div class="d-flex mb-2">
        <NuxtLink class="d-flex align-items-center rounded overflow-hidden text-light" :to="`/actualidad/${post.tag}`">
          <div class="bg-primary px-1">
            <Icon class="text-light" name="solar:tag-linear" size="1.1rem" />
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
      <button type="button" class="btn btn-info py-3 fw-bold text-uppercase shadow" @click="publishPost()">
        <Icon v-if="edit" name="solar:diskette-linear" size="2rem" />
        <Icon v-else name="solar:archive-minimalistic-line-duotone" size="2rem" />
        {{ t(edit ? "guardar" : "publicar") }}
      </button>
    </div>
  </main>
</template>

<script lang="ts">
export default {
  beforeRouteLeave (to, from, next) {
    if (to.name === "admin-dashboard-publicar" && from.meta.data) {
      to.meta.data = from.meta.data;
      to.meta.edit = from.meta.edit;
    }
    next();
  },
  data () {
    return {
      edit: false as boolean | undefined,
      post: undefined as PespEditorMeta["data"] | undefined
    };
  },
  mounted () {
    const meta = this.$route.meta as PespEditorMeta;
    this.edit = meta.edit;
    this.post = meta.data;
  },
  methods: {
    backToEditor () {
      this.$router.push("/admin/dashboard/publicar/");
    },
    async publishPost () {
      if (this.post?.banner.src) {
        const url = this.edit ? `/api/posts/${this.post.permalink}` : "/api/posts";
        const post = await $fetch(url, {
          method: this.edit ? "PUT" : "POST",
          body: this.post
        }).catch(() => null);

        if (post) this.$router.push("/admin/dashboard/actualidad/");
      }
    }
  }
};
</script>
