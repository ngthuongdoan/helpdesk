<template>
  <div v-if="!isFetching && items" class="main-content">
    <div class="header">
      <h1 class="title">
        {{ $t("user.index.header.h1") }}
        <span id="highlight"> {{ $t("user.index.header.span") }} </span>
      </h1>
      <vue-suggestion
        v-if="items"
        v-model="item"
        :itemTemplate="itemTemplate"
        :items="searchItems"
        :placeholder="$t('user.index.typeHere')"
        :setLabel="setLabel"
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
      isFetching: true,
      noFaq: [
        {
          question: {
            en: "Sorry, please send us a new ticket",
            vi: "Xin lỗi, hãy gửi cho chúng tôi một ticket mới",
          },
          answer: {
            en: "",
            vi: "",
          },
        },
      ],
    };
  },
  methods: {
    /**
     * Lấy faq đang được tìm kiếm
     * @param {Object} item - FAQ đang được chọn
     */
    itemSelected(item) {
      this.item = item;
      this.showAnswer();
    },
    /**
     * Hiển thị question của faq mỗi khi user nhập
     * @param {Object} item - FAQ đang được chọn
     * @returns {String} - Question của FAQ
     */
    setLabel(item) {
      return item.question[this.$i18n.locale];
    },
    /**
     * Lấy FAQ khi user nhập
     * @param {String} text - Từ khoá tìm kiếm
     */
    inputChange(text) {
      const faq = this.items.filter((item) =>
        item.question[this.$i18n.locale].includes(text)
      );
      this.searchItems = faq.length !== 0 ? faq : this.noFaq;
    },
    /**
     * Hiển thị câu trả lời khi user click vào question sau đó trả FAQ về trạng thái ban đầu
     */
    showAnswer() {
      // noinspection JSUnresolvedVariable
      this.$swal({
        icon: "info",
        title: this.item.question[this.$i18n.locale],
        text: this.item.answer[this.$i18n.locale],
      }).then((this.item = Object.assign({})));
    },
  },
  async created() {
    this.items = this.$store.getters["userModule/getFaq"];
    this.isFetching = false;
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/User/index.scss";
</style>