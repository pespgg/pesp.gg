<template>
  <main>
    <!-- Banner -->
    <BannerPage banner="contacto.jpg" :text="t('contacto')" />
    <section id="contacto">
      <div class="container">
        <h5 class="text-center py-5 m-0">{{ t("contacto_info") }}</h5>
        <form class="col-lg-8 mx-auto bg-light px-3 py-4 p-sm-5 rounded" @submit.prevent="sendEmailContact()">
          <div class="text-center text-dark mb-4">
            <h2>
              <strong>{{ t("form1_title") }}</strong>
            </h2>
            <p class="m-0">{{ t("contacto_info") }}</p>
          </div>
          <div class="form-floating mb-3">
            <input v-model="contact.name" type="text" class="form-control" :placeholder="t('nombre')" required>
            <label for="name">{{ t("nombre") }}</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="contact.email" type="email" class="form-control" :placeholder="t('correo')" required>
            <label for="name">{{ t("correo") }}</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="contact.subject" type="text" class="form-control" :placeholder="t('asunto')" required>
            <label for="name">{{ t("asunto") }}</label>
          </div>
          <div class="form-floating">
            <textarea class="form-control" :placeholder="t('mensaje')" style="height: 200px" required />
            <label for="floatingTextarea2">{{ t("mensaje") }}</label>
          </div>
          <div class="text-center my-3">
       
          </div>
          <div class="d-grid">
            <button class="btn btn-lg btn-success" type="submit">{{ t("enviar") }}</button>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data () {
    return {
      token: "",
      contact: {
        name: "",
        email: "",
        subject: "",
        message: ""
      }
    };
  },
  methods: {
    getTemplate (name) {
      return $fetch("/api/template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: this.token,
          template: name
        })
      });
    },
    async sendEmailContact () {
      const { success, html } = await this.getTemplate("contacto");
      console.info(success, html);
      /*
      this.$nuxt.$mail.send({
        to: form.email,
        subject: form.subject,
        html
      });
      */
    }
  }
};
</script>
