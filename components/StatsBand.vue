<template>
  <section id="stats" ref="stats">
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
                  <h4 class="m-0 text-uppercase">{{ t(item.title) }}</h4>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!stat.carousel" class="m-0 text-uppercase">
            <template v-if="stat.seguidores">
              <h4 class="m-0">{{ t(stat.title) }}</h4>
              <h1>
                <Icon :name="stat.icon" />
              </h1>
            </template>
            <h4 v-else>{{ t(stat.title) }}</h4>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  props: {
    stats: {
      type: Array as () => PespStats[],
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
      const counters = this.$refs.counters as HTMLElement[];
      for (const counter of counters) {
        const target = KtoNumber(counter.innerText);
        tweenNumber({ target, duration: 1 }, (tween: number) => {
          counter.innerText = thousandToK(Number(tween.toFixed(0)));
          this.tweened = true;
        });
      }
    },
    onView () {
      const { top, bottom } = (this.$refs.stats as HTMLElement).getBoundingClientRect();
      if (top < window.innerHeight && bottom > 0) {
        if (!this.tweened) this.tweenCounters();
      }
      else {
        this.tweened = false;
      }
    }
  }
};
</script>
