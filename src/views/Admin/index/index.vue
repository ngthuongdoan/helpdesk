<template>
  <div class="logger__container custom-scrollbar">
    <div v-if="logs.length === 0">
      <p id="noLog">No log</p>
    </div>
    <Log v-for="log in logs" :key="log.id" :log="log"></Log>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import Log from "@/components/Admin/Log.vue";
export default {
  data() {
    return {
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
  height: 100%;
  overflow: auto;
}
#noLog {
  color: black;
  font-weight: bold;
  font-size: 20px;
}
</style>