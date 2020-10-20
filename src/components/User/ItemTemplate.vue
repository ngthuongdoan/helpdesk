<template>
  <div>
    <p>{{ item.question[$i18n.locale] }}</p>
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true },
  },
};
</script>