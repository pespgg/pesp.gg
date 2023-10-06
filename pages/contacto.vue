<script setup lang="ts">
useSeoMeta({
  title: `${t("contacto")} | ${SITE.name.web}`,
  description: t("contacto_description"),
  keywords: t("contacto_keywords"),
  ogUrl: `${SITE.url}/actualidad/`,
  ogTitle: `${t("contacto")} | ${SITE.name.web}`,
  ogDescription: t("contacto_description"),
  twitterTitle: `${t("contacto")} | ${SITE.name.web}`,
  twitterDescription: t("contacto_description")
});

useHead({
  link: [
    { rel: "canonical", href: `${SITE.url}/contacto/` }
  ]
});
</script>

<template>
  <main>
    <!-- Banner -->
    <BannerPage banner="contacto.jpg" :text="t('contacto')" />
    <section id="contacto">
      <div class="container">
        <h5 class="text-center py-5 m-0">{{ t("contacto_info") }}</h5>
        <div class="col-xl-8 mx-auto pb-5">
          <form class="bg-light py-4 px-3 p-sm-5 rounded" data-static-form-name="contacto" @submit.prevent="sendMail('contacto')">
            <div class="text-center text-dark mb-3">
              <h2>
                <strong>{{ t("contacto_title") }}</strong>
              </h2>
              <p class="m-0">{{ t("contacto_desc") }}</p>
            </div>
            <div class="form-floating mb-3">
              <input v-model="contacto.name" type="text" class="form-control" :placeholder="t('nombre')" required>
              <label for="name">{{ t("nombre") }}</label>
            </div>
            <div class="form-floating mb-3">
              <input v-model="contacto.email" type="email" class="form-control" :placeholder="t('correo')" required>
              <label for="name">{{ t("correo") }}</label>
            </div>
            <div class="form-floating mb-3">
              <input v-model="contacto.subject" type="text" class="form-control" :placeholder="t('asunto')" required>
              <label for="name">{{ t("asunto") }}</label>
            </div>
            <div class="form-floating">
              <textarea v-model="contacto.message" class="form-control" :placeholder="t('mensaje')" style="height: 200px" required />
              <label for="floatingTextarea2">{{ t("mensaje") }}</label>
            </div>
            <div class="my-3">
              <NuxtTurnstile ref="contacto" v-model="contacto.token" class="turnstile" :options="{ theme: 'dark' }" />
            </div>
            <div class="d-grid">
              <button class="btn btn-lg btn-success" type="submit" :disabled="submit">{{ t("enviar") }}</button>
            </div>
          </form>
        </div>
        <div class="py-5">
          <div class="unete bg-light rounded position-relative px-5" role="button" @click="more = !more">
            <Transition name="fade">
              <img v-if="sticker" class="sticker position-absolute bottom-0" width="250" height="250" :src="`${SITE.dirs.stickers}/${sticker}.png`">
            </Transition>
            <div class="py-3 mx-0">
              <div class="col-12 col-md-5 text-center text-dark ms-auto scale-hover" style="margin-right: 6.5rem;">
                <div id="unete-pesp">
                  <h3 class="m-0"><strong>¿Quieres unirte <br>a nuestro equipo?</strong></h3>
                  <Icon name="solar:alt-arrow-down-bold" size="2rem" />
                </div>
              </div>
            </div>
          </div>
          <Transition name="tab">
            <div v-if="more" class="col-xl-8 mx-auto mt-3 text-dark">
              <form class="bg-light py-4 px-3 p-sm-5 rounded" data-static-form-name="unirse" @submit.prevent="sendMail('unirse')">
                <div class="text-center mb-3">
                  <h2>
                    <strong>{{ t("unirse_title") }}</strong>
                  </h2>
                  <p class="m-0">{{ t("unirse_desc") }}</p>
                </div>
                <div class="form-floating mb-3">
                  <input v-model="unirse.name" type="text" class="form-control" :placeholder="t('nombre_full')" required>
                  <label for="name">{{ t("nombre_full") }}</label>
                </div>
                <div class="form-floating mb-3">
                  <input v-model="unirse.email" type="email" class="form-control" :placeholder="t('correo')" required>
                  <label for="name">{{ t("correo") }}</label>
                </div>
                <h5><strong>{{ t("porque_pesp") }}</strong></h5>
                <div class="form-floating mb-3">
                  <textarea v-model="unirse.message" class="form-control" :placeholder="t('cuentanos')" style="height: 200px" required />
                  <label for="floatingTextarea2">{{ t("cuentanos") }}</label>
                </div>
                <div class="row my-0 my-md-3">
                  <div class="col-md-6">
                    <h5><strong>{{ t("mayor") }}</strong></h5>
                    <div class="d-flex">
                      <div class="form-check">
                        <input v-model="unirse.legal" :value="true" class="form-check-input" type="radio" required>
                        <label class="form-check-label">{{ t("si") }}</label>
                      </div>
                      <div class="form-check ms-5">
                        <input v-model="unirse.legal" :value="false" class="form-check-input" type="radio">
                        <label class="form-check-label">{{ t("no") }}</label>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="text-center my-3 my-md-0">
                      <NuxtTurnstile ref="unirse" v-model="unirse.token" class="turnstile" :options="{ theme: 'dark' }" />
                    </div>
                  </div>
                </div>
                <div class="d-grid">
                  <button class="btn btn-lg btn-success" type="submit" :disabled="submit">{{ t("enviar") }}</button>
                </div>
              </form>
            </div>
          </Transition>
        </div>
      </div>
    </section>
    <ResultDialog :message="result.message" :success="result.success" :loading="submit" />
  </main>
</template>

<script lang="ts">
export default {
  data () {
    return {
      submit: false,
      more: false,
      result: {
        message: "",
        success: true
      },
      contacto: {
        token: "",
        name: "",
        email: "",
        subject: "",
        message: ""
      },
      unirse: {
        token: "",
        name: "",
        email: "",
        message: "",
        legal: null
      },
      sticker: "",
      stickers: [
        "lol-1",
        "lol-2",
        "fortnite-1",
        "fortnite-2",
        "valorant-1",
        "brawlstars-1",
        "brawlstars-2"
      ]
    };
  },
  mounted () {
    this.sticker = getRandomFromArray(this.stickers);
  },
  methods: {
    resetForms () {
      this.contacto = {
        token: "",
        name: "",
        email: "",
        subject: "",
        message: ""
      };
      this.unirse = {
        token: "",
        name: "",
        email: "",
        message: "",
        legal: null
      };
    },
    async sendMail (name: string) {
      this.submit = true;
      this.$nuxt.$bootstrap.showModal("#dialog");
      this.result.success = await $fetch("/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: {
          template: name,
          lang: t("lang"),
          form: this[name as "contacto" | "unirse"]
        }
      }).catch(() => false);
      if (this.result.success) {
        this.result.message = t("correo_enviado");
        this.resetForms();
      }
      else {
        this.result.message = t("correo_error");
      }
      // @ts-ignore
      this.$refs[name].reset();
      this.submit = false;
    }
  }
};
</script>
