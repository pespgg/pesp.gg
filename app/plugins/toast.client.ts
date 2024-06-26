class Toasts {
  toasts: Ref<PespToast[]> = ref([]);
  id = 1;
  add (toast: PespToast) {
    this.toasts.value.unshift({ ...toast, id: this.id++ });
  }

  remove (toast: PespToast) {
    this.toasts.value.splice(this.toasts.value.indexOf(toast), 1);
  }

  removeAll () {
    this.toasts.value.splice(0, this.toasts.value.length);
  }

  getAll () {
    return this.toasts.value;
  }
}

const toasts = new Toasts();

export default defineNuxtPlugin(() => {
  return {
    provide: { toasts }
  };
});
