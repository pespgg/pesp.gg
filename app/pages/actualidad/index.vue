<script setup lang="ts">
const { data: posts } = await useFetch("/api/posts", {
  query: {
    props: ["image", "titulo", "fecha", "permalink", "tag", "updated"].join(",")
  },
  getCachedData: (key, nuxtApp) => nuxtApp.payload.data[key]
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

const { query, path } = useRoute();
const p = Number(query.p);
const currentPage = ref(p ? p : 1);
const perPage = ref(6);
const actualidad = ref<HTMLElement>();

const canonicalUrl = `${SITE.url}/actualidad`;
useHead({
  link: [
    { rel: "canonical", href: currentPage.value > 1 ? `${canonicalUrl}?p=${currentPage.value}` : canonicalUrl }
  ]
});

const numberOfPages = computed(() => {
  if (!posts.value) return 0;
  return Math.ceil(posts.value.length / 6);
});

const onPageChange = (page: number) => {
  currentPage.value = page;
  scrollTo({ top: actualidad.value?.offsetTop, behavior: "smooth" });
};

const showPosts = computed(() => {
  if (!posts.value) return [];
  const sliceFix = currentPage.value * perPage.value;
  return posts.value.slice(sliceFix - perPage.value, sliceFix);
});

watch(currentPage, () => {
  if (import.meta.server) return;
  const url = currentPage.value > 1 ? `${path}?p=${currentPage.value}` : path;
  window.history.replaceState({}, "", url);
});
</script>

<template>
  <main>
    <!-- Banner -->
    <BannerPage banner="actualidad.jpg" :text="t('actualidad')" />
    <div id="actualidad" ref="actualidad" class="container-fluid py-5">
      <div class="my-4 text-center ">
        <h2 class="text-uppercase">
          <strong>{{ t("recientes") }}</strong>
        </h2>
        <p class="m-0">{{ t("actualidad_info") }}</p>
      </div>
      <div class="row row-gap-3">
        <div v-for="(post, i) of showPosts" :key="i" class="col-md-6 col-lg-4">
          <article class="card mx-auto border-0 shadow h-100 light" itemscope itemtype="https://schema.org/BlogPosting">
            <img :src="getPostImage(post.permalink, post.updated)" class="card-img-top post" :alt="post.titulo" itemprop="image">
            <div class="card-body bg-dark">
              <h4 class="card-title">
                <strong>
                  <NuxtLink :to="`/p/${post.permalink}`">
                    <span itemprop="headline">{{ post.titulo }}</span>
                  </NuxtLink>
                </strong>
              </h4>
              <NuxtLink :to="`/actualidad/${post.tag}`" class="bg-body-tertiary text-light text-center mb-2 rounded small text-uppercase d-block text-decoration-none" role="button">{{ getTagName(post.tag) }}</NuxtLink>
              <LoadPost :permalink="post.permalink" :truncate="220" />
            </div>
            <div class="card-footer bg-dark p-0 rounded-bottom overflow-hidden">
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center gap-2 ms-3">
                  <Icon class="text-light" name="solar:calendar-linear" size="1.1rem" />
                  <span class="text-body-secondary small" itemprop="datePublished" :content="formatDate(post.fecha, { type: 'iso' })">
                    {{ formatDate(post.fecha) }}
                  </span>
                </div>
                <NuxtLink class="hover bg-primary text-light py-1 px-3 d-flex align-items-center gap-1" :to="`/p/${post.permalink}`">
                  <span class="small">{{ t("abrir") }}</span>
                  <Icon name="solar:arrow-right-bold" size="1.5rem" />
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
      <PostPagination v-if="numberOfPages > 1" class="pt-5 pb-2 d-flex align-items-center justify-content-center" :total-pages="numberOfPages" :current-page="currentPage" @pagechanged="onPageChange" />
      <NewsletterForm class="container" />
    </div>
  </main>
</template>
