<template>
  <div class="logger">
    <div class="logger__icon">
      <img alt="icon" :src="log.icon" width="20px" />
    </div>
    <p class="logger__content">
      {{ log.content }} {{ new Date(log.time).toLocaleString() }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    log: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.logger {
  box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.61);
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  margin: 10px auto;
  &__content {
    margin: 0 0 0 10px;
  }
}
</style>