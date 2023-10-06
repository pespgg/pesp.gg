import "bootstrap/js/dist/offcanvas";
import "bootstrap/js/dist/dropdown";
import Carousel from "bootstrap/js/dist/carousel";
import Modal from "bootstrap/js/dist/modal";

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
}

const bootstrap = new Bootstrap();

export default defineNuxtPlugin(() => {
  return {
    provide: { bootstrap }
  };
});
