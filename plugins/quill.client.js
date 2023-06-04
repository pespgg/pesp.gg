import BlotFormatter from "quill-blot-formatter/dist/BlotFormatter";

const modules = [
  {
    name: "blotFormatter",
    module: BlotFormatter
  }
];

export default defineNuxtPlugin(() => {
  return {
    provide: { quill: { modules } }
  };
});
