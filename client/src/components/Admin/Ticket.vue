<template>
  <tr class="ticket-admin__row" @click="showTicket">
    <td class="ticket-admin__data">{{ ticket.id }}</td>
    <td class="ticket-admin__data">{{ ticket.fullName }}</td>
    <td class="ticket-admin__data">{{ ticket.title }}</td>
    <td class="ticket-admin__data">{{ ticket.technicianName }}</td>
    <td class="ticket-admin__data">
      {{ ticket.status[ticket.status.length - 1].name }}
    </td>
    <td class="ticket-admin__data">
      {{ new Date(ticket.startDate).toLocaleString() }}
    </td>
    <td class="ticket-admin__data">{{ ticket.endDate }}</td>
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
      this.$router.push("/admin/requests/" + this.ticket.id);
    },
  },
};
</script>

<style lang="scss">
.ticket-admin {
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
    padding: 2px;
    border: 1px solid rgb(139, 139, 139);
  }
}
</style>