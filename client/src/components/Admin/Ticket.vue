<template>
  <tr class="ticket-admin__row">
    <td class="ticket-admin__data">{{ ticket.id }}</td>
    <td class="ticket-admin__data">{{ ticket.employeeID }}</td>
    <td class="ticket-admin__data">{{ ticket.title }}</td>
    <td class="ticket-admin__data">{{ ticket.technicianID }}</td>
    <td class="ticket-admin__data">{{ ticket.status }}</td>
    <td class="ticket-admin__data">{{ ticket.startDate }}</td>
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