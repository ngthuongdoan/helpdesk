<template>
  <div class="comment" v-if="comment && role">
    <div class="comment__name">
      <h4>
        {{ comment.fullName }} <span class="comment__role">{{ role }}</span>
        <span class="comment__date">{{
          new Date(comment.time).toLocaleString()
        }}</span>
      </h4>
    </div>
    <div class="comment__content">
      <p>{{ comment.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comment: null,
      role: "",
    };
  },
  props: ["id"],
  async created() {
    try {
      const comment = await this.$http.get(`/comment/${this.$props.id}`);

      const user = await this.$http.get(`/user/${comment.data.userId}`);
      this.comment = comment.data;
      this.role = user.data.role;
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style lang='scss'>
.comment {
  width: 100%;
  border: 1px solid rgba(107, 107, 107, 0.295);
  border-radius: 5px;
  &__name {
    width: 100%;
    padding: 10px 20px;
    background: rgba($color: #eccd59, $alpha: 0.4);
    border-radius: 5px 5px 0 0;
    h4 {
      margin: 0;
      padding: 0;
      font-size: 15px;
    }
  }
  &__role {
    margin-left: 10px;
    padding: 5px;
    border: 1px solid rgb(221, 221, 221);
    border-radius: 10px;
    background: rgba($color: white, $alpha: 0.4);
  }
  &__date {
    margin-left: 10px;
    font-size: 12px;
    opacity: 0.6;
  }
  &__content {
    width: 100%;
    padding: 10px 20px;
    p {
      font-size: 14px;
      margin: 0;
      padding: 0;
    }
  }
}
</style>