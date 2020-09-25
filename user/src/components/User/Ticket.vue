<template>
  <tr>
    <td class="table__data">{{ ticket.id }}</td>
    <td class="table__data">{{ ticket.title}}</td>
    <td class="table__data">{{ ticket.technicianID}}</td>
    <td class="table__data">{{ ticket.status}}</td>
    <td class="table__data">{{ ticket.startDate}}</td>
    <td class="table__data">{{ ticket.endDate}}</td>
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
tr {
    transition: 0.3s all ease-in-out;
  td {
    padding: 10px;
    border: 1px solid rgb(139, 139, 139);
  }
  &:nth-child(even) {
    background: #efefef;
  }
  &:hover {
    background: #d1d1d1;
  }
}
</style>