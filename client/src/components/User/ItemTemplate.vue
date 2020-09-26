<template>
  <div>
    <p>{{ item.question }}</p>
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true },
  },
};
</script>