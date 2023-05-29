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
  if (process.dev) {
    const url = "http://localhost:5173/posts";
    const html = await $fetch(`${url}/${props.permalink}.html`);
    content.value = props.truncate ? truncateString(stripTags(html), props.truncate) : html;
  }
}
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <article v-html="content" />
</template>
