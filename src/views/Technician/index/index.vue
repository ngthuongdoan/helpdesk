<!--suppress ES6MissingAwait -->
<template>
  <div class="all-ticket__container">
    <Pagination
      v-if="isOnePage"
      :page="page"
      :pages="pages"
      :per-page="perPage"
      :data-length="tickets.length"
      @changePage="page = $event"
      @next="page++"
      @previous="page--"
     ></Pagination>
    <div v-if="displayedTickets.length === 0">
      <p id="noTicket">{{ $t("technician.allTicket.noTicket") }}</p>
    </div>
    <table v-else>
      <thead>
        <tr>
          <th>{{ $t("technician.allTicket.id") }}</th>
          <th>{{ $t("technician.allTicket.employee") }}</th>
          <th>{{ $t("technician.allTicket.title") }}</th>
          <th>{{ $t("technician.allTicket.status") }}</th>
          <th>{{ $t("technician.allTicket.startDate") }}</th>
          <th>{{ $t("technician.allTicket.endDate") }}</th>
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

<script>
import Ticket from "@/components/Ticket.vue";
import Pagination from "@/components/Pagination.vue";
// noinspection ES6MissingAwait
export default {
  data() {
    return {
      page: 1,
      perPage: 15,
      pages: [],
      tickets: [],
      isFetching: true,
    };
  },
  created() {
    this.getData();
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },

  methods: {
    /**
     * Hàm lấy dữ liệu từ server, cứ 2s lấy 1 lần
     */
    async getData() {
      this.$helpers.loading();
      try {
        this.interval = setInterval(async () => {
          const uid = await this.$store.getters["userModule/getUser"].data.id;
          const res = await this.$http.get("/ticket/technicians/" + uid);
          this.tickets = res.data;
          this.isFetching = false;
        }, 2000);
      } catch (err) {
        this.$helpers.showError(err);
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
    /**
     * Kiểm tra để tắt phân trang khi chỉ có 1 trang
     * @returns {Boolean} - Có phải là 1 trang hay không
     */
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