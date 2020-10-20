<template>
  <TicketContainer class="user" :role="userRole"></TicketContainer>
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
  mounted() {
    this.$helpers.importBoostrap();
  },
  beforeDestroy() {
    this.$helpers.removeBoostrap();
  },
};
</script>

<style lang="scss">
@import "~@/assets/styles/User/Tickets.scss";
</style>