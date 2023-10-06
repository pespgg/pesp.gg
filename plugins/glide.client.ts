import Glide from "@glidejs/glide";

const glide = (el: string, options: Partial<Glide.Options>) => {
  new Glide(el, options).mount();
};

export default defineNuxtPlugin(() => {
  return {
    provide: { glide }
  };
});
