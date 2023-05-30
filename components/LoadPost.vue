<script setup>
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
  const url = process.dev ? "http://localhost:5173/posts" : "https://cdn.pesp.gg";
  const html = await $fetch(`${url}/${props.permalink}.html`);
  content.value = props.truncate ? truncateString(stripTags(html), props.truncate) : html;
}
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-html="content" />
</template>
