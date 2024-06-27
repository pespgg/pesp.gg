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
            <div class="row mb-4 mx-0 border-bottom py-2">
              <div class="col-6 border-end">
                <p class="m-0 ">{{ t("max_unique") }}</p>
                <p class="m-0">
                  <small>{{ t("por_dia") }}</small>
                </p>
                <h4>{{ unique.max }}</h4>
              </div>
              <div class="col-6">
                <p class="m-0">{{ t("min_unique") }}</p>
                <p class="m-0">
                  <small>{{ t("por_dia") }}</small>
                </p>
                <h4>{{ unique.min }}</h4>
              </div>
            </div>
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
                <th class="text-end border-start">{{ t("solicitudes") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="country in countries" :key="country.code">
                <td class="d-flex gap-2 align-items-center">
                  <Twemoji v-if="getEmoji(country.code)" :emoji="getEmoji(country.code)" size="1.5rem" />
                  {{ country.info?.name_es || t("desconocido") }}
                </td>
                <td class="border-start text-end">{{ country.requests }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Transition>
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
              <td class="d-flex gap-2 align-items-center">{{ browser.name }}</td>
              <td class="border-start text-end">{{ browser.pageViews }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  data () {
    return {
      countriesData: [],
      filter: {
        days: 60
      },
      daysOptions: [7, 30, 60, 90, 180, 365],
      analytics: [],
      charts: {} as any,
      changeRequest: false
    };
  },
  computed: {
    dates () {
      return this.analytics.map((record: any) => formatDate(record.dimensions.date, { style: "short" }));
    },
    pageViews () {
      return {
        data: this.analytics.map((record: any) => record.sum.pageViews),
        label: t("visitas")
      };
    },
    uniques () {
      return {
        data: this.analytics.map((record: any) => record.uniq.uniques),
        label: t("visitas_unicas")
      };
    },
    threats () {
      return {
        data: this.analytics.map((record: any) => record.sum.threats),
        label: t("amenazas")
      };
    },
    countries () {
      const countryMap = this.analytics.map((record: any) => record.sum.countryMap.map((c: any) => c));
      const countryMapReduced = countryMap.flat().reduce((acc, { clientCountryName, requests }) => {
        acc[clientCountryName] = acc[clientCountryName] ? acc[clientCountryName] + requests : requests;
        return acc;
      }, {});
      const countryMapSorted = Object.entries(countryMapReduced).sort(([, a]: any, [, b]: any) => b - a);
      return countryMapSorted.map(([code, requests]) => ({
        code,
        info: countriesData.find(c => c.code_2 === code),
        requests
      })).slice(0, 10);
    },
    unique () {
      return {
        max: Math.max(...this.uniques.data),
        min: Math.min(...this.uniques.data)
      };
    },
    browsers () {
      const browserMap = this.analytics.map((record: any) => record.sum.browserMap.map((b: any) => b));
      const browserMapReduced = browserMap.flat().reduce((acc, { uaBrowserFamily, pageViews }) => {
        acc[uaBrowserFamily] = acc[uaBrowserFamily] ? acc[uaBrowserFamily] + pageViews : pageViews;
        return acc;
      }, {});
      const browserMapSorted = Object.entries(browserMapReduced).sort(([, a]: any, [, b]: any) => b - a);
      return browserMapSorted.map(([name, pageViews]) => ({
        name,
        pageViews
      }));
    },
    generalChartContent () {
      return {
        dimensions: this.dates,
        datasets: [this.pageViews, this.uniques, this.threats]
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
