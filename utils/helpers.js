export const formatDate = (date = "", style = "long", lang = "es") => {
  const d = new Date(date);
  return d.toLocaleDateString(lang, {
    year: "numeric",
    month: style,
    day: "2-digit"
  });
};

export const currentYear = () => {
  return new Date().getFullYear();
};

export function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const tweenNumber = async ({ target, duration }, callback = (n = 0) => {}) => {
  let count = 0;
  while (count < target) {
    const add = target / (60 * duration);
    if (count + add > target) {
      count = target;
    }
    else {
      count += add;
    }
    await sleep(duration * 1000 / 60);
    callback(count);
  }
};

export const stripTags = (str = "") => {
  const tags = [/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, " "];
  const comments = [/<!--[\s\S]*?-->/gi, ""];
  const nbsp = [/&nbsp;/g, " "];
  const spaces = [/\s\s+/g, " "];
  const breaklines = [/(\r\n|\n|\r)/g, " "];
  return str
    .replace(...comments)
    .replace(...tags)
    .replace(...nbsp)
    .replace(...breaklines)
    .replace(...spaces)
    .trim();
};

export const truncateString = (str = "", n = 0) => {
  const res = str.length > n ? str.substring(0, n - 1) + "..." : str;
  return res.trim();
};

export const thousandToK = (n = 0) => {
  if (n < 1000) {
    return n;
  }
  const k = n / 1000;
  return `${k.toFixed(1)}k`;
};

export const KtoNumber = (str = "") => {
  if (!str.includes("k")) {
    return Number(str);
  }
  return Number(str.replace("k", "")) * 1000;
};

export const getRandomFromArray = (arr = []) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const getPostImage = (name, updated) => {
  const path = process.dev ? `${SITE.local}/posts/images` : `${SITE.cdn}/posts/images`;
  return `${path}/${name}.jpg?updated=${updated}`;
};

export const getTagName = (tag = "") => {
  return SCHEMA.tags.find(t => t.tag === tag).name;
};

export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateColor = (number) => {
  const hue = number * 137.508; // use golden angle approximation
  return `hsla(${hue},100%,75%)`;
};
