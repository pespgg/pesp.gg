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

const { query } = useRoute();
const currentPage = ref(query.p ? query.p : 1);
const perPage = ref(6);

const numberOfPages = computed (() => {
  if (!posts.value) return 0;
  return Math.ceil(posts.value.length / 6);
});

const onPageChange = (page: number) => {
  currentPage.value = page;
};

const showPosts = computed (() => {
  if (!posts.value) return [];
  const sliceFix = currentPage.value * perPage.value;
  return posts.value.slice(sliceFix - perPage.value, sliceFix);
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
        <div v-for="(post, i) of showPosts" :key="i" class="col-md-6 col-lg-4">
          <article class="card mx-auto border-0 shadow h-100 light" itemscope itemtype="https://schema.org/BlogPosting">
            <img :src="getPostImage(post.permalink, post.updated)" class="card-img-top" :alt="post.titulo" itemprop="image">
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
                <small class="text-body-secondary ms-1" itemprop="datePublished" :content="formatDate(post.fecha, { type: 'iso' })">
                  {{ formatDate(post.fecha) }}
                </small>
                <NuxtLink class="hover ms-auto bg-primary text-light py-1 px-3" :to="`/p/${post.permalink}/`">
                  <small>{{ t("abrir") }} <Icon name="solar:arrow-right-bold" size="1.5rem" /></small>
                </NuxtLink>
              </div>
            </div>
            <div class="d-none" itemprop="author" itemscope itemtype="https://schema.org/Organization">
              <meta itemprop="name" :content="SITE.name.full">
              <link itemprop="url" :href="SITE.url">
            </div>
          </article>
        </div>
      </div>
      <PostPagination class="pt-5 pb-2 d-flex align-items-center justify-content-center" :total-pages="numberOfPages" :current-page="Number(currentPage)" @pagechanged="onPageChange" />
    </div>
  </main>
</template>
