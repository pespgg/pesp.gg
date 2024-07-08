import "bootstrap/js/dist/offcanvas";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/collapse";
import Carousel from "bootstrap/js/dist/carousel";
import Modal from "bootstrap/js/dist/modal";
import Toast from "bootstrap/js/dist/toast";

class Bootstrap {
  hideModal (id: string) {
    const instance = Modal.getInstance(id);
    if (instance) {
      instance.hide();
    }
  }

  showModal (id: string) {
    const modal = new Modal(id);
    modal.show();
  }

  startCarousel (id: string) {
    const instance = Carousel.getOrCreateInstance(id);
    if (instance) {
      instance.cycle();
    }
  }

  showToast (id: HTMLElement) {
    const instance = Toast.getInstance(id);
    if (instance) return;
    const toast = new Toast(id);
    toast.show();
    return id;
  }
}

declare module "#app" {
  interface NuxtApp {
    $bootstrap: Bootstrap;
  }
}

export default defineNuxtPlugin(() => {
  const bootstrap = new Bootstrap();
  return {
    provide: { bootstrap }
  };
});
