<template>
  <div class="ticket__container">
    <Pagination
        v-if="isOnePage"
        :page="page"
        :pages="pages"
        @changePage="page = $event"
        @next="page++"
        @previous="page--"
    ></Pagination>
    <div v-if="displayedTickets.length === 0">
      <p id="noTicket">No ticket</p>
    </div>
    <table v-else class="ticket__table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Ticket Title</th>
        <th>Technician</th>
        <th>Status</th>
        <th>Start Date</th>
        <th>End Date</th>
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
import Ticket from "@/components/User/Ticket.vue";
import Pagination from "@/components/Pagination.vue";
// import mockTickets from "@/mocks/ticket.js";
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
    this.clearInterval();
  },
  methods: {
    setPages() {
      if (this.tickets.length === 0) return;
      this.pages = [];
      let numberOfPages = Math.ceil(this.tickets.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(tickets) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return tickets.slice(from, to);
    },
    async getData() {
      // noinspection ES6MissingAwait
      this.$swal({
        title: "Please wait",
        showConfirmButton: false,
        allowOutsideClick: false,
        onOpen: () => {
          this.$swal.showLoading();
        },
      });
      try {
        this.interval = setInterval(async () => {
          const uid = await this.$store.getters["userModule/getUser"].data.id;
          const res = await this.$http.get("/ticket/user/" + uid);
          this.tickets = res.data;
          this.isFetching = false;
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    },
    clearInterval() {
      clearInterval(this.interval);
    },
  },
  computed: {
    displayedTickets() {
      return this.tickets.length !== 0 ? this.paginate(this.tickets) : [];
    },
    isOnePage() {
      return this.pages.length > 1;
    },
  },
  watch: {
    tickets() {
      this.setPages();
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
@import "~@/assets/styles/User/Tickets.scss";
</style>