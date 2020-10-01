<template>
  <tr class="ticket__row">
    <td class="ticket__data">{{ ticket.id }}</td>
    <td class="ticket__data">{{ ticket.title }}</td>
    <td class="ticket__data">{{ technicianName }}</td>
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
  data() {
    return {
      isFetching: true,
      technicianName: "",
    };
  },
  props: {
    ticket: {
      type: Object,
      required: true,
    },
  },
  async getData() {
    try {
      this.interval = setInterval(async () => {
        const ticket = this.$props.ticket;
        const technician = await this.$http.get("/user/" + ticket.technicianId);
        this.technicianName = technician.data.fullName;
        this.isFetching = false;
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  },
  clearInterval(interval) {
    clearInterval(interval);
  },
  async created() {
    this.getData();
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
    padding: 10px;
    border: 1px solid rgb(139, 139, 139);
  }
}
</style>