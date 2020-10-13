<!--suppress ES6MissingAwait -->
<template>
  <div class="ticket">
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div v-if="overlay" class="overlay" @click="overlay = !overlay">
        <img :src="this.img" alt="imgOverlay" />
      </div>
    </transition>
    <div class="ticket__container custom-scrollbar">
      <div class="ticket__information">
        <table>
          <thead>
            <th colspan="2">Basic Information</th>
          </thead>
          <tbody>
            <tr>
              <td><b>Tilte:</b> {{ ticket.title.toUpperCase() }}</td>
              <td><b>Assigned:</b> {{ ticket.technicianName }}</td>
            </tr>
            <tr>
              <td><b>Start Date:</b> {{ ticket.startDate | changeDate }}</td>
              <td>
                <b>Status:</b> {{ ticket.status | getStatusName }} at
                {{ ticket.status | getStatusTime }}
              </td>
            </tr>
            <tr>
              <td><b>End Date:</b> {{ ticket.endDate | changeDate }}</td>
              <td><b>Place:</b> {{ ticket.place }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <img
        v-for="img in ticket.images"
        :key="img"
        :src="img"
        alt="image"
        class="ticket__img"
        @click="showImage(img)"
      />
      <div class="ticket__conversation">
        <Comment
          v-for="cmt in ticket.comment"
          :key="cmt"
          :id="cmt"
        ></Comment>
        <div class="ticket__box">
          <form @submit.prevent="comment">
            <textarea
              cols="30"
              rows="3"
              placeholder="Type here"
              v-model="newComment"
              required
            ></textarea>
            <input type="submit" value="Comment" class="btn btn-success" />
            <button class="btn btn-secondary" @click="back">Cancel</button>
            <button class="btn btn-light" @click="closeTicket">
              <img src="@/assets/icon/error_red.png" alt="" width="20px" />
              Close this
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/Comment";
export default {
  data() {
    return {
      ticket: null,
      imgOverlay: false,
      img: "",
      isUpdate: false,
      newComment: "",
    };
  },
  methods: {
    async getData() {
      try {
        const ticket = await this.$http.get("/ticket/" + this.$route.params.id);
        this.ticket = ticket.data;
      } catch (err) {
        console.log(err);
      }
    },
    comment() {},
    closeTicket() {},
    back() {
      this.$router.back();
    },
    showImage(img) {
      this.imgOverlay = true;
      this.img = img;
    },
  },
  filters: {
    changeDate(value) {
      return value ? new Date(value).toLocaleString() : "";
    },
    getStatusTime(value) {
      return value
        ? new Date(value[value.length - 1].time).toLocaleString()
        : "";
    },
    getStatusName(value) {
      return value ? value[value.length - 1].name : "";
    },
  },
  components: {
    Comment,
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/Technician/Ticket.scss";
.ticket__container {
  height: 100%;
}
</style>