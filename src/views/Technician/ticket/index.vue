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
      <h2 class="ticket__title">{{ ticket.title.toUpperCase() }}</h2>
      <p class="ticket__detail">
        <span class="label">Place: </span>{{ ticket.place }}
      </p>
      <p class="ticket__detail">
        <span class="label">Status: </span
        >{{ ticket.status | getStatusName }} at
        {{ ticket.status | getStatusTime }}
      </p>
      <p class="ticket__detail">
        <span class="label">Start: </span>{{ ticket.startDate | changeDate }}
      </p>
      <p class="ticket__detail">
        <span class="label">End: </span>{{ ticket.endDate | changeDate }}
      </p>
      <p class="ticket__detail">
        <span class="label">Description: </span>{{ ticket.description }}
      </p>
      <img
        v-for="img in ticket.images"
        :key="img"
        :src="img"
        alt="image"
        class="ticket__img"
        @click="showImage(img)"
      />
      <div class="clearfix"></div>
      <div class="form-group">
        <label for="comment">Comment:</label>
        <textarea class="form-control" id="comment" rows="5" v-model="comment"></textarea>
      </div>
      <button class="btn btn-primary" type="button" @click="updateTicket">
        Done
      </button>
      <button class="btn btn-secondary" type="button" @click="back">
        Cancel
      </button>
      <button class="btn btn-danger" type="button" @click="dropTicket">
        Drop
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ticket: null,
      overlay: false,
      img: "",
      comment :""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const ticket = await this.$http.get("/ticket/" + this.$route.params.id);
        this.ticket = ticket.data;
        this.comment = this.ticket.comment
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
          cancelButtonColor: "#dd3333",
          confirmButtonText: "Update",
        });
        if (chose.isConfirmed) {
          const status = {
            name: "Done",
            time: new Date().toISOString(),
          };
          this.$swal({
            title: "Please wait",
            showConfirmButton: false,
            allowOutsideClick: false,
            onOpen: () => {
              this.$swal.showLoading();
            },
          });
          this.ticket.modifiedBy = this.$store.getters["userModule/getUser"].data.id;
          this.ticket.status.push(status);
          this.ticket.endDate = new Date();
          this.ticket.comment = this.comment;
          await this.$http.put("/ticket/" + this.$route.params.id, this.ticket);
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
    async dropTicket() {
      try {
        const chose = await this.$swal({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Drop",
        });
        if (chose.isConfirmed) {
          const status = {
            name: "Drop",
            time: new Date(),
          };
          this.$swal({
            title: "Please wait",
            showConfirmButton: false,
            allowOutsideClick: false,
            onOpen: () => {
              this.$swal.showLoading();
            },
          });
          this.ticket.modifiedBy = await this.$store.getters["userModule/getUser"].data.id;
          this.ticket.status.push(status);
          this.ticket.comment = this.comment;

          await this.$http.put("/ticket/" + this.$route.params.id, this.ticket);

          this.$swal("Updated!", "", "success");
          await this.getData();
        }
      } catch (err) {
        this.$swal({
          icon: "error",
          title: "Sorry we busy right now",
        });
        console.log(err);
      }
    },
    back() {
      this.$router.back();
    },
    showImage(img) {
      this.overlay = true;
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
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/Technician/Ticket.scss";
.ticket__container {
  height: 100%;
}
</style>