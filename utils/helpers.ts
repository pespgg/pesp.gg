export const formatDate = (date: string | number, options?: Partial<{ style: Intl.DateTimeFormatOptions["month"], lang: string, type: string }>) => {
  const { style = "long", lang = "es", type = "text" } = options || {};

  const timeOffset = new Date().getTimezoneOffset() * 60000;
  const d = new Date(new Date(date).getTime() + timeOffset);

  switch (type) {
  case "iso":
    return d.toISOString();
  default:
    return d.toLocaleDateString(lang, {
      year: "numeric",
      month: style,
      day: "2-digit"
    });
  }
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
    return n.toString();
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

export const getRandomFromArray = (arr: any[] = []) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const getPostImage = (name: string, updated: number) => {
  const path = process.dev ? `${SITE.local}/posts/images` : `${SITE.cdn}/posts/images`;
  return `${path}/${name}.jpg?updated=${updated}`;
};

export const getTagName = (tag: string) => {
  return SCHEMA_tags.find(t => t.tag === tag)?.name;
};

export const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateColor = (number: number) => {
  const hue = number * 137.508; // use golden angle approximation
  return `hsla(${hue},100%,75%)`;
};

export const getAge = (date: string) => {
  const now = Number(new Date());
  const birth = Number(new Date(`${date} 00:00:00`));
  const diff = Math.abs(now - birth);
  const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  return age;
};


export const copyToClipboard = async (text: string) => {
  if (typeof navigator === "undefined" || !navigator.clipboard || !navigator.clipboard.writeText) {
    return { success: false, message: t("copy_not_supported") };
  }
  await navigator.clipboard.writeText(text);
  return { success: true, message: t("link_copied_to_clipboard") };
};
