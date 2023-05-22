<template>
  <section id="datos" ref="datos" @scroll.self="test()">
    <div class="band container-fluid bg-dark py-5">
      <div class="row row-gap-4 justify-content-center">
        <div v-for="(stat, i) of stats" :key="i" class="col-12 col-sm-6 col-md-4 text-center">
          <div v-if="stat.counter">
            <h1>
              <strong><span ref="counters">{{ stat.counter }}</span>+</strong>
            </h1>
          </div>
          <div v-if="stat.carousel">
            <div :id="`carousel-${i}`" class="carousel slide carousel-fade" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div v-for="(item, j) of stat.carousel" :key="j" class="carousel-item" :class="{ active: !j }">
                  <h1>
                    <Icon :name="item.icon" size="full" />
                  </h1>
                  <h4 class="m-0 text-uppercase">
                    <strong>{{ t(item.title) }}</strong>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <h4 v-if="!stat.carousel" class="m-0 text-uppercase">
            <strong>{{ t(stat.title) }}</strong>
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
  },
  data () {
    return {
      tweened: false
    };
  },
  mounted () {
    window.addEventListener("scroll", this.tweenCounters);
  },
  unmounted () {
    window.removeEventListener("scroll", this.tweenCounters);
  },
  methods: {
    countUp () {
      const counters = this.$refs.counters;
      counters.forEach(async (counter) => {
        const target = Number(counter.innerText);
        await tweenNumber({ target, duration: 1 }, (tween) => {
          counter.innerText = tween.toFixed(0);
          this.tweened = true;
        });
      });
    },
    tweenCounters () {
      const { top, bottom } = this.$refs.datos.getBoundingClientRect();
      if (top < window.innerHeight && bottom > 0) {
        if (!this.tweened) {
          this.countUp();
        }
      }
      else {
        this.tweened = false;
      }
    }
  }
};
</script>
