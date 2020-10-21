<template>
  <div class="comment" v-if="comment && role">
    <div class="comment__name" :class="'comment__name--' + role">
      <h4>
        {{ comment.fullName }} <span class="comment__role">{{ role }}</span>
        <span class="comment__date">{{
          new Date(comment.time).toLocaleString()
        }}</span>
      </h4>
    </div>
    <div class="comment__content" v-html="comment.content">
      <!-- <p>{{ comment.content }}</p> -->
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
  margin: 20px auto;
  &__name {
    width: 100%;
    padding: 10px 20px;
    border-radius: 5px 5px 0 0;
    display: inline-flex;
    position: relative;
    h4 {
      margin: 0;
      padding: 0;
      font-size: 15px;
    }
    &--user {
      background: rgba($color: #eccd59, $alpha: 0.4);
    }
    &--admin {
      background: rgba($color: #6359ec, $alpha: 0.4);
    }
    &--technician {
      background: rgba($color: #ec5959, $alpha: 0.4);
    }
    img {
      width: 16px;
      position: absolute;
      right: 20px;
      top: 10px;
      cursor: pointer;
    }
    .menu {
      position: absolute;
      right: 20px;
      top: 25px;
      background: white;
      border: 1px solid rgb(185, 185, 185);
      ul {
        list-style-type: none;
        // width: max-content;
        height: fit-content;
        margin: 0;
        padding: 0;
        li {
          padding: 5px;
          height: fit-content;
          font-size: 12px;
        }
      }
    }
  }
  &__role {
    margin-left: 10px;
    padding: 5px;
    border: 1px solid rgb(221, 221, 221);
    border-radius: 10px;
    background: rgba($color: white, $alpha: 0.4);
    font-weight: 400;
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