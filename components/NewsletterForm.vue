<template>
  <div class="mt-4 p-5 bg-light text-dark rounded text-center">
    <strong class="h2 fw-bold">{{ t("boletin_title") }}</strong>
    <p>{{ t("boletin_description") }}</p>
    <form class="col-lg-8 mx-auto">
      <div class="accordion">
        <div class="accordion-item border-0">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panels-collapse0" aria-expanded="true" aria-controls="panels-collapse0">
            <h5 class="accordion-header">{{ t("Selecciona tus intereses") }}</h5>
          </button>
          <div id="panels-collapse0" class="accordion-collapse collapse bg-light" aria-labelledby="0">
            <div class="accordion-body form-group">
              <label v-for="(interest, i) of SCHEMA_categorias" :key="i" :ref="`interest${i}`" class="btn btn-default border intereses text-dark m-1" @click="interestCheck(i)">
                <span>{{ interest.name }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="input-group my-3">
        <input id="email" type="email" class="form-control" :placeholder="t('correo')" name="email" required>
        <button class="btn btn-success input-group-text" type="submit">Suscribirse</button>
      </div>
      <div class="form-check text-start">
        <input id="terminos" type="checkbox" class="form-check-input" value="acepto" name="terminos" required="">
        <label class="form-check-label text-justify">
          <!--eslint-disable-next-line vue/no-v-html-->
          <small v-html="t('boletin_tos')" />
        </label>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  methods: {
    interestCheck (index) {
      const interest = this.$refs[`interest${index}`][0];
      if (interest.classList.contains("active")) {
        interest.classList.remove("active");
      }
      else {
        interest.classList.add("active");
      }
    }
  }
};
</script>