<script setup>
import { component as Editor } from "@ckeditor/ckeditor5-vue";
import "~/assets/css/ckeditor.css";

definePageMeta({ layout: "dashboard" });
</script>

<template>
  <section>
    <form ref="form">
      <div class="d-flex p-3 border-bottom align-items-center gap-2 shadow bg-dark">
        <div class="form-floating flex-grow-1">
          <input v-model="form.titulo" type="text" class="form-control" :placeholder="t('titulo')" @input="generatePermalink($event)">
          <label>{{ t("titulo") }}</label>
        </div>
        <button class="btn btn-primary py-3" type="submit">{{ t("publicar") }}</button>
        <button class="btn btn-warning py-3" type="button" @click="previewPost()">{{ t("previsualizar") }}</button>
      </div>
      <div class="container-fluid">
        <div class="row flex-row">
          <div class="col-xl-10 p-2">
            <Transition name="fade" mode="out-in">
              <div v-if="editor" class="rounded border h-100 overflow-hidden">
                <ClientOnly>
                  <Editor v-model="form.content" :editor="$nuxt.$ckeditor.editor" :config="$nuxt.$ckeditor.config" />
                </ClientOnly>
              </div>
              <div v-else class="d-flex justify-content-center align-items-center h-100">
                <div class="spinner-border text-white" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </Transition>
          </div>
          <div class="col-xl-2 shadow p-0 bg-dark">
            <div class="border-bottom p-3">
              <h5 class="m-0"><Icon name="solar:alt-arrow-down-bold" /> {{ t("config") }}</h5>
            </div>
            <div class="border-bottom p-3">
              <h5 class="m-0"><Icon name="solar:gallery-add-linear" /> {{ t("banner") }}</h5>
              <p class="text-muted small mb-1">JPG (1290x600)</p>
              <input type="file" class="form-control" :required="!form.banner.src" @change="addBanner($event)">
              <div class="pt-2">
                <img class="img-fluid rounded bg-body" :src="form.banner.src ? form.banner.src : `/images/placeholder.png`" width="1290" height="600">
              </div>
            </div>
            <div class="border-bottom p-3">
              <h5><Icon name="solar:tag-linear" /> {{ t("tag") }}</h5>
              <select v-model="form.tag" class="form-select" required>
                <option disabled selected>{{ t("seleccionar") }}</option>
                <option disabled>-- {{ t("juegos") }} --</option>
                <option v-for="(tag, i) of SCHEMA.tags.filter(v => v.type === 'juegos')" :key="i" class="text-white" :value="tag.tag">{{ tag.name }}</option>
                <option disabled>-- {{ t("otros") }} --</option>
                <option v-for="(tag, i) of SCHEMA.tags.filter(v => v.type === 'otros')" :key="i" class="text-white" :value="tag.tag">{{ tag.name }}</option>
              </select>
            </div>
            <div class="p-3">
              <h5><Icon name="solar:calendar-linear" /> {{ t("fecha") }}</h5>
              <input v-if="date.show" v-model="form.fecha" type="date" class="form-control" required @mouseleave="date.show = date.focus && date.show" @focusin="date.focus = true" @focusout="date.focus = false; date.show = false">
              <input v-else type="text" class="form-control" :value="formatDate(form.fecha)" readonly @mouseenter="date.show = true">
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
      editor: false,
      date: {
        focus: false,
        show: false
      },
      form: {
        titulo: "",
        content: "",
        banner: {
          src: "",
          type: ""
        },
        tag: "",
        fecha: new Date().toISOString().split("T")[0],
        permalink: ""
      }
    };
  },
  mounted () {
    this.editor = true;
    if (this.$route.meta.data) {
      this.form = this.$route.meta.data;
    }
  },
  methods: {
    generatePermalink (e) {
      this.form.permalink = e.target.value.toLowerCase().replace(/ /g, "-").normalize("NFD").replace(/[\u0300-\u036F]/g, "").replace(/[^a-zA-Z0-9-]/g, "");
    },
    addBanner (e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.banner.src = reader.result;
        this.form.banner.type = file.type;
      };
    },
    previewPost () {
      if (!this.$refs.form.reportValidity()) {
        return;
      }
      this.$router.beforeEach((to, from, next) => {
        if (to.name === "admin-dashboard-preview") {
          to.meta.data = this.form;
        }
        next();
      });
      this.$router.push({ name: "admin-dashboard-preview" });
    }
  }
};
</script>
