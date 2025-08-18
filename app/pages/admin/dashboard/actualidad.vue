<script setup lang="ts">
definePageMeta({ layout: "dashboard", middleware: "auth" });

const { data: posts } = await useFetch("/api/posts", {
  query: {
    hidden: true
  }
});

const editPost = (post: PespPost) => {
  const { titulo, permalink, tag, fecha, visible, updatedAt, createdAt } = post;
  const data = {
    titulo,
    content: "",
    banner: {
      src: "",
      type: ""
    },
    tag,
    fecha: new Date(fecha).toISOString().split("T")[0],
    updatedAt,
    createdAt,
    permalink,
    visible: Boolean(visible)
  };
  const { meta } = useRoute();
  meta.data = data;
  meta.edit = true;
  navigateTo({ name: "admin-dashboard-publicar" });
};

const deletePost = async (permalink: string) => {
  if (!posts.value || !confirm(t("confirm_delete_post"))) return;
  await useFetch(`/api/posts/${permalink}`, { method: "DELETE" });
  posts.value = posts.value?.filter(post => post.permalink !== permalink) || null;
};

onBeforeRouteLeave((to, from, next) => {
  if (to.name === "admin-dashboard-publicar" && from.meta.data) {
    to.meta.data = from.meta.data;
    to.meta.edit = from.meta.edit;
  }
  next();
});
</script>

<template>
  <section>
    <div class="container-fluid py-5">
      <div class="text-center mb-2">
        <h1>{{ t("actualidad") }}</h1>
        <p>{{ t("actualidad_admin_description") }}</p>
      </div>
      <div class="table-responsive">
        <table class="table table-dark rounded shadow overflow-hidden table-striped table-hover align-middle">
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
              <td :title="formatDate(post.fecha, { type: 'iso' })">{{ formatDate(post.fecha) }}</td>
              <td>
                <span v-if="post.visible" class="bg-info text-dark rounded-pill p-2 fw-bold">{{ t("publico") }}</span>
                <span v-else class="bg-warning text-dark rounded-pill p-2 fw-bold">{{ t("oculto") }}</span>
              </td>
              <td>
                <div class="d-flex gap-2">
                  <button class="btn btn-primary" @click="editPost(post)">
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
