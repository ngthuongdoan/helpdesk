<template>
  <tr class="ticket__row" v-if="ticket" @click="showTicket">
    <td class="ticket__data">{{ ticket.id }}</td>
    <td class="ticket__data" v-if="!isUser">{{ ticket.fullName }}</td>
    <td class="ticket__data">{{ ticket.title }}</td>
    <td class="ticket__data" v-if="!isTechincian">
      {{ ticket.technicianName }}
    </td>
    <td class="ticket__data">
      {{ ticket.status[ticket.status.length - 1].name }}
    </td>
    <td class="ticket__data">
      {{ new Date(ticket.startDate).toLocaleString() }}
    </td>
    <td class="ticket__data">
      {{ ticket.endDate ? new Date(ticket.endDate).toLocaleString() : null }}
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    ticket: {
      type: Object,
      required: true,
    },
  },
  methods: {
    showTicket() {
      let url = "";
      switch (this.role) {
        case "user":
          url = "/tickets/" + this.ticket.id;
          break;
        case "admin":
          url = "/admin/tickets/" + this.ticket.id;
          break;
        case "technician":
          url = "/technician/" + this.ticket.id;
          break;
      }
      this.$router.push(url);
    },
  },
  computed: {
    role() {
      return this.$store.getters["userModule/getUser"].data.role;
    },
    isTechincian() {
      return this.role === "technician";
    },
    isUser() {
      return this.role === "user";
    },
  },
};
</script>

<style lang="scss">
.ticket {
  &__table {
    background: white;
    width: 100%;
    border-collapse: collapse;

    th {
      background: #ccc;
      border: 1px solid rgb(139, 139, 139);
      padding: 8px;
    }
  }

  &__row {
    transition: 0.3s all ease-in-out;
    cursor: pointer;
    &:nth-child(even) {
      background: #efefef;
    }

    &:hover {
      background: #d1d1d1;
    }
  }
  &__data {
    padding: 5px;
    border: 1px solid rgb(139, 139, 139);
    font-size: 16px;
  }
}
</style>