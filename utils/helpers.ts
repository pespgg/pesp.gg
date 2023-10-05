

export const formatDate = (date: string | number, style: Intl.DateTimeFormatOptions["month"], lang: string = "es") => {
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

export function sleep (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const tweenNumber = async ({ target, duration }: { target: number, duration: number}, callback: (count: number) => void) => {
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
  return str
    .replace(/<!--[\s\S]*?-->/gi, "") // comments
    .replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, " ") // tags
    .replace(/&nbsp;/g, " ") // non breaking spaces
    .replace(/(\r\n|\n|\r)/g, " ") // breaklines
    .replace(/\s\s+/g, " ") // multiple spaces
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

export const getPostImage = (name: string, updated: number) => {
  const path = process.dev ? `${SITE.local}/posts/images` : `${SITE.cdn}/posts/images`;
  return `${path}/${name}.jpg?updated=${updated}`;
};

export const getTagName = (tag: string) => {
  return SCHEMA.tags.find(t => t.tag === tag)?.name;
};

export const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateColor = (number: number) => {
  const hue = number * 137.508; // use golden angle approximation
  return `hsla(${hue},100%,75%)`;
};
