<template>
  <nav style="position: relative;">
    <ul class="pagination">
      <li class="page-item">
        <button
            v-if="page !== 1"
            class="page-link"
            type="button"
            @click="previous"
        >
          Previous
        </button>
      </li>
      <li class="page-item">
        <button
            v-for="pageNumber in pages.slice(page - 1, page + 5)"
            :key="pageNumber"
            class="page-link"
            type="button"
            @click="changePage(pageNumber)"
        >
          {{ pageNumber }}
        </button>
      </li>
      <li class="page-item">
        <button
            v-if="page < pages.length"
            class="page-link"
            type="button"
            @click="next"
        >
          Next
        </button>
      </li>
      <li class="totalPage">
        <p>{{ (perPage * page) > dataLength ? dataLength : perPage * page }}/{{ dataLength }}</p>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    /**
     * Current page
     */
    page: {
      type: Number,
      required: true,
    },
    /**
     * Number of page
     */
    pages: {
      type: Array,
      required: true,
    },
    dataLength: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    }
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

.totalPage {
  position: absolute;
  right: 0;
  font-weight: bold;
  background: white;
  padding: 5px;
  p{
    margin: 0;
    color:#5a5959;
    font-size: 14px;
  }
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