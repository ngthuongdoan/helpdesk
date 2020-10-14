<!--suppress ALL -->
<template>
  <div class="ticket-user" v-if="ticket">
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div v-if="imgOverlay" id="imgOverlay" @click="imgOverlay = !imgOverlay">
        <img :src="img" alt="imgOverlay" />
      </div>
    </transition>
    <div class="ticket-user__container custom-scrollbar">
      <div class="ticket-user__information">
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
        class="ticket-user__img"
        @click="showImage(img)"
      />
      <div class="ticket-user__conversation">
        <Comment v-for="cmt in ticket.comment" :key="cmt" :id="cmt"></Comment>
        <div class="ticket-user__box">
          <form @submit.prevent="addNewComment">
            <textarea
              cols="30"
              rows="3"
              placeholder="Type here"
              v-model="newComment"
              required
            ></textarea>
            <input type="submit" value="Comment" class="btn btn-success" />
            <button class="btn btn-secondary" @click="back">Back</button>
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
        this.interval = setInterval(async () => {
          const ticket = await this.$http.get(
            "/ticket/" + this.$route.params.id
          );
          this.ticket = ticket.data;
        }, 500);
      } catch (err) {
        console.log(err);
      }
    },
    async addNewComment() {
      try {
        this.$swal({
          title: "Please wait",
          showConfirmButton: false,
          allowOutsideClick: false,
          onOpen: () => {
            this.$swal.showLoading();
          },
        });
        const comment = {
          fullName: this.$store.getters["userModule/getUser"].data.fullName,
          userId: this.$store.getters["userModule/getUser"].data.id,
          content: this.newComment,
        };
        this.newComment = "";

        await this.$http.put(
          "/comment/ticket/" + this.$route.params.id,
          comment
        );
        this.$swal("Updated!", "", "success");
        await this.getData();
      } catch (err) {
        this.$swal({
          icon: "error",
          title: err.message,
        });
      }
    },
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
  mounted() {
    this.$helpers.importBoostrap();
  },
  created() {
    this.getData();
  },

  beforeDestroy() {
    clearInterval(this.interval);

    this.$helpers.removeBoostrap();
  },
};
</script>

<style lang="scss" scoped>
.ticket-user {
  overflow-x: hidden;
  &__container {
    position: absolute;
    width: 80%;
    top: 15%;
    left: 10%;
    bottom: 5%;
    overflow: auto;
    background: white;
    padding: 20px 30px;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.61);
    z-index: 0;
  }
  &__information {
    line-height: 1.5;
    background-color: white;
    table {
      width: 100%;
      th {
        padding: 10px;
        font-size: 22px;
        border-bottom: 1px dashed rgb(51, 51, 51);
      }
      td {
        padding: 5px;
      }
    }
  }
  &__conversation {
    position: relative;
    margin-top: 20px;
  }
  &__box {
    margin-top: 50px;
    form {
      width: 100%;
      textarea {
        width: 100%;
        padding: 20px 10px;
        border: 1px solid rgba(107, 107, 107, 0.295);
      }
      button {
        margin-left: 20px;
        img {
          margin-top: -5px;
        }
      }
    }
  }

  #imgOverlay {
    animation-duration: 0.3s;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.61);
    width: 100vw;
    height: 100vh;
    z-index: 10000;

    img {
      position: absolute;
      max-width: 800px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 10000;
    }
  }

  &__img {
    margin: 10px;
    max-width: 250px;
    cursor: pointer;
  }

  .label {
    font-weight: bold;
  }
}
</style>