export const preloadImage = (images) => {
  if (typeof images === "string") {
    images = [images];
  }
  const link = images.map((image) => {
    return { rel: "preload", href: image, as: "image", fetchpriority: "high" };
  });
  useHead({ link });
};
