<template>
  <TicketContainer :role="userRole"></TicketContainer>
</template>

<script>
import TicketContainer from "@/components/TicketContainer";
export default {
  computed: {
    userRole() {
      return this.$store.getters["userModule/getUser"].data.role;
    },
  },
  components: {
    TicketContainer,
  },
};
</script>

<style lang="scss">
@import "~@/assets/styles/Admin/Ticket.scss";
</style>