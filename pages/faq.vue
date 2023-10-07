<script setup lang="ts">
useSeoMeta({
  title: `${t("faq")} | ${SITE.name.web}`,
  description: t("faq_description"),
  keywords: t("faq_keywords"),
  ogUrl: `${SITE.url}/faq/`,
  ogTitle: `${t("faq")} | ${SITE.name.web}`,
  ogDescription: t("faq_description"),
  twitterTitle: `${t("faq")} | ${SITE.name.web}`,
  twitterDescription: t("faq_description")
});

useHead({
  link: [
    { rel: "canonical", href: `${SITE.url}/faq/` }
  ]
});
</script>
<template>
  <main>
    <section id="faq">
      <div class="container py-5">
        <h2 class="text-center text-uppercase mb-4">
          <strong>{{ t("faq") }}</strong>
        </h2>
        <div itemscope itemtype="https://schema.org/FAQPage" class="accordion">
          <div v-for="(faq, i) of SCHEMA.faq" :key="i" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question" class="accordion-item">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#panels-collapse${i}`" aria-expanded="true" :aria-controls="`panels-collapse${i}`">
              <h4 class="accordion-header" itemprop="name">{{ t(faq.question) }}</h4>
            </button>
            <div :id="`panels-collapse${i}`" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer" class="accordion-collapse collapse" :aria-labelledby="`${i}`">
              <div class="accordion-body">
                <!-- eslint-disable-next-line vue/no-v-html -->
                <p itemprop="text" v-html="t(faq.answer)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
