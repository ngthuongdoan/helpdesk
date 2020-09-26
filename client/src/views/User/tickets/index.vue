<template>
  <div class="ticket__container">
    <nav>
      <ul class="pagination">
        <li class="page-item">
          <button
            type="button"
            class="page-link"
            v-if="page != 1"
            @click="page--"
          >
            Previous
          </button>
        </li>
        <li class="page-item">
          <button
            type="button"
            class="page-link"
            v-for="pageNumber in pages.slice(page - 1, page + 5)"
            :key="pageNumber"
            @click="page = pageNumber"
          >
            {{ pageNumber }}
          </button>
        </li>
        <li class="page-item">
          <button
            type="button"
            @click="page++"
            v-if="page < pages.length"
            class="page-link"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
    <div v-if="displayedTickets.length === 0">Không có ticket nào</div>
    <table class="table" v-else>
      <thead>
        <tr>
          <th>STT</th>
          <th>Ticket name</th>
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
import Ticket from "@/components/User/Ticket.vue";

export default {
  data() {
    return {
      page: 1,
      perPage: 10,
      pages: [],
    };
  },
  components: {
    Ticket,
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
    this.$http
      .get("/ticket")
      .then((res) => {
        this.tickets = res.data;
        this.setPages();
      })
      .catch((err) => {
        console.log(err);
      });
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