<template>
  <div v-if="!isFetching && items.length !== 0">
    <a class="back-to-top" href="#welcome" ref="btt">
      <img src="~@/assets/img/up-arrow.svg" width="20px" />
    </a>
    <section id="welcome">
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
        <a href="#quality">
          <div class="card__items">
            <img alt src="~@/assets/technical-support.svg" width="20%" />
            <h3 class="card__header">{{ $t("user.index.cardHeader-1") }}</h3>
            <p>{{ $t("user.index.cardContent-1") }}</p>
          </div>
        </a>
        <a href="#fast">
          <div class="card__items">
            <img alt src="~@/assets/bolt.svg" width="20%" />
            <h3 class="card__header">{{ $t("user.index.cardHeader-2") }}</h3>
            <p>{{ $t("user.index.cardContent-2") }}</p>
          </div>
        </a>
        <a href="#communicate">
          <div class="card__items">
            <img alt src="~@/assets/conversation.svg" width="20%" />
            <h3 class="card__header">{{ $t("user.index.cardHeader-3") }}</h3>
            <p>{{ $t("user.index.cardContent-3") }}</p>
          </div>
        </a>
      </div>
    </section>
    <section id="quality">
      <div style="text-align: center">
        <img src="~@/assets/img/quality.svg" width="50%" />
      </div>
      <div class="quality__content">
        <h1>{{ $t("user.index.quality.title") }}</h1>
        <p>{{ $t("user.index.quality.content") }}</p>
      </div>
    </section>
    <section id="fast">
      <div class="fast__content">
        <h1>{{ $t("user.index.fast.title") }}</h1>
        <p>{{ $t("user.index.fast.content") }}</p>
      </div>
      <div style="text-align: center">
        <img src="~@/assets/img/fast.svg" width="50%" />
      </div>
    </section>
    <section id="communicate">
      <div class="communicate__information">
        <h3>{{ $t("user.index.communicate.title") }}</h3>
        <ul>
          <li>{{ $t("user.index.communicate.phone") }}: 0123456789</li>
          <li>
            Email:
            <a href="mailto:unicornhelpdesk@gmail.com"
              >unicornhelpdesk@gmail.com</a
            >
          </li>
        </ul>
      </div>
      <h1 id="logo">
        <!--suppress CheckImageSize -->
        <img alt="logo" src="~@/assets/logo.png" srcset="" width="100px" />
      </h1>
    </section>
  </div>
</template>

<script>
import itemTemplate from "@/components/User/ItemTemplate.vue";
// noinspection JSUnresolvedVariable
export default {
  data() {
    return {
      items: [],
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
    handleScroll(event) {
      var btt = this.$refs.btt;
      if (window.scrollY >= 200) {
        btt.style.display = "block";
      } else {
        btt.style.display = "none";
      }
    },
  },
  async created() {
    this.items = this.$store.getters["userModule/getFaq"];
    this.isFetching = false;
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted() {
    let qualityTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#quality",
        start: "top center",
        toggleActions: "restart none none none",
      },
    });
    qualityTL
      .from("#quality img", { opacity: 0, x: -100, duration: 1 })
      .from(".quality__content", { opacity: 0, y: -100, duration: 1 }, "-=0.5");
    let fastTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#fast",
        start: "top top",
        toggleActions: "restart none none none",
      },
    });
    qualityTL
      .from(".fast__content", { opacity: 0, x: -100, duration: 1 })
      .from("#fast img", { opacity: 0, y: -100, duration: 1 }, "-=0.5");
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/User/index.scss";
</style>