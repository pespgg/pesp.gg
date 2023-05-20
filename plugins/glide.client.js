import Glide from "@glidejs/glide";

export const glide = (el, options) => {
  return new Glide(el, options);
};

export default defineNuxtPlugin(() => {
  return {
    provide: { Glide: glide }
  };
});
