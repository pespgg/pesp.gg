<template>
  <nav aria-label="Page navigation">
    <ul class="pagination m-0">
      <!-- First -->
      <li class="page-item">
        <button class="page-link d-flex align-items-center justify-content-center" aria-label="First" type="button" :disabled="isInFirstPage" @click="onClickFirstPage">
          <Icon name="solar:double-alt-arrow-left-bold-duotone" size="1.4rem" />
        </button>
      </li>
      <!-- Previous -->
      <li class="page-item">
        <button class="page-link d-flex align-items-center justify-content-center" aria-label="Previous" type="button" :disabled="isInFirstPage" @click="onClickPreviousPage">
          <Icon name="solar:alt-arrow-left-linear" size="1.4rem" />
        </button>
      </li>
      <!-- Between -->
      <li v-for="page in pages" :key="page.name" class="page-item">
        <button type="button" class="page-link d-flex align-items-center justify-content-center" :disabled="page.isDisabled" :class="{ active: isPageActive(page.name) }" @click="onClickPage(page.name)">
          <span class="fw-bold">{{ page.name }}</span>
        </button>
      </li>
      <!-- Next -->
      <li class="page-item">
        <button class="page-link d-flex align-items-center justify-content-center" aria-label="Next" type="button" :disabled="isInLastPage" @click="onClickNextPage">
          <Icon name="solar:alt-arrow-right-linear" size="1.4rem" />
        </button>
      </li>
      <!-- Last -->
      <li class="page-item">
        <button class="page-link d-flex align-items-center justify-content-center" aria-label="Next" type="button" :disabled="isInLastPage" @click="onClickLastPage">
          <Icon name="solar:double-alt-arrow-right-bold-duotone" size="1.4rem" />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 7
    },
    totalPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  emits: ["pagechanged"],
  computed: {
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1;
      }
      // When on the last page
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }
      // When inbetween
      const pivotFix = Math.floor(this.maxVisibleButtons/2);
      const currentPivot = this.currentPage - pivotFix;
      return this.currentPage > pivotFix ? this.currentPage < this.totalPages - pivotFix + 1 ? currentPivot : currentPivot - 1 : currentPivot + 1;
    },
    endPage() {
      return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
    },
    pages() {
      const range = [];
      const startFix = this.startPage > 0 ? this.startPage : 1;
      const endFix = this.startPage > 0 || this.totalPages < this.maxVisibleButtons ? this.endPage : this.endPage + 1;
      const startSecondFix = endFix - startFix + 1 < this.maxVisibleButtons ? startFix - 1 : startFix;
      for (let i = startSecondFix; i <= endFix; i++) {
        if (i > 0) {
          range.push({
            name: i,
            isDisabled: i === this.currentPage
          });
        }
      }
      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit("pagechanged", 1);
    },
    onClickPreviousPage() {
      this.$emit("pagechanged", this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit("pagechanged", page);
    },
    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit("pagechanged", this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    }
  }
};
</script>
<style>
.active {
  background-color: #4AAE9B;
  color: #ffffff;
}
</style>