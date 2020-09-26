<template>
  <div class="content">
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
    this.$http
      .get("/faq")
      .then((res) => {
        this.items = res.data;
      })
      .catch((err) => {
        console.err(err);
      });
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@900&display=swap");
.content {
  height: 100vh;
  position: relative;
}
.header {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  .title {
    font-family: "Lato", sans-serif;
    font-size: 40px;
    letter-spacing: 3px;
    #highlight {
      position: relative;
    }
    #highlight::after {
      position: absolute;
      top: -10px;
      left: 0;
      content: "";
      height: 100%;
      width: 100%;
      border-bottom: 5px solid #47daad;
      z-index: -1;
      padding: 10px;
    }
  }
}

.card {
  &__container {
    position: absolute;
    width: 90vw;
    top: 50%;
    display: grid;
    margin-left: 10vw;
    grid-template-columns: repeat(3, 1fr);
    text-align: center;
    z-index: -1;
  }
  &__items {
    width: 300px;
    min-height: 300px;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.61);
    border-radius: 20px;
    overflow: hidden;
    background: white;
    p {
      font-size: 16px;
      margin: 30px;
    }
    img {
      margin: 30px auto;
    }
  }
  &__header {
    margin: 10px;
    color: #47daad;
  }
}
</style>