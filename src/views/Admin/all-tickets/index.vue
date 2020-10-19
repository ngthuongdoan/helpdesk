<template>
  <div class="all-ticket__container custom-scrollbar">
    <Pagination
      v-if="isOnePage"
      :page="page"
      :pages="pages"
      :per-page="perPage"
      :ticket-length="tickets.length"
      @changePage="page = $event"
      @next="page++"
      @previous="page--"
    ></Pagination>
    <div v-if="displayedTickets.length === 0">
      <p id="noTicket">No ticket</p>
    </div>
    <table v-else>
      <thead>
        <tr>
          <th>ID</th>
          <th @click="sorted = 'fullName'">Employee</th>
          <th>Ticket Title</th>
          <th @click="sorted = 'technicianName'">Technician</th>
          <th @click="sorted = 'status'">Status</th>
          <th @click="sorted = 'startDate'">Start Date</th>
          <th @click="sorted = 'endDate'">End Date</th>
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
    this.clearInterval(this.interval);
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
          const res = await this.$http.get(this.url);
          this.tickets = res.data;
          this.isFetching = false;
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    },
    clearInterval(interval) {
      clearInterval(interval);
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
      this.$swal.close();
    },
    sorted() {
      console.log(this.sorted);
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