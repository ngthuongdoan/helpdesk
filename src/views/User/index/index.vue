<template>
  <div class="main-content">
    <div class="header">
      <h1 class="title">
        {{ $t("user.index.header.h1") }}
        <span id="highlight"> {{ $t("user.index.header.span") }} </span>
      </h1>
      <vue-suggestion
        v-model="item"
        :itemTemplate="itemTemplate"
        :items="searchItems"
        :setLabel="setLabel"
        :placeholder="$t('user.index.typeHere')"
        @changed="inputChange"
        @enter="showAnswer"
        @selected="itemSelected"
      ></vue-suggestion>
    </div>
    <div class="card__container">
      <div class="card__items">
        <img alt src="~@/assets/technical-support.svg" width="20%" />
        <h3 class="card__header">{{ $t("user.index.cardHeader-1") }}</h3>
        <p>{{ $t("user.index.cardContent-1") }}</p>
      </div>
      <div class="card__items">
        <img alt src="~@/assets/bolt.svg" width="20%" />
        <h3 class="card__header">{{ $t("user.index.cardHeader-2") }}</h3>
        <p>{{ $t("user.index.cardContent-2") }}</p>
      </div>
      <div class="card__items">
        <img alt src="~@/assets/conversation.svg" width="20%" />
        <h3 class="card__header">{{ $t("user.index.cardHeader-3") }}</h3>
        <p>{{ $t("user.index.cardContent-3") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import itemTemplate from "@/components/User/ItemTemplate.vue";

// noinspection JSUnresolvedVariable
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
      // noinspection JSUnresolvedVariable
      this.$swal({
        icon: "info",
        title: this.item.question,
        text: this.item.answer,
      }).then((this.item = Object.assign({})));
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