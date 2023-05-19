export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { posts: allPosts } = await $fetch("https://pesp.gg/data/actualidad.json");
  const { props, limit, truncate, permalink } = query;

  if (permalink) {
    return allPosts.find(post => post.permalink === permalink);
  }

  const actualidad = allPosts.filter(post => post.visible === "public");
  if (truncate) {
    actualidad.forEach((post) => {
      post.p_es = truncateString(stripTags(post.p_es), 200);
      post.p_en = truncateString(stripTags(post.p_en), 200);
    });
  }
  const posts = props ? filterByProps(actualidad, props?.split(",")) : actualidad;

  return posts.slice(0, limit || actualidad.length);
});
