<template>
  <div class="faq__container">
    <input
      type="text"
      class="vs__input custom-searchbar"
      placeholder="Search here..."
      v-model="input"
    />
    <div class="faq__inner-container custom-scrollbar">
      <FAQ v-for="faq in searchItems" :key="faq.id" :faq="faq"></FAQ>
    </div>
  </div>
</template>

<script>
import FAQ from "@/components/User/FAQ";
export default {
  components: {
    FAQ,
  },
  data() {
    return {
      input: "",
      searchItems: [],
    };
  },
  watch: {
    input() {
      this.searchItems = this.faqs.filter((faq) =>
        faq.question.includes(this.input)
      );
    },
  },
  async created() {
    this.faqs = await this.$store.getters["userModule/getFaq"];
    this.searchItems = this.faqs;
  },
};
</script>

<style lang="scss">
@import "~@/assets/styles/User/FAQ.scss";
</style>