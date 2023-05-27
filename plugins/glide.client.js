import Glide from "@glidejs/glide";

export const glide = (el, options) => {
  new Glide(el, options).mount();
};

export default defineNuxtPlugin(() => {
  return {
    provide: { glide }
  };
});
