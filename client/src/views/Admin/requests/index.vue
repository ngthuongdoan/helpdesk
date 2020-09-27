<template>
  <div class="ticket__container">
    <Pagination
      :page="page"
      :pages="pages"
      @previous="page--"
      @changePage="page = $event"
      @next="page++"
    ></Pagination>
    <div v-if="displayedTickets.length === 0">
      <p id="noTicket">Không có ticket nào</p>
    </div>
    <table v-else>
      <thead>
        <tr>
          <th>ID</th>
          <th>Employee ID</th>
          <th>Ticket Tilte</th>
          <th>Technician ID</th>
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
import Ticket from "@/components/Admin/Ticket.vue";
import Pagination from "@/components/Pagination.vue";
import mockTickets from "@/mocks/ticket.js";
export default {
  data() {
    return {
      page: 1,
      perPage: 11,
      pages: [],
    };
  },
  components: {
    Ticket,
    Pagination,
  },
  methods: {
    setPages() {
      if (this.tickets.length === 0) return;
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
  },
  computed: {
    displayedTickets() {
      return this.tickets.length !== 0 ? this.paginate(this.tickets) : [];
    },
  },
  watch: {
    tickets() {
      this.setPages();
    },
  },
  created() {
    // this.tickets = [];
    // this.$http
    //   .get("/ticket")
    //   .then((res) => {
    //     this.tickets = res.data;
    //     this.setPages();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    this.tickets = mockTickets;
    this.setPages();
  },
  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + "...";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/Admin/Tickets.scss";
</style>