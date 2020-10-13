<!--suppress ALL -->
<template>
  <div class="ticket-user">
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div v-if="imgOverlay" id="imgOverlay" @click="imgOverlay = !imgOverlay">
        <img :src="this.img" alt="imgOverlay" />
      </div>
    </transition>
    <div class="ticket-user__container custom-scrollbar">
      <h2 class="ticket-user__title">{{ newTicket.title.toUpperCase() }}</h2>
      <p class="ticket-user__detail">
        <span class="label">Status: </span
        >{{ newTicket.status | getStatusName }} at
        {{ newTicket.status | getStatusTime }}
      </p>
      <p class="ticket-user__detail">
        <span class="label">Assigned: </span>{{ newTicket.technicianName }}
      </p>
      <p class="ticket-user__detail">
        <span class="label">Start: </span>{{ newTicket.startDate | changeDate }}
      </p>
      <p class="ticket-user__detail">
        <span class="label">End: </span>{{ newTicket.endDate | changeDate }}
      </p>
      <p class="ticket-user__detail">
        <span class="label">Place: </span><br />
        <input v-model="ticket.place" :disabled="!isUpdate" type="text" />
      </p>
      <p class="ticket-user__detail">
        <span class="label">Description: </span><br />
        <textarea
          v-model="newTicket.description"
          :disabled="!isUpdate"
          cols="30"
          rows="10"
        ></textarea>
      </p>
      <img
        v-for="img in newTicket.images"
        :key="img"
        :src="img"
        class="ticket-user__img"
        @click="showImage(img)"
      />
      <div class="clearfix"></div>
      <button
        v-if="!isDone && !isUpdate"
        class="btn btn-primary"
        type="button"
        @click="isUpdate = !isUpdate"
      >
        Change Information
      </button>
      <button
        v-if="!isDone && isUpdate"
        class="btn btn-primary"
        type="button"
        @click="updateTicket"
      >
        Update
      </button>
      <button class="btn btn-secondary" type="button" @click="back">
        Cancel
      </button>
      <button class="btn btn-danger" type="button" @click="deleteTicket" v-if="!isAssigned">
        Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ticket: null,
      imgOverlay: false,
      img: "",
      isUpdate: false,
      newTicket: {},
      isDone: false,
      isAssigned:false,
    };
  },
  methods: {
    async getData() {
      try {
        const ticket = await this.$http.get("/ticket/" + this.$route.params.id);
        this.ticket = ticket.data;
        this.newTicket = Object.assign({}, this.ticket);
        if (this.ticket.status[this.ticket.status.length - 1].name === "Done") {
          this.isDone = true;
        }
        if (this.ticket.status[this.ticket.status.length - 1].name === "Assigned") {
          this.isAssigned = true;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async updateTicket() {
      try {
        const chose = await this.$swal({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Update",
        });
        if (chose.isConfirmed) {
          // noinspection ES6MissingAwait
          this.$swal({
            title: "Please wait",
            showConfirmButton: false,
            allowOutsideClick: false,
            onOpen: () => {
              this.$swal.showLoading();
            },
          });
          await this.$http.put(
            "/ticket/" + this.$route.params.id,
            this.newTicket
          );
          await this.$swal("Updated!", "", "success");
          this.back();
        }
      } catch (err) {
        this.$swal({
          icon: "error",
          title: err.message,
        });
      }
    },
    async deleteTicket() {
      try {
        const chose = await this.$swal({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Delete",
        });
        if (chose.isConfirmed) {
          // noinspection ES6MissingAwait
          this.$swal({
            title: "Please wait",
            showConfirmButton: false,
            allowOutsideClick: false,
            onOpen: () => {
              this.$swal.showLoading();
            },
          });
          await this.$http.delete("/ticket/" + this.$route.params.id);
          await this.$swal("Delete!", "", "success");
          this.back();
        }
      } catch (err) {
        this.$swal({
          icon: "error",
          title: err.message,
        });
      }
    },
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

  mounted() {
    this.$helpers.importBoostrap();
  },
  created() {
    this.getData();
  },
  beforeDestroy() {
    this.$helpers.removeBoostrap();
  },
};
</script>

<style lang="scss" scoped>
.ticket-user {
  &__container {
    position: absolute;
    width: 80%;
    top: 15%;
    left: 10%;
    height: 80vh;
    overflow: auto;
    background: white;
    padding: 20px 30px;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.61);
    border-radius: 10px;
    z-index: 0;
  }

  input[type="text"],
  textarea {
    width: 500px;
    padding: 12px 20px;
    display: inline-block;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
    transition: 0.2s all ease-in-out;
    outline: none;

    &:focus {
      border: 2px solid #eccd59;
      box-shadow: 1px 1px 10px #eccd59;
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

  button {
    margin-right: 20px;
    padding: 10px 20px;
  }
}
</style>