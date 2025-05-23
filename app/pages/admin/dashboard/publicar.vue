<script setup lang="ts">
definePageMeta({ layout: "dashboard", middleware: "auth" });
const { meta } = useRoute() as { meta: PespEditorMeta };

if (meta.data && meta.edit) {
  meta.data.content = await getPostContent(meta.data.permalink, meta.data.updated);
  meta.data.banner.src = getPostImage(meta.data.permalink, meta.data.updated);
  meta.data.banner.type = "url";
}

async function getPostContent (permalink: string, updated: number) {
  const url = import.meta.dev ? `${SITE.local}/posts/content` : `${SITE.cdn}/posts/content`;
  return $fetch<string>(`${url}/${permalink}.html?updated=${updated}`).catch(() => "");
}
</script>

<template>
  <section>
    <form ref="form" @submit.prevent="publishPost()">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 d-flex flex-wrap py-2 align-items-center gap-2 shadow bg-dark">
            <div class="form-floating flex-grow-1">
              <input v-model.trim="form.titulo" type="text" class="form-control form-control-lg" :placeholder="t('titulo')" required @input="generatePermalink($event)">
              <label>{{ t("titulo") }}</label>
            </div>
            <Transition name="fade" mode="out-in">
              <SpinnerCircle v-if="loading" class="spinner-border-sm" />
            </Transition>
            <div class="d-flex gap-2 flex-grow-1 flex-sm-grow-0">
              <button class="btn btn-info py-3 fw-bold w-100 text-uppercase d-flex justify-content-center gap-2 align-items-center" type="submit">
                <Icon v-if="meta.edit" name="solar:diskette-linear" size="1.5rem" />
                <Icon v-else name="solar:archive-minimalistic-line-duotone" size="1.5rem" />
                {{ t(meta.edit ? "guardar" : "publicar") }}
              </button>
              <button class="btn btn-warning py-3 fw-bold w-100 text-uppercase d-flex justify-content-center gap-2 align-items-center" type="button" @click="previewPost()">
                <Icon name="solar:test-tube-outline" size="1.5rem" />
                {{ t("previsualizar") }}
              </button>
            </div>
          </div>
          <div class="col-lg-10 py-2">
            <Transition name="fade" mode="out-in">
              <div v-if="editor" class="rounded border h-100 shadow d-flex flex-column overflow-hidden">
                <ClientOnly>
                  <Ckeditor ref="wordcount" v-model="form.content" :editor="$nuxt.$ckeditor.editor" :config="$nuxt.$ckeditor.config" @ready="onEditorLoaded($event)" />
                  <div ref="wordcount" class="bg-light text-dark py-1 px-2 small" />
                </ClientOnly>
              </div>
              <SpinnerCircle v-else class="h-100" />
            </Transition>
          </div>
          <div class="col-lg-2 shadow p-0 bg-dark">
            <div class="sticky-top" :style="{ top: '60px' }">
              <div id="image-upload" class="border-bottom p-3">
                <h5><Icon name="solar:gallery-wide-linear" /> {{ t("banner") }}</h5>
                <input id="banner" type="file" @change="addBanner($event)">
                <p class="text-muted small mb-0">Image (1290x600, 8MB Max)</p>
                <label for="banner" class="rounded bg-body-tertiary position-relative overflow-hidden">
                  <div class="overlay position-absolute bg-dark w-100 h-100">
                    <div class="d-flex justify-content-center align-items-center h-100 text-light">
                      <Icon v-if="meta.edit" name="solar:gallery-edit-outline" size="2.5rem" />
                      <Icon v-else name="solar:gallery-add-outline" size="2.5rem" />
                    </div>
                  </div>
                  <img class="img-fluid" :src="form.banner.src ? form.banner.src : '/images/placeholder.png'" width="1290" height="600">
                </label>
              </div>
              <div class="border-bottom p-3">
                <h5><Icon name="solar:tag-linear" /> {{ t("tag") }}</h5>
                <select v-model="form.tag" class="form-select form-select-sm" required>
                  <option value="" disabled selected>{{ t("seleccionar") }}</option>
                  <option disabled>-- {{ t("juegos") }} --</option>
                  <option v-for="(tag, i) of juegos" :key="i" class="text-light" :value="tag.tag">{{ tag.name }}</option>
                  <option disabled>-- {{ t("otros") }} --</option>
                  <option v-for="(tag, i) of otros" :key="i" class="text-light" :value="tag.tag">{{ tag.name }}</option>
                </select>
              </div>
              <div class="border-bottom p-3">
                <h5><Icon name="solar:eye-linear" /> {{ t("visibilidad") }}</h5>
                <div class="form-check">
                  <input v-model="form.visible" class="form-check-input" type="checkbox">
                  <label class="form-check-label">{{ t("publico") }}</label>
                </div>
              </div>
              <div class="border-bottom p-3">
                <h5><Icon name="solar:calendar-linear" /> {{ t("fecha") }}</h5>
                <input v-if="date.show" v-model="form.fecha" type="date" class="form-control form-control-sm" required @mouseleave="date.show = date.focus && date.show" @focusin="date.focus = true" @focusout="date.focus = false; date.show = false">
                <input v-else type="text" class="form-control form-control-sm" :value="formatDate(form.fecha)" readonly @mouseenter="date.show = true">
              </div>
              <div class="p-3">
                <h5><Icon name="solar:link-minimalistic-2-linear" /> {{ t("permalink") }}</h5>
                <input v-model="form.permalink" type="text" class="form-control form-control-sm" :disabled="($route.meta as PespEditorMeta).edit" required>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
