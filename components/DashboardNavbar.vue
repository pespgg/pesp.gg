<template>
  <nav class="navbar navbar-dark bg-dark sticky-top shadow">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <Icon name="solar:hamburger-menu-linear" size="2rem" />
      </button>
      <NuxtLink class="navbar-brand d-flex" to="/">
        <Icon name="LogoIcon" size="2rem" />
      </NuxtLink>
      <div id="offcanvasNavbar" class="offcanvas offcanvas-start text-white bg-dark" tabindex="-1" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <Icon name="LogoIcon" size="2rem" />
          <h5 id="offcanvasNavbarLabel" class="offcanvas-title">{{ SITE.name.web }}</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>
        <div class="offcanvas-body text-center">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li v-for="(page, key) of pages" :key="key" class="nav-item text-uppercase" data-bs-dismiss="offcanvas">
              <NuxtLink class="nav-link text-decoration-none" aria-current="page" :to="page.to">{{ t(key) }}</NuxtLink>
            </li>
            <li class="nav-item text-uppercase" data-bs-dismiss="offcanvas">
              <div class="nav-link text-decoration-none" role="button" @click="logout()">{{ t("logout") }}</div>
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
        inicio: {
          to: "/admin/dashboard/",
          icon: ""
        },
        publicar: {
          to: "/admin/dashboard/publicar/",
          icon: ""
        },
        actualidad: {
          to: "/admin/dashboard/actualidad/",
          icon: ""
        },
        uploader: {
          to: "/admin/dashboard/uploader/",
          icon: ""
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
