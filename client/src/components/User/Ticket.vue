<template>
  <tr>
    <td>{{ ticket.id }}</td>
    <td>{{ ticket.title }}</td>
    <td>{{ ticket.technicianID }}</td>
    <td>{{ ticket.status }}</td>
    <td>{{ ticket.startDate }}</td>
    <td>{{ ticket.endDate }}</td>
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