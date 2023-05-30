<script setup>
const { data: posts } = await useFetch("/api/posts", {
  query: {
    props: ["image", "titulo", "fecha", "permalink"].join(","),
    limit: 3
  }
});
</script>

<template>
  <main>
    <!-- Banner -->
    <BannerCarousel :banners="banners" />
    <!-- Actualidad Preview -->
    <section id="actualidad">
      <div class="container-fluid py-5">
        <h2 class="text-center text-uppercase mb-4">
          <strong>{{ t("actualidad") }}</strong>
        </h2>
        <div class="glide-wrapper">
          <div class="glide">
            <div class="glide__track" data-glide-el="track">
              <ul class="glide__slides">
                <li v-for="(post, i) of posts" :key="i" class="glide__slide p-0 px-sm-3" :class="{'glide__slide--active': !i}">
                  <article class="card mx-auto border-0 shadow">
                    <img :src="post.image" class="card-img-top">
                    <div class="card-body bg-dark">
                      <h4 class="card-title">
                        <strong>
                          <NuxtLink :to="'/p/' + post.permalink">{{ post.titulo }}</NuxtLink>
                        </strong>
                      </h4>
                      <LoadPost :permalink="post.permalink" :truncate="200" />
                    </div>
                    <div class="card-footer bg-dark p-0 overflow-hidden">
                      <div class="d-flex align-items-center ps-3">
                        <Icon class="text-white" name="solar:calendar-linear" size="1.1rem" />
                        <small class="text-body-secondary ms-1" :title="post.fecha">
                          {{ formatDate(post.fecha) }}
                        </small>
                        <NuxtLink class="hover ms-auto bg-primary text-white py-1 px-3" :to="'/p/' + post.permalink">
                          <small>{{ t("leer_mas") }} <Icon name="solar:arrow-right-bold" size="1.5rem" /></small>
                        </NuxtLink>
                      </div>
                    </div>
                  </article>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="text-center my-3">
          <NuxtLink to="/actualidad/">{{ t("ver_actualidad") }}</NuxtLink>
        </div>
      </div>
    </section>
    <!-- Categorías -->
    <section id="categorias">
      <div class="categorias bg-dark py-5">
        <div class="container">
          <h2 class="text-center text-uppercase mb-4">
            <strong>{{ t("categorias") }}</strong>
          </h2>
          <div class="row">
            <template v-for="(n, i) of 12" :key="i">
              <Transition name="tab">
                <div v-if="n <= 6 || moreCategorias" class="col-6 col-md-4 p-2 p-md-3">
                  <img class="img-fluid rounded shadow" :src="`${SITE.dirs.categorias}/${SCHEMA.categorias[i].image}`" :title="SCHEMA.categorias[i].name">
                </div>
              </Transition>
            </template>
          </div>
          <div class="text-center mt-4">
            <button class="btn btn-outline-light rounded-pill position-relative px-4" @click="moreCategorias = !moreCategorias">
              {{ moreCategorias ? t("ver_menos") : t("ver_mas") }}
              <Transition name="fade" mode="out-in">
                <Icon v-if="moreCategorias" class="position-absolute bottom-100 start-50 translate-middle-x text-white" name="solar:alt-arrow-up-bold" size="2rem" />
                <Icon v-else class="position-absolute top-100 start-50 translate-middle-x text-white" name="solar:alt-arrow-down-bold" size="2rem" />
              </Transition>
            </button>
          </div>
        </div>
      </div>
    </section>
    <!-- Servicios -->
    <section id="servicios">
      <div class="container py-5">
        <h2 class="text-center text-uppercase mb-4">
          <strong>{{ t("servicios") }}</strong>
        </h2>
        <div class="row">
          <template v-for="(servicio, i) of SCHEMA.servicios" :key="i">
            <div class="col-md-6 p-2 p-md-3">
              <div class="position-relative rounded overflow-hidden scale-position-hover">
                <div class="scale-position">
                  <img class="img-fluid shadow" :src="`${SITE.dirs.servicios}/${servicio.images[0]}`">
                </div>
                <NuxtLink class="position-absolute bottom-0 bg-dark w-100 bg-opacity-75 px-3 py-2 text-white d-flex justify-content-between align-items-center" :to="`/servicios/#${servicio.title}`">
                  <h5 class="m-0">{{ t(servicio.title) }}</h5>
                  <Icon name="solar:square-bottom-up-linear" size="1.5rem" />
                </NuxtLink>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data () {
    return {
      posts: [],
      rendered: false,
      moreCategorias: false,
      banners: [
        "home-1.jpg",
        "home-2.jpg",
        "home-3.jpg"
      ]
    };
  },
  mounted () {
    this.$nuxt.$glide("#actualidad .glide", {
      type: "carousel",
      autoplay: 5000,
      animationDuration: 500,
      gap: 0,
      focusAt: "center",
      perView: 1,
      peek: {
        before: 0,
        after: 0
      }
    });
  }
};
</script>
