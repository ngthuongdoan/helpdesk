<template>
  <div class="ticket__container">
    <!-- Phân trang -->
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
    <!--  -->
    <!-- Hiện khi không có yêu cầu nào -->
    <div v-if="displayedTickets.length === 0">
      <p id="noTicket">{{ $t("user.allTicket.noTicket") }}</p>
    </div>
    <!--  -->
    <!-- Khi đã có yêu cầu -->
    <table v-else class="ticket__table">
      <thead>
        <tr>
          <th>{{ $t("user.allTicket.id") }}</th>
          <th>{{ $t("user.allTicket.title") }}</th>
          <th>{{ $t("user.allTicket.technician") }}</th>
          <th>{{ $t("user.allTicket.status") }}</th>
          <th>{{ $t("user.allTicket.startDate") }}</th>
          <th>{{ $t("user.allTicket.endDate") }}</th>
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

export default {
  data() {
    return {
      page: 1,
      perPage: 12,
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
      // noinspection ES6MissingAwait
      this.$helpers.loading(this.$i18n.locale);
      try {
        this.interval = setInterval(async () => {
          const uid = await this.$store.getters["userModule/getUser"].data.id;
          const res = await this.$http.get("/ticket/user/" + uid);
          this.tickets = res.data;
          this.isFetching = false;
        }, 2000);
      } catch (error) {
        this.$helpers.showError(error, this.$i18n.locale);
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
      if (!this.isFetching) this.$swal.close();
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
@import "~@/assets/styles/User/AllTickets.scss";
</style>