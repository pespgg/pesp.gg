<script setup>
definePageMeta({ layout: false, middleware: "auth" });
</script>

<template>
  <section>
    <div class="container d-flex align-items-center justify-content-center vh-100 col-lg-7">
      <form @submit.prevent="createEmail">
        <div class="text-center">
          <LogoIcon class="mb-4" width="75" height="75" />
        </div>
        <div class="input-group mb-3">
          <input v-model.trim="form.customAddress" pattern="[a-zA-Z0-9.]+" type="text" class="form-control" placeholder="Correo">
          <span class="input-group-text">@pesp.gg</span>
        </div>
        <input v-model.trim="form.destinationAddress" type="email" class="form-control mb-3" placeholder="correo@outlook.com" required>
        <div class="d-grid">
          <button class="btn btn-info btn-lg" type="submit" :disabled="loading">
            <SpinnerCircle v-if="loading" />
            <span v-else>Solicitar</span>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      form: {
        customAddress: "",
        destinationAddress: ""
      }
    };
  },
  methods: {
    async createEmail () {
      this.loading = true;
      const res = await $fetch("/api/admin/email/create", {
        method: "POST",
        body: {
          customAddress: this.form.customAddress + "@pesp.gg",
          destinationAddress: this.form.destinationAddress
        }
      }).catch(() => null);
      this.loading = false;
      if (res) {
        this.form = {
          customAddress: "",
          destinationAddress: ""
        };
      }
    }
  }
};
</script>