export default {
  beforeRouteLeave (to, from, next) {
    if (to.name === "admin-dashboard-preview" && from.meta.data) {
      to.meta.data = from.meta.data;
      to.meta.edit = from.meta.edit;
    }
    next();
  },
  data () {
    return {
      loading: false,
      editor: false,
      date: {
        focus: false,
        show: false
      },
      form: {
        titulo: "",
        content: "",
        banner: {
          file: null as File | null | undefined,
          src: "",
          type: ""
        },
        tag: "",
        fecha: new Date().toISOString().split("T")[0]!,
        permalink: "",
        visible: true
      }
    };
  },
  computed: {
    dateToOffset () {
      return new Date(new Date(this.form.fecha).getTimezoneOffset() * 60000).toISOString().split("T")[0];
    },
    juegos () {
      return SCHEMA_tags.filter(v => v.type === "juegos").sort((a, b) => a.name.localeCompare(b.name));
    },
    otros () {
      return SCHEMA_tags.filter(v => v.type === "otros").sort((a, b) => a.name.localeCompare(b.name));
    }
  },
  mounted () {
    this.editor = true;
    const data = (this.$route.meta as PespEditorMeta).data;
    if (data) this.form = data;
  },
  methods: {
    onEditorLoaded (ckeditor: any) {
      const wordCountPlugin = ckeditor.plugins.get("WordCount");
      const wordCountWrapper = this.$refs.wordcount as HTMLElement;
      wordCountWrapper.appendChild(wordCountPlugin.wordCountContainer);
    },
    generatePermalink (e: Event) {
      if (!this.$route.meta.edit) {
        const target = e.target as HTMLInputElement;
        this.form.permalink = target.value.trim().toLowerCase().replace(/\s+/g, "-").normalize("NFD").replace(/[\u0300-\u036F]/g, "").replace(/[^a-zA-Z0-9-]/g, "");
      }
    },
    addBanner (e: Event) {
      const target = e.target as HTMLInputElement;
      if (!target.files?.length) return;
      const file = target.files[0]!;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.banner.file = file;
        this.form.banner.src = reader.result?.toString() || "";
        this.form.banner.type = file.type;
      };
    },
    previewPost () {
      // @ts-expect-error - no types
      if (!this.$refs.form.reportValidity()) {
        return;
      }
      this.$route.meta.data = this.form;
      this.$router.replace("/admin/dashboard/preview/");
    },
    async publishPost () {
      if (this.form.banner.src) {
        this.loading = true;
        const formData = new FormData();
        const { banner, content, ...data } = this.form;

        if (banner.file) formData.append("banner", banner.file);
        formData.append("data", JSON.stringify(data));
        formData.append("content", content);

        const post = await $fetch(this.$route.meta.edit ? `/api/posts/${this.form.permalink}` : "/api/posts", {
          method: this.$route.meta.edit ? "PUT" : "POST",
          body: formData
        }).catch(() => null);
        this.loading = false;
        if (post) {
          this.$nuxt.$toasts.add({ success: true, message: t(this.$route.meta.edit ? "guardar_success" : "publicar_success") });
          this.$router.push("/admin/dashboard/actualidad/");
        }
      }
    }
  }
};
</script>

<style>
@import "ckeditor5/ckeditor5.css";
@import "~/assets/css/ckeditor.css";
</style>
