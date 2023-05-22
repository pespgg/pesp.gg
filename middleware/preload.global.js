export default defineNuxtRouteMiddleware(() => {
  if (process.server) {
    return;
  }
  const banners = Object.keys(import.meta.glob("~/public/images/banners/*.jpg")).map((path) => {
    return path.replace(/^.*[\\/]/, "");
  });

  banners.forEach((banner) => {
    const img = new Image();
    img.src = `/images/banners/${banner}`;
  });
});
