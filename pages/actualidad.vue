<script setup lang="ts">
const { data: posts } = await useFetch("/api/posts", {
  query: {
    props: ["image", "titulo", "fecha", "permalink", "tag", "updated"].join(",")
  }
});

useSeoMeta({
  title: `${t("actualidad")} | ${SITE.name.web}`,
  description: t("actualidad_description"),
  keywords: t("actualidad_keywords"),
  ogUrl: `${SITE.url}/actualidad/`,
  ogTitle: `${t("actualidad")} | ${SITE.name.web}`,
  ogDescription: t("actualidad_description"),
  twitterTitle: `${t("actualidad")} | ${SITE.name.web}`,
  twitterDescription: t("actualidad_description")
});

useHead({
  link: [
    { rel: "canonical", href: `${SITE.url}/actualidad/` }
  ]
});
</script>

<template>
  <main>
    <!-- Banner -->
    <BannerPage banner="actualidad.jpg" :text="t('actualidad')" />
    <div class="container-fluid py-5">
      <div class="my-4 text-center ">
        <h2 class="text-uppercase">
          <strong>{{ t("recientes") }}</strong>
        </h2>
        <p class="m-0">{{ t("actualidad_info") }}</p>
      </div>
      <div class="row row-gap-3">
        <div v-for="(post, i) of posts" :key="i" class="col-md-6 col-lg-4" itemscope itemtype="https://schema.org/BlogPosting">
          <article class="card mx-auto border-0 shadow h-100 light">
            <img :src="getPostImage(post.permalink, post.updated)" class="card-img-top" itemprop="image">
            <div class="card-body bg-dark">
              <h4 class="card-title">
                <strong>
                  <NuxtLink :to="`/p/${post.permalink}/`">
                    <span itemprop="headline">{{ post.titulo }}</span>
                  </NuxtLink>
                </strong>
              </h4>
              <div class="bg-body-tertiary text-light text-center mb-2 rounded small text-uppercase" role="button">{{ getTagName(post.tag) }}</div>
              <LoadPost :permalink="post.permalink" :truncate="220" />
            </div>
            <div class="card-footer bg-dark p-0 overflow-hidden">
              <div class="d-flex align-items-center ps-3">
                <Icon class="text-light" name="solar:calendar-linear" size="1.1rem" />
                <small class="text-body-secondary ms-1" itemprop="datePublished">
                  {{ formatDate(post.fecha) }}
                </small>
                <NuxtLink class="hover ms-auto bg-primary text-light py-1 px-3" :to="`/p/${post.permalink}/`">
                  <small>{{ t("abrir") }} <Icon name="solar:arrow-right-bold" size="1.5rem" /></small>
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </main>
</template>
