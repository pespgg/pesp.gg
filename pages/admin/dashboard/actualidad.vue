<script setup>
definePageMeta({ layout: "dashboard", middleware: "auth" });

const { data: posts } = await useFetch("/api/posts");
</script>

<template>
  <section>
    <div class="container-fluid">
      <h1>Actualidad</h1>
      <div class="table-responsive">
        <table class="table table-dark rounded overflow-hidden table-striped table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">{{ t("titulo") }}</th>
              <th scope="col">{{ t("fecha") }}</th>
              <th scope="col">{{ t("visibilidad") }}</th>
              <th scope="col">{{ t("acciones") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(post, i) of posts" :key="i">
              <td>{{ post.titulo }}</td>
              <td>{{ formatDate(post.fecha) }}</td>
              <td>
                <span v-if="post.visible" class="bg-info text-dark rounded-pill p-2 fw-bold">{{ t("publico") }}</span>
                <span v-else class="bg-warning text-dark rounded-pill p-2 fw-bold">{{ t("oculto") }}</span>
              </td>
              <td>
                <div class="d-flex gap-2">
                  <button class="btn btn-primary" @click="editPost(post.permalink)">
                    <Icon name="solar:pen-linear" size="1.5rem" />
                  </button>
                  <button class="btn btn-danger" @click="deletePost(post.permalink)">
                    <Icon name="solar:trash-bin-minimalistic-linear" size="1.5rem" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
