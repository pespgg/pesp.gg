<script setup lang="ts">
definePageMeta({ layout: false, middleware: "auth" });

useSeoMeta({
  robots: "noindex,nofollow"
});

const form = ref({
  username: "",
  password: ""
});

const login = async () => {
  await $fetch("/api/admin/auth", {
    method: "POST",
    body: form.value
  }).then(() => {
    navigateTo("/admin/dashboard", { external: true, replace: true });
  }).catch(() => {});
};
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
          <input v-model.trim="form.username" type="text" class="form-control" :placeholder="t('usuario')" autocomplete="username" required>
          <label>{{ t("usuario") }}</label>
        </div>
        <div class="form-floating mb-3">
          <input v-model="form.password" type="password" class="form-control" :placeholder="t('pass')" autocomplete="current-password" required>
          <label>{{ t("pass") }}</label>
        </div>
        <div class="d-grid">
          <button class="btn btn-info btn-lg" type="submit">{{ t("login") }}</button>
        </div>
      </form>
    </div>
  </section>
</template>
