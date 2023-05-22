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
