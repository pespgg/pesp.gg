<template>
  <nav aria-label="Page navigation">
    <ul class="pagination m-0">
      <!-- First -->
      <li v-if="currentPage > 1" class="page-item">
        <a href="?p=1" class="page-link d-flex align-items-center justify-content-center" aria-label="First" type="button" :disabled="isInFirstPage" @click="onClickFirstPage">
          <Icon name="solar:double-alt-arrow-left-bold-duotone" size="1.4rem" />
        </a>
      </li>
      <!-- Previous -->
      <li v-if="totalPages > 2 && currentPage > 1" class="page-item">
        <a :href="`?p=${currentPage - 1}`" class="page-link d-flex align-items-center justify-content-center" aria-label="Previous" type="button" :disabled="isInFirstPage" @click="onClickPreviousPage">
          <Icon name="solar:alt-arrow-left-linear" size="1.4rem" />
        </a>
      </li>
      <!-- Between -->
      <li v-for="page in pages" :key="page.name" class="page-item">
        <a :href="`?p=${page.name}`" type="button" class="page-link d-flex align-items-center justify-content-center" :disabled="page.isDisabled" :class="{ active: isPageActive(page.name) }" @click="onClickPage($event, page.name)">
          <span class="fw-bold">{{ page.name }}</span>
        </a>
      </li>
      <!-- Next -->
      <li v-if="totalPages > 2 && currentPage < totalPages" class="page-item">
        <a :href="`?p=${currentPage + 1}`" class="page-link d-flex align-items-center justify-content-center" aria-label="Next" type="button" :disabled="isInLastPage" @click="onClickNextPage">
          <Icon name="solar:alt-arrow-right-linear" size="1.4rem" />
        </a>
      </li>
      <!-- Last -->
      <li v-if="currentPage < totalPages" class="page-item">
        <a :href="`?p=${totalPages}`" class="page-link d-flex align-items-center justify-content-center" aria-label="Next" type="button" :disabled="isInLastPage" @click="onClickLastPage">
          <Icon name="solar:double-alt-arrow-right-bold-duotone" size="1.4rem" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 5
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
    startPage () {
      // When on the first page
      if (this.currentPage === 1) {
        return 1;
      }
      // When on the last page
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }
      // When inbetween
      const pivotFix = Math.floor(this.maxVisibleButtons / 2);
      const currentPivot = this.currentPage - pivotFix;
      return this.currentPage > pivotFix ? this.currentPage < this.totalPages - pivotFix + 1 ? currentPivot : currentPivot - 1 : currentPivot + 1;
    },
    endPage () {
      return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
    },
    pages () {
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
    isInFirstPage () {
      return this.currentPage === 1;
    },
    isInLastPage () {
      return this.currentPage === this.totalPages;
    }
  },
  methods: {
    onClickFirstPage (e: Event) {
      e.preventDefault();
      this.$emit("pagechanged", 1);
    },
    onClickPreviousPage (e: Event) {
      e.preventDefault();
      this.$emit("pagechanged", this.currentPage - 1);
    },
    onClickPage (e: Event, page: number) {
      e.preventDefault();
      this.$emit("pagechanged", page);
    },
    onClickNextPage (e: Event) {
      e.preventDefault();
      this.$emit("pagechanged", this.currentPage + 1);
    },
    onClickLastPage (e: Event) {
      e.preventDefault();
      this.$emit("pagechanged", this.totalPages);
    },
    isPageActive (page: number) {
      return this.currentPage === page;
    }
  }
};
</script>
