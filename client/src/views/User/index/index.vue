<template>
  <div class="maincontent">
    <div class="header">
      <h1 class="title">
        How can we
        <span id="highlight">help you?</span>
      </h1>
      <vue-suggestion
        :items="searchItems"
        v-model="item"
        :setLabel="setLabel"
        :itemTemplate="itemTemplate"
        @changed="inputChange"
        @selected="itemSelected"
        @enter="showAnswer"
        placeholder="Input here..."
      ></vue-suggestion>
    </div>
    <div class="card__container">
      <div class="card__items">
        <img src="~@/assets/technical-support.svg" alt width="20%" />
        <h3 class="card__header">Quality over cost</h3>
        <p>Quality maintenance is a sustainable approach.</p>
      </div>
      <div class="card__items">
        <img src="~@/assets/bolt.svg" alt width="20%" />
        <h3 class="card__header">Fast. Fresh. Convenient</h3>
        <p>Give us the honour to serve you.</p>
      </div>
      <div class="card__items">
        <img src="~@/assets/conversation.svg" alt width="20%" />
        <h3 class="card__header">Communicate With Tomorrow</h3>
        <p>Work as a team to help your customers get all the answers.</p>
      </div>
    </div>
  </div>
</template>

<script>
import itemTemplate from "@/components/User/ItemTemplate.vue";
export default {
  data() {
    return {
      item: {},
      searchItems: [],
      itemTemplate,
    };
  },
  methods: {
    itemSelected(item) {
      this.item = item;
      this.showAnswer();
    },
    setLabel(item) {
      return item.question;
    },
    inputChange(text) {
      this.searchItems = this.items.filter((item) =>
        item.question.includes(text)
      );
    },
    showAnswer() {
      this.$swal({
        icon: "info",
        title: this.item.question,
        text: this.item.answer,
      }).then((this.item = {}));
    },
  },
  created() {
    this.items = this.$store.getters["userModule/getFaq"];
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/User/index.scss";
</style>