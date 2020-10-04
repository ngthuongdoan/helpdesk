<template>
  <div class="logger__container">
    <Pagination
      :page="page"
      :pages="pages"
      @previous="page--"
      @changePage="page = $event"
      @next="page++"
      v-if="isOnePage"
    ></Pagination>
    <div v-if="displayedLogs.length === 0">
      <p id="noLog">No log</p>
    </div>
    <Log v-for="log in displayedLogs" :key="log.id" :log="log"></Log>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import Log from "@/components/Admin/Log.vue";
export default {
  data() {
    return {
      page: 1,
      perPage: 9,
      pages: [],
      logs: [],
    };
  },
  created() {
    this.getData();
  },
  beforeDestroy() {
    this.clearInterval(this.interval);
  },
  methods: {
    setPages() {
      if (this.logs.length === 0) return;
      this.pages = [];
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
    async getData() {
      try {
        let that = this;
        this.interval = setInterval(async () => {
          const res = await that.$http.get("/log");
          if (res.data.length !== that.logs.length) that.logs = res.data;
        }, 1000);
      } catch (err) {
        console.log(err);
      }
    },
    clearInterval(interval) {
      clearInterval(interval);
    },
  },
  computed: {
    displayedLogs() {
      return this.logs.length !== 0 ? this.paginate(this.logs) : [];
    },
    isOnePage() {
      return this.pages.length > 1;
    },
  },
  watch: {
    logs() {
      this.setPages();
    },
  },
  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + "...";
    },
  },
  components: {
    Log,
    Pagination,
  },
};
</script>

<style lang="scss">
.logger__container {
  width: 100%;
  padding: 20px;
}
#noLog {
  color: black;
  font-weight: bold;
  font-size: 20px;
}
</style>