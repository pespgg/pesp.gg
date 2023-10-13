<template>
  <div id="compartir" class="text-center mb-3">
    <h4>{{ t("lets_share") }}</h4>
    <div class="d-flex justify-content-center flex-wrap">
      <a v-for="(social, i) of socialShare" :key="i" :href="social.shareUrl" type="button" :class="`btn-${social.name}`" class="btn btn-outline-light mx-2 d-flex justify-content-center align-items-center mb-3 text-white">
        <Icon :name="social.icon" class="me-1" size="1.4rem" />{{ social.action }}
      </a>
    </div>
    <div v-if="copied" id="permalink_copy" class="alert alert-success alert-dismissible fade show">
      <button type="button" class="btn-close" @click="closeAlert" />
      <p class="m-0"><Icon name="bi:info-circle" class="me-1" size="1.4rem" />{{ t("link_copied_to_clipboard") }}.</p>
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
<script>
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
      path: SITE.url + this.$route.path,
      copied: false
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
          icon: "bi:twitter",
          shareUrl: `https://twitter.com/intent/tweet?text=%22${this.title}%22%20${this.path}`,
          action: t("tweet")
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
    copyPermalink () {
      this.$refs.input.select();
      navigator.clipboard.writeText(this.path);
      this.copied = true;
    },
    closeAlert () {
      this.copied = false;
    }
  }
};

</script>