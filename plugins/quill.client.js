import BlotFormatter from "quill-blot-formatter";

const modules = {
  name: "blotFormatter",
  module: BlotFormatter
};

export default defineNuxtPlugin(() => {
  return {
    provide: { quill: { modules } }
  };
});
