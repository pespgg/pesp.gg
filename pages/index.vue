<script setup>
import { posts } from "~/data/posts.json";
import { juegos } from "~/data/categorias.json";
import { servicios } from "~/data/servicios.json";
const actualidad = posts.filter(post => post.visible === "public");
</script>

<template>
  <!-- Banner -->
  <section>
    <div id="banner" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button v-for="(image, i) of carousel" :key="i" type="button" data-bs-target="#banner" :data-bs-slide-to="i" :class="{ active: !i }" aria-current="true" aria-label="Slide" />
      </div>
      <div class="carousel-inner">
        <div v-for="(image, i) of carousel" :key="i" class="carousel-item" :class="{ active: !i }" data-bs-interval="10000">
          <img :src="image" class="d-block w-100" alt="...">
        </div>
      </div>
    </div>
  </section>
  <!-- Actualidad Preview -->
  <section>
    <div class="container-fluid py-5">
      <h2 class="text-center text-uppercase mb-4">
        <strong>{{ t("actualidad") }}</strong>
      </h2>
      <div id="actualidad" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div v-for="(n, i) of 3" :key="n" class="carousel-item" :class="{ active: !(i) }">
            <div class="card mx-auto border-0 shadow home">
              <img :src="'https://pesp.gg/images/posts/' + actualidad[i].image" class="card-img-top home">
              <div class="card-body bg-dark home">
                <h4 class="card-title">
                  <strong>
                    <NuxtLink :to="'/' + actualidad[i].permalink">{{ actualidad[i].titulo_es }}</NuxtLink>
                  </strong>
                </h4>
                <p class="card-text">{{ truncate(stripTags(actualidad[i].p_es), 200) }}</p>
              </div>
              <div class="card-footer bg-dark p-0">
                <div class="d-flex align-items-center">
                  <small class="text-body-secondary ps-3" :title="actualidad[i].fecha">
                    <Icon class="text-white" name="utils/calendar" />
                    {{ formatDate(actualidad[i].fecha) }}
                  </small>
                  <NuxtLink class="hover ms-auto bg-primary text-white py-1 px-3 rounded rounded-top-0 rounded-start-0" :to="'/' + actualidad[i].permalink">
                    <small>{{ t("leer_mas") }} <Icon name="utils/right" /></small>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#actualidad" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true" />
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#actualidad" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true" />
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <div class="text-center my-3">
        <NuxtLink to="/actualidad/">{{ t("ver_actualidad") }}</NuxtLink>
      </div>
    </div>
  </section>
  <!-- Categorías -->
  <section>
    <div class="categorias bg-dark py-5">
      <div class="container">
        <h2 class="text-center text-uppercase mb-4">
          <strong>{{ t("categorias") }}</strong>
        </h2>
        <div class="row">
          <TransitionGroup name="tab" mode="out-in">
            <template v-for="(n, i) of 12" :key="i">
              <div v-if="n <= 6 || moreCategorias" class="col-6 col-md-4 p-2 p-md-3">
                <img class="img-fluid rounded shadow" :src="'https://pesp.gg/images/juegos/' + juegos[i].image">
              </div>
            </template>
          </TransitionGroup>
        </div>
        <div class="text-center mt-4">
          <button class="btn btn-outline-light rounded-pill position-relative px-4" @click="moreCategorias = !moreCategorias">
            {{ moreCategorias ? t("ver_menos") : t("ver_mas") }}
            <Transition name="fade" mode="out-in">
              <Icon v-if="moreCategorias" class="position-absolute bottom-100 start-50 translate-middle-x text-white" name="utils/up" size="md" />
              <Icon v-else class="position-absolute top-100 start-50 translate-middle-x text-white" name="utils/down" size="md" />
            </Transition>
          </button>
        </div>
      </div>
    </div>
  </section>
  <!-- Servicios -->
  <section>
    <div class="py-5">
      <div class="container">
        <h2 class="text-center text-uppercase mb-4">
          <strong>{{ t("servicios") }}</strong>
        </h2>
        <div class="row">
          <template v-for="(servicio, i) of servicios" :key="i">
            <div class="col-md-6 p-2 p-md-3">
              <div class="position-relative">
                <img class="img-fluid rounded shadow" :src="'https://pesp.gg/images/servicios/' + servicio.image">
                <NuxtLink class="position-absolute bottom-0 bg-dark w-100 bg-opacity-75 px-3 py-2 text-white d-flex justify-content-between align-items-center rounded-bottom" to="/servicios/">
                  <h5 class="m-0">{{ servicio.servicio_es }}</h5>
                  <Icon name="utils/bottom-up" size="sm" />
                </NuxtLink>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      moreCategorias: false,
      carousel: [
        "https://pesp.gg/images/banners/Principal_f.jpg",
        "https://pesp.gg/images/banners/Secundario_f.jpg",
        "https://pesp.gg/images/banners/Tercero.jpg"
      ]
    };
  }
};
</script>
