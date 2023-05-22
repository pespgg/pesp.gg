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

export const tweenNumber = async ({ target, duration }, callback = () => {}) => {
  let count = 0;
  while (count < target) {
    const add = target / (60 * duration);
    if (count + add > target) {
      count = target;
    }
    else {
      count += add;
    }
    await new Promise(resolve => setTimeout(resolve, duration * 1000 / 60));
    callback(count);
  }
};
