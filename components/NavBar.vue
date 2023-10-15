<template>
  <nav class="navbar navbar-dark navbar-expand-md bg-dark sticky-top shadow">
    <div class="container">
      <NuxtLink class="navbar-brand d-flex" :to="SCHEMA_pages.inicio.to" :aria-label="t('inicio')">
        <Icon name="LogoIcon" size="2rem" />
      </NuxtLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon" />
      </button>
      <div id="offcanvasNavbar" class="offcanvas offcanvas-end text-white bg-dark" tabindex="-1" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <Icon name="LogoIcon" size="2rem" />
          <h5 id="offcanvasNavbarLabel" class="offcanvas-title">{{ SITE.name.web }}</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>
        <div class="offcanvas-body text-center">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li v-for="(page, key) in SCHEMA_pages" :key="key" class="nav-item text-uppercase" data-bs-dismiss="offcanvas">
              <NuxtLink class="nav-link text-decoration-none" aria-current="page" :to="page.to">{{ t(key) }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
