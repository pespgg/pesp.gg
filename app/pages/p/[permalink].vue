<script setup lang="ts">
const { params } = useRoute("p-permalink");
const { data: posts } = await useFetch("/api/posts", {
  query: {
    permalink: params.permalink
  }
});

if (!posts.value || !posts.value.length) {
  throw createError({ statusCode: 404, message: t("post_not_found") });
}

const post = ref(posts.value[0]!);

useSeoMeta({
  title: `${post.value.titulo} | ${SITE.name.web}`,
  keywords: t("post_keywords"),
  ogUrl: `${SITE.url}/p/${post.value.permalink}/`,
  ogTitle: `${post.value.titulo} | ${SITE.name.web}`,
  ogImage: `${SITE.cdn}/posts/images/${post.value.permalink}.jpg`,
  ogImageAlt: post.value.titulo,
  ogImageWidth: 1290,
  ogImageHeight: 600,
  twitterCard: "summary_large_image",
  twitterImage: `${SITE.cdn}/posts/images/${post.value.permalink}.jpg`,
  twitterTitle: `${post.value.titulo} | ${SITE.name.web}`
});

useHead({
  link: [
    { rel: "canonical", href: `${SITE.url}/p/${post.value.permalink}` }
  ]
});
</script>

<template>
  <main>
    <article id="post" class="container pb-5" itemscope itemtype="https://schema.org/BlogPosting">
      <header class="my-3 overflow-hidden rounded shadow">
        <img :src="getPostImage(post.permalink, post.updated)" class="d-block w-100" :alt="post.titulo" itemprop="image" data-aos="zoom-out" data-aos-duration="2000">
      </header>
      <div class="d-flex mb-2">
        <NuxtLink class="d-flex align-items-center rounded overflow-hidden text-white" :to="`/tag/${post.tag}`">
          <div class="bg-primary px-1">
            <Icon class="text-white" name="solar:tag-linear" size="1.1rem" />
          </div>
          <div class="bg-body-tertiary px-2">{{ getTagName(post.tag) }}</div>
        </NuxtLink>
      </div>
      <p class="m-0">{{ t("publicado_el") }} <span itemprop="datePublished" :content="formatDate(post.fecha, { type: 'iso' })">{{ formatDate(post.fecha) }}</span></p>
      <div class="d-none" itemprop="author" itemscope itemtype="https://schema.org/Organization">
        <meta itemprop="name" :content="SITE.name.full">
        <link itemprop="url" :href="SITE.url">
      </div>
      <h1>
        <strong itemprop="headline">{{ post.titulo }}</strong>
      </h1>
      <hr>
      <div class="p-0 p-lg-3">
        <LoadPost class="ck-content" :permalink="post.permalink" />
      </div>
      <hr>
      <SharePost :title="post.titulo" />
      <NewsletterForm />
    </article>
  </main>
</template>

<style>
@import "ckeditor5/ckeditor5.css";
</style>
