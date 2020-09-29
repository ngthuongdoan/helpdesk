<template>
  <div class="technician__container">
    <Pagination
      :page="page"
      :pages="pages"
      @previous="page--"
      @changePage="page = $event"
      @next="page++"
      v-if="isOnePage"
    ></Pagination>
    <div v-if="displayedTechnicians.length === 0">
      <p id="noTechnician">Không có technician nào</p>
    </div>
    <table v-else>
      <thead>
        <tr>
          <th>ID</th>
          <th>Full name</th>
          <th>Username</th>
          <th>Status</th>
        </tr>
      </thead>
      <Technician
        v-for="technician in displayedTechnicians"
        :key="technician.id"
        :technician="technician"
      ></Technician>
    </table>
  </div>
</template>

<script>
import Technician from "@/components/Admin/Technician.vue";
import Pagination from "@/components/Pagination.vue";
import mockTechnicians from "@/mocks/technician.js";
export default {
  data() {
    return {
      page: 1,
      perPage: 11,
      pages: [],
    };
  },
  components: {
    Technician,
    Pagination,
  },
  methods: {
    setPages() {
      if (this.technicians.length === 0) return;
      let numberOfPages = Math.ceil(this.technicians.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(technicians) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return technicians.slice(from, to);
    },
  },
  computed: {
    displayedTechnicians() {
      return this.technicians.length !== 0
        ? this.paginate(this.technicians)
        : [];
    },
    isOnePage() {
      return this.pages.length > 1;
    },
  },
  watch: {
    technicians() {
      this.setPages();
    },
  },
  created() {
    // this.technicians = [];
    this.$http
      .get("/user/role/technician")
      .then((res) => {
        this.technicians = res.data;
        this.setPages();
      })
      .catch((err) => {
        console.log(err);
      });
    // this.technicians = mockTechnicians;
  },
  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + "...";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/Admin/Technicians.scss";
</style>