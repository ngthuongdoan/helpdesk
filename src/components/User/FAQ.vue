<template>
  <div class="faq">
    <h3 class="faq__question" @click="showAnswer">
      {{ faq.question[$i18n.locale] }}
    </h3>
    <transition
      enter-active-class="animate__animated animate__flipInX"
      leave-active-class="animate__animated animate__flipOutX"
    >
      <p v-show="isShown" class="faq__answer">{{ faq.answer[$i18n.locale] }}</p>
    </transition>
    <hr />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShown: false,
    };
  },
  props: {
    faq: {
      type: Object,
      required: true,
    },
  },
  methods: {
    showAnswer() {
      this.isShown = !this.isShown;
    },
  },
};
</script>
<style lang="scss">
.faq {
  // box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.61);

  &__question {
    background: rgb(228, 228, 228);
    padding: 10px;
    width: 100%;
    border: 1px solid rgb(206, 206, 206);
    position: relative;
    cursor: pointer;

    &::after {
      content: url("https://img.icons8.com/windows/32/000000/down-squared.png");
      position: absolute;
      right: 10px;
      top: 5px;
      opacity: 0.6;
    }
  }

  &__answer {
    transition: 0.3s all ease-in-out;
    padding: 10px;
    background: white;
    width: 100%;
    line-height: 1.5;
  }
}
</style>
