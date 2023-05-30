export const formatDate = (date = "", lang = "es") => {
  const d = new Date(date);
  return d.toLocaleDateString(lang, {
    year: "numeric",
    month: "long",
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
  const tags = [/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, ""];
  const comments = [/<!--[\s\S]*?-->/gi, ""];
  const nbsp = [/&nbsp;/gi, " "];
  const breaklines = [/(\r\n|\n|\r)/gm, ""];
  return str.replace(...comments).replace(...tags).replace(...nbsp).replace(...breaklines);
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
