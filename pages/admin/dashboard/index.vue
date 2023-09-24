<script setup>
definePageMeta({ layout: "dashboard", middleware: "auth" });

const { data: emailList } = await useFetch("/api/admin/email/list");

const correos = emailList.value || [];

const emojis = await import("nuxt-twemoji/emojis").catch(() => ({}));
const getEmoji = fullName => Object.values(emojis).find((emoji) => {
  const name = `flag-${String(fullName).toLowerCase().replace(/\s+/g, "-")}`;
  return emoji.name === name;
})?.emoji;
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
            <select v-model="filter.days" class="form-select ms-3" :style="{ width: 'auto' }" @change="filterBy($event)">
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
                  <Twemoji v-if="getEmoji(country.info?.name_en)" :emoji="getEmoji(country.info?.name_en)" size="1.5rem" />
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
      <div class="bg-dark rounded img-fluid w-100">
        <div class="p-2 px-2 px-lg-4 text-center">
          <h5 class="m-0">Correos electrónicos activos: {{ correos.length }}</h5>
        </div>
        <table class="table table-dark table-striped table-hover rounded-bottom overflow-hidden">
          <thead>
            <tr>
              <th>{{ t("correo") }}</th>
              <th class="border-start">{{ t("correo_vinculado") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(correo, i) in correos" :key="i">
              <td>{{ correo.matchers[0].value }}</td>
              <td class="border-start">{{ correo.actions[0].value[0] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      countriesData: [],
      filter: {
        days: 60
      },
      daysOptions: [7, 30, 60, 90, 180, 365],
      analytics: [],
      charts: {},
      changeRequest: false
    };
  },
  computed: {
    dates () {
      return this.analytics.map(record => formatDate(record.dimensions.date, "short"));
    },
    pageViews () {
      return {
        data: this.analytics.map(record => record.sum.pageViews),
        label: t("visitas")
      };
    },
    uniques () {
      return {
        data: this.analytics.map(record => record.uniq.uniques),
        label: t("visitas_unicas")
      };
    },
    threats () {
      return {
        data: this.analytics.map(record => record.sum.threats),
        label: t("amenazas")
      };
    },
    countries () {
      const countryMap = this.analytics.map(record => record.sum.countryMap.map(c => c));
      const countryMapReduced = countryMap.flat().reduce((acc, { clientCountryName, requests }) => {
        acc[clientCountryName] = acc[clientCountryName] ? acc[clientCountryName] + requests : requests;
        return acc;
      }, {});
      const countryMapSorted = Object.entries(countryMapReduced).sort(([, a], [, b]) => b - a);
      return countryMapSorted.map(([code, requests]) => ({
        code,
        info: this.countriesData.find(c => c.code_2 === code),
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
      const browserMap = this.analytics.map(record => record.sum.browserMap.map(b => b));
      const browserMapReduced = browserMap.flat().reduce((acc, { uaBrowserFamily, pageViews }) => {
        acc[uaBrowserFamily] = acc[uaBrowserFamily] ? acc[uaBrowserFamily] + pageViews : pageViews;
        return acc;
      }, {});
      const browserMapSorted = Object.entries(browserMapReduced).sort(([, a], [, b]) => b - a);
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
    this.countriesData = await $fetch("https://gist.githubusercontent.com/Yizack/bbfce31e0217a3689c8d961a356cb10d/raw/3e4c6e5fb7b767b8e24110ad3108db6acb749ba7/countries.json").then(c => JSON.parse(c).countries).catch(() => []);
    const generalCanva = document.createElement("canvas");
    generalCanva.height = 400;
    generalCanva.style.height = "400px";
    generalCanva.style.maxHeight = "400px";
    const generalContext = generalCanva.getContext("2d");
    this.charts.general = new this.$nuxt.$Chart(generalContext);
    setTimeout(() => {
      this.$refs.general?.appendChild(generalCanva);
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
    async requestAnalytics (days) {
      this.analytics = await $fetch("/api/admin/analytics", {
        query: { days }
      }).catch(() => []);
    },
    async filterBy (e) {
      this.changeRequest = true;
      await this.requestAnalytics(e.target.value);
      this.renderChart();
    }
  }
};
</script>
