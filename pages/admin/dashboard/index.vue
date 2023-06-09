<script setup>
definePageMeta({ layout: "dashboard", middleware: "auth" });
const emojis = await import("nuxt-twemoji/emojis").catch(() => ({}));
const getEmoji = name => Object.values(emojis).find(emoji => emoji.name === name);
</script>

<template>
  <section>
    <div class="container py-5">
      <div class="text-center mb-2">
        <h1>{{ t("dashboard") }}</h1>
        <p>{{ t("estadisticas") }}</p>
      </div>
      <Transition name="tab" mode="out-in">
        <div v-if="charts[0] && charts[0].rendered" class="bg-dark rounded p-4 px-2 px-lg-4 img-fluid w-100">
          <h5 class="text-center">{{ t("visitas_60") }}</h5>
          <div ref="d60" :style="{ height: '400px' }" />
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
              <tr v-for="(country, i) in countries" :key="i">
                <td class="d-flex gap-2 align-items-center">
                  <Twemoji :emoji="getEmoji(`flag-${String(country.info?.name_en).toLowerCase().replace(/\s+/g, '-')}`)" size="1.5rem" />
                  {{ country.info?.name_es || t("desconocido") }}
                </td>
                <td class="border-start text-end">{{ country.requests }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      analytics: [],
      charts: [],
      countries: []
    };
  },
  async mounted () {
    this.analytics = await $fetch("/api/admin/analytics", {
      query: {
        days: 60
      }
    }).catch(() => []);

    const d60Canva = document.createElement("canvas");
    d60Canva.height = 400;
    d60Canva.style.height = "400px";
    d60Canva.style.maxHeight = "400px";
    const d60Context = d60Canva.getContext("2d");

    const dates = this.analytics.map(record => formatDate(record.dimensions.date, "short"));
    const pageViews = {
      data: this.analytics.map(record => record.sum.pageViews),
      label: t("visitas")
    };
    const uniques = {
      data: this.analytics.map(record => record.uniq.uniques),
      label: t("visitas_unicas")
    };

    this.charts.push({
      context: d60Context,
      content: {
        dimensions: dates,
        datasets: [pageViews, uniques]
      },
      rendered: true
    });

    setTimeout(() => {
      this.$refs.d60.appendChild(d60Canva);
    }, 500);

    this.charts.forEach((c) => {
      const chart = new this.$nuxt.$Chart(c.context);
      chart.render(c.content);
    });

    const countriesData = await $fetch("https://gist.githubusercontent.com/Yizack/bbfce31e0217a3689c8d961a356cb10d/raw/3e4c6e5fb7b767b8e24110ad3108db6acb749ba7/countries.json").then(c => JSON.parse(c).countries).catch(() => {});

    const countryMap = this.analytics.map(record => record.sum.countryMap.map(c => c));
    const countryMapReduced = countryMap.flat().reduce((acc, { clientCountryName, requests }) => {
      acc[clientCountryName] = acc[clientCountryName] ? acc[clientCountryName] + requests : requests;
      return acc;
    }, {});
    const countryMapSorted = Object.entries(countryMapReduced).sort(([, a], [, b]) => b - a);
    this.countries = countryMapSorted.map(([code, requests]) => ({
      code,
      info: countriesData.find(c => c.code_2 === code),
      requests
    })).slice(0, 10);
  }
};
</script>
