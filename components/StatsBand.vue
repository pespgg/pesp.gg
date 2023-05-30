<template>
  <section id="stats" ref="stats" @scroll.self="test()">
    <div class="band container-fluid bg-dark py-5">
      <div class="row row-gap-4 justify-content-center">
        <div v-for="(stat, i) of stats" :key="i" :class="`col-12 col-sm-6 col-md-${col} text-center`">
          <div v-if="stat.counter">
            <h1>
              <strong><span ref="counters">{{ thousandToK(stat.counter) }}</span>+</strong>
            </h1>
          </div>
          <div v-if="stat.carousel">
            <div :id="`carousel-${i}`" class="carousel slide carousel-fade">
              <div class="carousel-inner">
                <div v-for="(item, j) of stat.carousel" :key="j" class="carousel-item" :class="{ active: !j }">
                  <h1>
                    <Icon :name="item.icon" />
                  </h1>
                  <h4 class="m-0 text-uppercase">
                    <strong>{{ t(item.title) }}</strong>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <h4 v-if="!stat.carousel" class="m-0 text-uppercase">
            <template v-if="stat.seguidores">
              <strong>{{ t(stat.title) }}</strong>
              <h1>
                <Icon :name="stat.icon" />
              </h1>
            </template>
            <strong v-else>{{ t(stat.title) }}</strong>
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
    },
    col: {
      type: Number,
      default: 4
    }
  },
  data () {
    return {
      tweened: false
    };
  },
  mounted () {
    window.addEventListener("scroll", this.onView);

    this.stats.forEach((stat, i) => {
      if (stat.carousel) {
        this.$nuxt.$bootstrap.startCarousel(`#stats #carousel-${i}`);
      }
    });
  },
  unmounted () {
    window.removeEventListener("scroll", this.onView);
  },
  methods: {
    tweenCounters () {
      const counters = this.$refs.counters;
      counters.forEach(async (counter) => {
        const target = KtoNumber(counter.innerText);
        await tweenNumber({ target, duration: 1 }, (tween) => {
          counter.innerText = thousandToK(tween.toFixed(0));
          this.tweened = true;
        });
      });
    },
    onView () {
      const { top, bottom } = this.$refs.stats.getBoundingClientRect();
      if (top < window.innerHeight && bottom > 0) {
        if (!this.tweened) {
          this.tweenCounters();
        }
      }
      else {
        this.tweened = false;
      }
    }
  }
};
</script>
