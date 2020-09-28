<template>
  <div class="request">
    <div class="request__container">
      <h2 class="request__title">{{ request.title }}</h2>
      <p class="request__detail">{{ request.detail }}</p>
      <img class="request__img" :src="request.img" />
      <img class="request__img" :src="request.img" />
      <img class="request__img" :src="request.img" />
      <div class="request__assignee">
        <div class="form-group">
          <label for="exampleFormControlSelect1">Assign to</label>
          <select class="form-control" id="exampleFormControlSelect1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      request: {
        title: "Máy hư",
        detail:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere, id.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere, id.",
        img:
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.request {
  padding: 20px;
  width: 100%;
  height: 100%;
  &__container {
    background: white;
    max-width: 100%;
    height: 100%;
    overflow: auto;
    padding: 20px;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.61);
    border-radius: 10px;
  }
  &__img {
    margin: 10px;
    max-width: 250px;
  }
}
</style>