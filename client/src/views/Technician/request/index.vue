<template>
  <div class="request">
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div class="overlay" v-if="overlay" @click="overlay = !overlay">
        <img :src="this.img" />
      </div>
    </transition>
    <div class="request__container custom-scrollbar">
      <h2 class="request__title">{{ request.title.toUpperCase() }}</h2>
      <p class="request__detail">
        <span class="label">Place: </span>{{ request.place }}
      </p>
      <p class="request__detail">
        <span class="label">Status: </span
        >{{ request.status | getStatusName }} at
        {{ request.status | getStatusTime }}
      </p>
      <p class="request__detail">
        <span class="label">Start: </span>{{ request.startDate | changeDate }}
      </p>
      <p class="request__detail">
        <span class="label">End: </span>{{ request.endDate | changeDate }}
      </p>
      <p class="request__detail">
        <span class="label">Description: </span>{{ request.description }}
      </p>
      <img
        class="request__img"
        v-for="img in request.images"
        :key="img"
        :src="img"
        @click="showImage(img)"
      />
      <div class="clearfix"></div>
      <button type="button" class="btn btn-primary" @click="updateTicket">
        Done
      </button>
      <button type="button" class="btn btn-secondary" @click="back">
        Cancel
      </button>
      <button type="button" class="btn btn-danger" @click="dropTicket">
        Drop
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      request: null,
      overlay: false,
      img: "",
    };
  },
  methods: {
    async getData() {
      try {
        const ticket = await this.$http.get("/ticket/" + this.$route.params.id);
        this.request = ticket.data;
        console.log(this.request);
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
          this.request.status.push(status);
          console.log(this.request);
          await this.$http.put(
            "/ticket/" + this.$route.params.id,
            this.request
          );
          this.$swal("Updated!", "", "success");
          this.getData();
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
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
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
          this.request.status.push(status);
          await this.$http.put(
            "/ticket/" + this.$route.params.id,
            this.request
          );

          this.$swal("Updated!", "", "success");
          this.getData();
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
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.request {
  width: 100%;
  height: 100%;
  padding: 20px;
  &__container {
    padding: 20px 30px;
    background: white;
    max-width: 100%;
    height: 100%;
    overflow: auto;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.61);
    border-radius: 10px;
  }
  .overlay {
    animation-duration: 0.3s;
    top: 0;
    left: 0;
    img {
      max-width: 800px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
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