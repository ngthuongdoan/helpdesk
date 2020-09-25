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
  created() {
    this.$http
      .get("/faq")
      .then((res) => {
        this.faqs = res.data;
        this.searchItems = this.faqs;
      })
      .catch((err) => {
        console.err(err);
      });
  },
};
</script>

<style lang="scss">
.faq {
  margin: 5px 20px;
  border-radius: 10px 10px 0 0;
  &__container {
    width: 80%;
    position: absolute;
    top: 10%;
    left: 10%;
    height: 80vh;
    overflow: hidden;
  }
  &__inner-container {
    overflow: auto;
    width: 100%;
    top: 15%;
    left: 10%;
    height: 70vh;
  }
}
.custom-searchbar {
  margin: 20px;
  width: 95%;
}
</style>