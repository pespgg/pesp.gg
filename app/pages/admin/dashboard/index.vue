<script setup lang="ts">
import countriesData from "~/assets/data/countries.json";

definePageMeta({ layout: "dashboard", middleware: "auth" });

const getEmoji = (code: string) => countriesData.find(country => country.code_2 === code)?.emoji || "";
</script>

<template>
  <section>
    <div class="container py-5">
      <div class="text-center mb-2">
        <h1>{{ t("dashboard") }}</h1>
        <p>{{ t("estadisticas") }}</p>
      </div>
      <Transition name="tab" mode="out-in">
        <div v-if="charts.general">
          <div class="d-flex justify-content-end align-items-center mb-2">
            <Transition name="fade" mode="out-in">
              <SpinnerCircle v-if="changeRequest" />
            </Transition>
            <select v-model.number="filter.days" class="form-select ms-3" :style="{ width: 'auto' }" @change="filterBy($event)">
              <option v-for="n of daysOptions" :key="n" :value="n">{{ t(`ultimos_${n}_dias`) }}</option>
            </select>
          </div>
          <div class="bg-dark rounded p-4 px-2 px-lg-4 img-fluid w-100">
            <h5 class="text-center">{{ t("visitas_en") }} {{ t(`ultimos_${filter.days}_dias`).toLowerCase() }}</h5>

            <div ref="general" :style="{ height: '400px' }" />
          </div>
        </div>
        <SpinnerCircle v-else :style="{ height: '400px' }" />
      </Transition>
      <Transition name="tab" mode="out-in">
        <div v-if="countries.length" class="mt-3">
          <table class="table table-dark table-striped table-hover rounded overflow-hidden">
            <thead>
              <tr>
                <th>{{ t("pais_region") }}</th>
                <th class="text-end border-start">{{ t("visitas") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="country in countries" :key="country.dimensions.metric">
                <td class="d-flex gap-2 align-items-center">
                  <Twemoji v-if="getEmoji(country.dimensions.metric)" :emoji="getEmoji(country.dimensions.metric)" size="1.5rem" />
                  {{ countriesData.find(c => c.code_2 === country.dimensions.metric)?.name_es || t("desconocido") }}
                </td>
                <td class="border-start text-end">{{ country.count }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Transition>
      <Transition name="tab" mode="out-in">
        <div v-if="browsers.length" class="mt-3">
          <table class="table table-dark table-striped table-hover rounded overflow-hidden">
            <thead>
              <tr>
                <th>{{ t("browser") }}</th>
                <th class="text-end border-start">{{ t("visitas") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(browser, i) in browsers" :key="i">
                <td class="d-flex gap-2 align-items-center">{{ browser.dimensions.metric }}</td>
                <td class="border-start text-end">{{ browser.count }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Transition>
      <Transition name="tab" mode="out-in">
        <div v-if="oss.length" class="mt-3">
          <table class="table table-dark table-striped table-hover rounded overflow-hidden">
            <thead>
              <tr>
                <th>{{ t("oss") }}</th>
                <th class="text-end border-start">{{ t("visitas") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(os, i) in oss" :key="i">
                <td class="d-flex gap-2 align-items-center">
                  {{ os.dimensions.metric }}
                </td>
                <td class="border-start text-end">{{ os.count }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  data () {
    return {
      countriesData: [],
      filter: {
        days: 7
      },
      daysOptions: [7, 14, 30],
      // TODO: improve analytics types
      // @ts-expect-error no types for now
      analytics: [] as { series: any[], countries: any[], topBrowsers: any[], topOSs: any[] },
      charts: {} as any,
      changeRequest: false
    };
  },
  computed: {
    dates () {
      const fillDates = [];
      for (let i = 1; i <= this.filter.days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        fillDates.push(date.toISOString().split("T")[0]);
      }
      return fillDates.reverse();
    },
    pageViews () {
      return {
        data: this.dates.map((date) => {
          const view = this.analytics.series.find((view: any) => view.dimensions.ts.split("T")[0] === date);
          return view ? view.count : 0;
        }),
        label: t("visitas")
      };
    },
    countries () {
      return this.analytics.countries || [];
    },
    browsers () {
      return this.analytics.topBrowsers || [];
    },
    oss () {
      return this.analytics.topOSs || [];
    },
    generalChartContent () {
      return {
        dimensions: this.dates,
        datasets: [this.pageViews]
      };
    }
  },
  async mounted () {
    await this.requestAnalytics(this.filter.days);
    const generalCanva = document.createElement("canvas");
    generalCanva.height = 400;
    generalCanva.style.height = "400px";
    generalCanva.style.maxHeight = "400px";
    const generalContext = generalCanva.getContext("2d");
    this.charts.general = new this.$nuxt.$Chart(generalContext);
    setTimeout(() => {
      (this.$refs.general as HTMLElement)?.appendChild(generalCanva);
    }, 1000);

    this.renderChart();
  },
  methods: {
    renderChart () {
      this.$nuxt.$Chart.destroyAll();
      this.charts.general.render(this.generalChartContent, () => {
        this.changeRequest = false;
      });
    },
    async requestAnalytics (days: number) {
      this.analytics = await $fetch("/api/admin/analytics", {
        query: { days }
      }).catch(() => []);
    },
    async filterBy (e: Event) {
      this.changeRequest = true;
      const target = e.target as HTMLInputElement;
      await this.requestAnalytics(Number(target.value));
      this.renderChart();
    }
  }
};
</script>
