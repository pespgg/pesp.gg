<template>
  <section id="datos">
    <div class="container-fluid bg-dark py-5">
      <div class="row">
        <div v-for="(stat, i) of stats" :key="i" class="col-4 text-center">
          <div v-if="stat.counter">
            <h1>{{ stat.counter }}+</h1>
          </div>
          <div v-if="stat.carousel">
            <div :id="`carousel-${i}`" class="carousel slide carousel-fade" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div v-for="(item, j) of stat.carousel" :key="j" class="carousel-item" :class="{ active: !j }">
                  <h1>
                    <Icon :name="item.icon" size="full" />
                  </h1>
                  <h4 class="m-0 text-uppercase">
                    <strong>{{ item.title }}</strong>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <h4 v-if="!stat.carousel" class="m-0 text-uppercase">
            <strong>{{ stat.title }}</strong>
          </h4>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    stats: {
      type: Array,
      required: true
    }
  }
};
</script>
