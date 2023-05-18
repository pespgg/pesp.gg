export const truncate = (str = "", n = 0) => {
  const res = str.length > n ? str.substring(0, n - 1) + "..." : str;
  return res.trim();
};

export const stripTags = (str = "") => {
  const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  const comments = /<!--[\s\S]*?-->/gi;
  const nbsp = /&nbsp;/gi;
  return str.replace(comments, "").replace(tags, "").replace(nbsp, " ");
};
