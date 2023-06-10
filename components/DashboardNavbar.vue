<template>
  <nav class="navbar navbar-dark navbar-expand-md bg-dark sticky-top">
    <div class="container">
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <Icon name="solar:hamburger-menu-linear" size="2rem" />
      </button>
      <NuxtLink class="navbar-brand d-flex" to="/admin">
        <Icon name="LogoIcon" size="2rem" />
      </NuxtLink>
      <div id="offcanvasNavbar" class="offcanvas offcanvas-start text-white bg-dark" tabindex="-1" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <Icon name="LogoIcon" size="2rem" />
          <h5 id="offcanvasNavbarLabel" class="offcanvas-title">{{ SITE.name.web }}</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>
        <div class="offcanvas-body text-center">
          <ul class="admin-nav navbar-nav justify-content-center gap-md-5 flex-grow-1">
            <li v-for="(page, key) of pages" :key="key" class="nav-item text-uppercase" data-bs-dismiss="offcanvas">
              <NuxtLink class="d-flex align-items-center gap-2 nav-link text-decoration-none px-2" aria-current="page" :to="page.to">
                <Icon class="text-light" :name="page.icon" size="1.5rem" />
                <span>{{ t(key) }}</span>
              </NuxtLink>
            </li>
            <li class="nav-item text-uppercase" data-bs-dismiss="offcanvas">
              <div class="d-flex align-items-center gap-2 px-2 nav-link text-decoration-none" role="button" @click="logout()">
                <Icon class="text-light" name="solar:power-linear" size="1.5rem" />
                <div>{{ t("logout") }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      pages: {
        dashboard: {
          to: "/admin/dashboard/",
          icon: "solar:round-graph-linear"
        },
        publicar: {
          to: "/admin/dashboard/publicar/",
          icon: "solar:pen-new-square-linear"
        },
        actualidad: {
          to: "/admin/dashboard/actualidad/",
          icon: "solar:inbox-archive-outline"
        }
      }
    };
  },
  methods: {
    async logout () {
      const { loggedOut } = await useUserSession().clear();
      if (loggedOut) {
        this.$router.replace("/admin/");
      }
    }
  }
};
</script>

<style>
.admin-nav .nav-link {
  border-radius: var(--bs-border-radius);
}

.admin-nav .nav-link:hover {
  background-color: var(--body-track);
}

.admin-nav .router-link-exact-active {
  background-color: var(--bs-primary)!important;
  color: var(--bs-heading-color);
}
</style>
