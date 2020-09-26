<template>
  <tr>
    <td class="ticket__data">{{ ticket.id }}</td>
    <td class="ticket__data">{{ ticket.title }}</td>
    <td class="ticket__data">{{ ticket.technicianID }}</td>
    <td class="ticket__data">{{ ticket.status }}</td>
    <td class="ticket__data">{{ ticket.startDate }}</td>
    <td class="ticket__data">{{ ticket.endDate }}</td>
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
</style>