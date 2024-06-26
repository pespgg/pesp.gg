<script setup lang="ts">
const props = defineProps({
  permalink: {
    type: String,
    required: true
  },
  truncate: {
    type: Number,
    default: 0
  }
});

const content = useState(`content:${props.permalink}${props.truncate ? "_truncated" : ""}`, () => "");
if (!content.value) {
  const url = import.meta.dev ? `${SITE.local}/posts/content` : `${SITE.cdn}/posts/content`;
  const html = await $fetch(`${url}/${props.permalink}.html`).then(v => v).catch(() => "") as string;
  content.value = props.truncate ? truncateString(stripTags(html), props.truncate) : html;

  if (!props.truncate) {
    const desc_meta = truncateString(stripTags(html), 220);
    useSeoMeta({
      description: desc_meta,
      ogDescription: desc_meta,
      twitterDescription: desc_meta
    });
  }
}
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-html="content" />
</template>
