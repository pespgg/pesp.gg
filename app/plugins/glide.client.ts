import Glide from "@glidejs/glide";

const glide = (el: string, options: Partial<Glide.Options>) => {
  new Glide(el, options).mount();
};

declare module "#app" {
  interface NuxtApp {
    $glide: typeof glide;
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: { glide }
  };
});
