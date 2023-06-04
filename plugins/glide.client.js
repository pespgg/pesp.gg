import Glide from "@glidejs/glide";

const glide = (el, options) => {
  new Glide(el, options).mount();
};

export default defineNuxtPlugin(() => {
  return {
    provide: { glide }
  };
});
