import "bootstrap/js/dist/offcanvas";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/carousel";
import Modal from "bootstrap/js/dist/modal";
class Bootstrap {
  hideModal (id) {
    const instance = Modal.getInstance("#" + id);
    if (instance) {
      instance.hide();
    }
  }
};

const bootstrap = new Bootstrap();

export default defineNuxtPlugin(() => {
  return {
    provide: { bootstrap }
  };
});
