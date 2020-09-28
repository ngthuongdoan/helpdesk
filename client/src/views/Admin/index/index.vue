<template>
  <div class="logger__container">
    <Pagination
      :page="page"
      :pages="pages"
      @previous="page--"
      @changePage="page = $event"
      @next="page++"
    ></Pagination>
    <div v-if="displayedLogs.length === 0">
      <p id="noTechnician">Không có technician nào</p>
    </div>
    <Log v-for="log in displayedLogs" :key="log.id" :log="log"></Log>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import Log from "@/components/Admin/Log.vue";
import mockLogs from "@/mocks/log.js";
export default {
  data() {
    return {
      page: 1,
      perPage: 9,
      pages: [],
    };
  },
  components: {
    Log,
    Pagination,
  },
  methods: {
    setPages() {
      if (this.logs.length === 0) return;
      let numberOfPages = Math.ceil(this.logs.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(logs) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return logs.slice(from, to);
    },
  },
  computed: {
    displayedLogs() {
      return this.logs.length !== 0 ? this.paginate(this.logs) : [];
    },
  },
  watch: {
    logs() {
      this.setPages();
    },
  },
  created() {
    this.logs = mockLogs;
    this.setPages();
  },
  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + "...";
    },
  },
};
</script>

<style lang="scss">
.logger__container {
  width: 100%;
  padding: 20px;
}
</style>