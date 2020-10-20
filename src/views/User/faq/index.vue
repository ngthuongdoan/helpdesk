<template>
  <div class="faq__container">
    <!--suppress HtmlFormInputWithoutLabel -->
    <input
      v-model="input"
      class="vs__input custom-searchbar"
      :placeholder="$t('user.faq.typeHere')"
      type="text"
    />
    <div class="faq__inner-container custom-scrollbar">
      <FAQ v-for="faq in searchItems" :key="faq.id" :faq="faq"></FAQ>
    </div>
  </div>
</template>

<script>
import FAQ from "@/components/User/FAQ";

export default {
  data() {
    return {
      input: "",
      searchItems: [],
    };
  },
  /**
   * Lầy FAQ từ trong store
   */
  async created() {
    this.faqs = await this.$store.getters["userModule/getFaq"];
    this.searchItems = this.faqs;
  },
  watch: {
    /**
     * Hiện FAQ mỗi khi user nhập
     */
    input() {
      this.searchItems = this.faqs.filter((faq) =>
        faq.question.includes(this.input)
      );
    },
  },
  components: {
    FAQ,
  },
};
</script>

<style lang="scss">
@import "~@/assets/styles/User/FAQ.scss";
</style>