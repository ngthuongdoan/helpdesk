<template>
  <tr class="ticket-admin__row" v-if="ticket" @click="showTicket">
    <td class="ticket-admin__data">{{ ticket.id }}</td>
    <td class="ticket-admin__data">{{ ticket.fullName }}</td>
    <td class="ticket-admin__data">{{ ticket.title }}</td>
    <td class="ticket-admin__data">
      {{ ticket.status[ticket.status.length - 1].name }}
    </td>
    <td class="ticket-admin__data">
      {{ new Date(ticket.startDate).toLocaleString() }}
    </td>
    <td class="ticket-admin__data">
      {{ ticket.endDate ? new Date(ticket.endDate).toLocaleString() : "" }}
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
  data() {
    return {
      disable: false,
    };
  },
  methods: {
    showTicket() {
      if (!this.disable)
        this.$router.push("/technician/tickets/" + this.ticket.id);
    },
  },
  created() {
    if (
      this.$props.ticket.status[this.$props.ticket.status.length - 1].name ===
      "Done"
    ) {
      this.disable = true;
    }
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