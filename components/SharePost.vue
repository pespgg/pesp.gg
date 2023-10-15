<template>
  <div id="compartir" class="text-center mb-3">
    <h4>{{ t("lets_share") }}</h4>
    <div class="d-flex justify-content-center flex-wrap">
      <a v-for="(social, i) of socialShare" :key="i" :href="social.shareUrl" type="button" :class="`btn-${social.name}`" class="btn btn-outline-light mx-2 d-flex justify-content-center align-items-center mb-3 text-white">
        <Icon :name="social.icon" class="me-1" size="1.4rem" />{{ social.action }}
      </a>
    </div>
    <div class="col-md-6 mx-auto">
      <div class="input-group mb-3">
        <input id="permalink" ref="input" type="text" class="form-control" :value="path" readonly>
        <button class="btn btn-primary btn input-group-text" :title="t('copy_link')" @click="copyPermalink">
          <Icon name="solar:copy-bold" size="1.4rem" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: ""
    }
  },
  data () {
    return {
      path: SITE.url + this.$route.path
    };
  },
  computed: {
    socialShare() {
      return [
        {
          name: "facebook",
          icon: "bi:facebook",
          shareUrl: "https://facebook.com/sharer.php?u=" + this.path,
          action: t("share")
        },
        {
          name: "twitter",
          icon: "fa6-brands:x-twitter",
          shareUrl: `https://x.com/intent/tweet?text=%22${this.title}%22%20${this.path}`,
          action: t("post")
        },
        {
          name: "whatsapp",
          icon: "bi:whatsapp",
          shareUrl: `whatsapp://send?text=%22${this.title}%22%20${this.path}`,
          action: t("send")
        }
      ];
    }
  },
  methods: {
    async copyPermalink () {
      const copy = await copyToClipboard(this.path);
      if (copy.success) (this.$refs.input as HTMLInputElement).select();
      this.$nuxt.$toasts.add(copy);
    }
  }
};
</script>
