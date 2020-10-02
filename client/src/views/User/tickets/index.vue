<template>
  <div class="ticket__container">
    <Pagination
      :page="page"
      :pages="pages"
      @previous="page--"
      @changePage="page = $event"
      @next="page++"
      v-if="isOnePage"
    ></Pagination>
    <div v-if="displayedTickets.length === 0">
      <p id="noTicket">Không có ticket nào</p>
    </div>
    <table class="ticket__table" v-else>
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
    };
  },
  components: {
    Ticket,
    Pagination,
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
          this.$swal.close();
        }, 500);
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
  },
  created() {
    this.getData();
  },
  beforeDestroy() {
    this.clearInterval();
  },
  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + "...";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/User/Tickets.scss";
</style>