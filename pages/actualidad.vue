<script setup>
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
        <div v-for="(post, i) of posts" :key="i" class="col-md-6 col-lg-4">
          <article class="card mx-auto border-0 shadow h-100 light">
            <img :src="getPostImage(post.permalink, post.updated)" class="card-img-top">
            <div class="card-body bg-dark">
              <h4 class="card-title">
                <strong>
                  <NuxtLink :to="`/p/${post.permalink}/`">{{ post.titulo }}</NuxtLink>
                </strong>
              </h4>
              <div class="bg-body text-white text-center mb-2 rounded small text-uppercase" role="button">{{ SCHEMA.tags.find(v => v.tag == post.tag).name }}</div>
              <LoadPost :permalink="post.permalink" :truncate="220" />
            </div>
            <div class="card-footer bg-dark p-0 overflow-hidden">
              <div class="d-flex align-items-center ps-3">
                <Icon class="text-white" name="solar:calendar-linear" size="1.1rem" />
                <small class="text-body-secondary ms-1">
                  {{ formatDate(post.fecha) }}
                </small>
                <NuxtLink class="hover ms-auto bg-primary text-white py-1 px-3" :to="`/p/${post.permalink}/`">
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
