<template>
  <nav>
    <ul class="pagination">
      <li class="page-item">
        <button
          type="button"
          class="page-link"
          v-if="page != 1"
          @click="previous"
        >
          Previous
        </button>
      </li>
      <li class="page-item">
        <button
          type="button"
          class="page-link"
          v-for="pageNumber in pages.slice(page - 1, page + 5)"
          :key="pageNumber"
          @click="changePage(pageNumber)"
        >
          {{ pageNumber }}
        </button>
      </li>
      <li class="page-item">
        <button
          type="button"
          @click="next"
          v-if="page < pages.length"
          class="page-link"
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
    pages: {
      type: Array,
      required: true,
    },
  },
  methods: {
    previous() {
      this.$emit("previous");
    },
    changePage(pageNumber) {
      this.$emit("changePage", pageNumber);
    },
    next() {
      this.$emit("next");
    },
  },
};
</script>

<style lang="scss">
.pagination {
  list-style-type: none;
  display: inline-flex;
}

button.page-link {
  display: inline-block;
  border: 0.2px solid #ccc;
  background: white;
  font-size: 14px;
  color: rgb(90, 89, 89);
  font-weight: 500;
  padding: 5px;
  transition: 0.3s all ease-in-out;
  outline: none;
  cursor: pointer;
  &:hover {
    background: rgb(158, 157, 157);
  }
}
</style>