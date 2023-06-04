<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "~/assets/css/quill.css";
definePageMeta({ layout: "dashboard" });
</script>

<template>
  <section>
    <form>
      <div class="d-flex p-3 border-bottom align-items-center gap-2 shadow bg-dark">
        <div class="form-floating flex-grow-1">
          <input v-model="form.title" type="text" class="form-control" :placeholder="t('titulo')" @input="generatePermalink($event)">
          <label>{{ t("titulo") }}</label>
        </div>
        <button class="btn btn-primary py-3">{{ t("publicar") }}</button>
        <button class="btn btn-warning py-3">{{ t("previsualizar") }}</button>
      </div>
      <div class="container-fluid">
        <div class="row flex-row">
          <div class="col-xl-9 p-2">
            <div class="rounded border overflow-hidden">
              <ClientOnly>
                <QuillEditor v-model.lazy="form.content" class="border-0" toolbar="full" :modules="$nuxt.$quill.modules" />
              </ClientOnly>
            </div>
          </div>
          <div class="col-xl-3 shadow p-0 bg-dark">
            <div class="border-bottom p-3">
              <h5 class="m-0"><Icon name="solar:alt-arrow-down-bold" /> {{ t("config") }}</h5>
            </div>
            <div class="border-bottom p-3">
              <h5><Icon name="solar:gallery-add-linear" /> {{ t("banner") }} <small class="text-muted">JPG (1290x600)</small></h5>
              <input type="file" class="form-control" required>
              <div class="pt-2">
                <img class="img-fluid rounded bg-body" src="/images/placeholder.png" width="1290" height="600">
              </div>
            </div>
            <div class="border-bottom p-3">
              <h5><Icon name="solar:tag-linear" /> {{ t("tag") }}</h5>
              <select class="form-select" required>
                <option disabled selected>{{ t("seleccionar") }}</option>
                <option disabled>-- {{ t("juegos") }} --</option>
                <option v-for="(tag, i) of SCHEMA.tags.filter(v => v.type === 'juegos')" :key="i" class="text-white">{{ tag.name }}</option>
                <option disabled>-- {{ t("otros") }} --</option>
                <option v-for="(tag, i) of SCHEMA.tags.filter(v => v.type === 'otros')" :key="i" class="text-white">{{ tag.name }}</option>
              </select>
            </div>
            <div class="p-3">
              <h5><Icon name="solar:link-minimalistic-2-linear" /> {{ t("permalink") }}</h5>
              <input v-model="form.permalink" type="text" class="form-control" required>
            </div>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>

export default {
  data () {
    return {
      form: {
        title: "",
        content: "",
        banner: "",
        tag: "",
        permalink: ""
      }
    };
  },
  mounted () {
    console.log(this.$nuxt.$quill);
  },
  methods: {
    generatePermalink (e) {
      this.form.permalink = e.target.value.toLowerCase().replace(/ /g, "-").normalize("NFD").replace(/[\u0300-\u036F]/g, "").replace(/[^a-zA-Z0-9-]/g, "");
    }
  }
};
</script>
