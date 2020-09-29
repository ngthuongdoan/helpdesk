<template>
  <tr class="ticket__row">
    <td class="ticket__data">{{ ticket.id }}</td>
    <td class="ticket__data">{{ ticket.title }}</td>
    <td class="ticket__data">{{ ticket.technicianID }}</td>
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