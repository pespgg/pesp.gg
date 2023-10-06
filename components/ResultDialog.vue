<template>
  <div id="dialog" class="modal fade static-backdrop" tabindex="-1" aria-labelledby="dialogLabel" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <button v-if="!loading" type="button" class="btn-close position-absolute end-0 pe-4" data-bs-dismiss="modal" aria-label="Close" />
          <div class="text-center p-2">
            <Transition name="fade" mode="out-in">
              <div v-if="!loading">
                <div class="d-flex justify-content-center">
                  <div class="rounded-circle p-3" :class="success ? 'bg-success' : 'bg-danger'">
                    <Icon class="text-white" :name="success ? 'solar:plain-2-line-duotone' : 'solar:sad-square-broken'" size="3rem" />
                  </div>
                </div>
                <div class="mt-3" style="white-space: pre-wrap;">
                  <h5>{{ message }}</h5>
                </div>
              </div>
              <div v-else class="spinner-border text-white" role="status" style="width: 3rem; height: 3rem;">
                <span class="visually-hidden">Loading...</span>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ResultDialog",
  props: {
    message: {
      type: String,
      required: true
    },
    success: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      required: true,
      default: true
    }
  }
};
</script>
