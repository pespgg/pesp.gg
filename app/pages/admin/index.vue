<script setup lang="ts">
definePageMeta({ layout: false, middleware: "auth" });
</script>

<template>
  <section>
    <div class="container d-flex align-items-center justify-content-center vh-100 col-lg-6">
      <form class="light w-100 bg-dark p-5 rounded shadow border" @submit.prevent="login()">
        <div class="text-center">
          <LogoIcon class="mb-4" width="75" height="75" />
          <h5 class="text-center mb-4 text-uppercase">{{ t("admin") }}</h5>
        </div>
        <div class="form-floating mb-3">
          <input v-model.trim="form.user" type="text" class="form-control" :placeholder="t('usuario')" autocomplete="username" required>
          <label>{{ t("usuario") }}</label>
        </div>
        <div class="form-floating mb-3">
          <input v-model="form.pass" type="password" class="form-control" :placeholder="t('usuario')" autocomplete="current-password" required>
          <label>{{ t("pass") }}</label>
        </div>
        <div class="d-grid">
          <button class="btn btn-info btn-lg" type="submit">{{ t("login") }}</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  data () {
    return {
      form: {
        user: "",
        pass: ""
      }
    };
  },
  methods: {
    async login () {
      const login = await $fetch("/api/admin/auth", {
        method: "POST",
        body: this.form
      }).catch(() => null);

      if (!login) return;

      navigateTo("/admin/dashboard/", { external: true, replace: true });
    }
  }
};
</script>
