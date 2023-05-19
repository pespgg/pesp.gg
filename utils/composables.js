export const preloadResource = (images, as = "") => {
  if (typeof images === "string") {
    images = [images];
  }
  const link = images.map((image) => {
    return { rel: "preload", href: image, as };
  });
  useHead({ link });
};
