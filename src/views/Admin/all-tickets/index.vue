<template>
  <div class="all-ticket__container custom-scrollbar">
    <Pagination
        v-if="isOnePage"
        :data-length="tickets.length"
        :page="page"
        :pages="pages"
        :per-page="perPage"
        @changePage="page = $event"
        @next="page++"
        @previous="page--"
    ></Pagination>
    <div v-if="displayedTickets.length === 0">
      <p id="noTicket">{{ $t("admin.allTicket.noTicket") }}</p>
    </div>
    <table v-else>
      <thead>
      <tr>
        <!--          <th>ID</th>-->
        <!--          <th @click="sorted = 'fullName'">Employee</th>-->
        <!--          <th>Ticket Title</th>-->
        <!--          <th @click="sorted = 'technicianName'">Technician</th>-->
        <!--          <th @click="sorted = 'status'">Status</th>-->
        <!--          <th @click="sorted = 'startDate'">Start Date</th>-->
        <!--          <th @click="sorted = 'endDate'">End Date</th>-->
        <th>{{ $t("admin.allTicket.id") }}</th>
        <th>{{ $t("admin.allTicket.employee") }}</th>
        <th>{{ $t("admin.allTicket.title") }}</th>
        <th>{{ $t("admin.allTicket.technician") }}</th>
        <th>{{ $t("admin.allTicket.status") }}</th>
        <th>{{ $t("admin.allTicket.startDate") }}</th>
        <th>{{ $t("admin.allTicket.endDate") }}</th>
      </tr>
      </thead>
      <Ticket
          v-for="ticket in displayedTickets"
          :key="ticket.id"
          :ticket="ticket"
      ></Ticket>
    </table>
  </div>
</template>

<!--suppress ES6MissingAwait -->
<script>
import Ticket from "@/components/Ticket.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  data() {
    return {
      page: 1,
      perPage: 15,
      pages: [],
      tickets: [],
      isFetching: true,
      sorted: "",
      url: "/ticket",
    };
  },
  created() {
    this.getData();
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    async getData() {
      this.$helpers.loading();
      try {
        this.interval = setInterval(async () => {
          const res = await this.$http.get(this.url);
          this.tickets = res.data;
          this.isFetching = false;
        }, 2000);
      } catch (err) {
        this.$helpers.showError(err)
      }
    },
  },
  computed: {
    /**
     * Số yêu cầu sẽ hiện trong 1 trang
     * @returns {Array} - Số dữ liệu sẽ hiện thị
     */
    displayedTickets() {
      return this.tickets.length !== 0
          ? this.$helpers.paginate(this.tickets, this.page, this.perPage)
          : [];
    },
    isOnePage() {
      return this.pages.length > 1;
    },
  },
  watch: {
    tickets() {
      this.pages = this.$helpers.setPages(this.tickets.length, this.perPage);
    },
    isFetching() {
      this.$swal.close();
    },
    sorted() {
      if (this.sorted) {
        this.url = "/ticket/sort/desc/" + this.sorted;
      }
    },
  },
  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + "...";
    },
  },
  components: {
    Ticket,
    Pagination,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/Admin/AllTickets.scss";
</style>