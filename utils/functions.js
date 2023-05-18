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
