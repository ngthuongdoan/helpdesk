<template>
  <tr class="technician-admin__row" @click="changeInformation">
    <td class="technician-admin__data">{{ technician.id }}</td>
    <td class="technician-admin__data">{{ technician.fullName }}</td>
    <td class="technician-admin__data">{{ technician.username }}</td>
    <td class="technician-admin__data">{{ technician.email }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    technician: {
      type: Object,
      required: true,
    },
  },
  methods: {
    changeInformation() {
      this.$emit("change-information", this.technician);
    },
  },
};
</script>

<style lang="scss">
.technician-admin {
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