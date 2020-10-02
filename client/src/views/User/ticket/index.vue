<template>
  <div class="ticket-user">
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div
        class="imgOverlay"
        v-if="imgOverlay"
        @click="imgOverlay = !imgOverlay"
      >
        <img :src="this.img" />
      </div>
    </transition>
    <div class="ticket-user__container custom-scrollbar">
      <h2 class="ticket-user__title">{{ ticket.title.toUpperCase() }}</h2>
      <p class="ticket-user__detail">
        <span class="label">Place: </span>{{ ticket.place }}
      </p>
      <p class="ticket-user__detail">
        <span class="label">Status: </span
        >{{ ticket.status | getStatusName }} at
        {{ ticket.status | getStatusTime }}
      </p>
      <p class="ticket-user__detail">
        <span class="label">Assigned: </span>{{ ticket.technicianName }}
      </p>
      <p class="ticket-user__detail">
        <span class="label">Start: </span>{{ ticket.startDate | changeDate }}
      </p>
      <p class="ticket-user__detail">
        <span class="label">End: </span>{{ ticket.endDate | changeDate }}
      </p>
      <p class="ticket-user__detail">
        <span class="label">Description: </span>{{ ticket.description }}
      </p>
      <img
        class="ticket-user__img"
        v-for="img in ticket.images"
        :key="img"
        :src="img"
        @click="showImage(img)"
      />
      <div class="clearfix"></div>
      <button
        type="button"
        class="btn btn-primary"
        :disabled="isDisable"
        @click="updateTicket"
      >
        Update
      </button>
      <button type="button" class="btn btn-secondary" @click="back">
        Cancel
      </button>
      <button type="button" class="btn btn-danger" @click="deleteTicket">
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
      technicians: [],
      isDisable: true,
      technicianId: "",
      imgOverlay: false,
      img: "",
    };
  },
  methods: {
    async getData() {
      try {
        const tickets = await this.$http.get(
          "/ticket/" + this.$route.params.id
        );
        this.ticket = tickets.data;
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
          this.ticket.technicianId = this.technicianId;
          this.ticket.technicianName = this.getTechniciansName(
            this.technicians,
            this.technicianId
          );
          await this.$http.put("/ticket/" + this.$route.params.id, this.ticket);
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
          this.ticket.technicianId = this.technicianId;

          await this.$http.delete("/ticket/" + this.$route.params.id);
          this.$swal("Delete!", "", "success");
          this.back();
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
    let bootstrapStyle = document.createElement("link");
    bootstrapStyle.setAttribute(
      "href",
      "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    );
    bootstrapStyle.setAttribute("rel", "stylesheet");
    bootstrapStyle.setAttribute("id", "bsstyle");

    let jQuery = document.createElement("script");
    jQuery.setAttribute("id", "jquery");
    jQuery.setAttribute(
      "src",
      "https://code.jquery.com/jquery-3.5.1.slim.min.js"
    );

    let popperjs = document.createElement("script");
    popperjs.setAttribute("id", "popperjs");
    popperjs.setAttribute(
      "src",
      "https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
    );

    let bootstrap = document.createElement("script");
    bootstrap.setAttribute("id", "bootstrap");
    bootstrap.setAttribute(
      "src",
      "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
    );

    document.head.appendChild(bootstrapStyle);
    document.body.appendChild(jQuery);
    document.body.appendChild(popperjs);
    document.body.appendChild(bootstrap);
  },
  created() {
    this.getData();
  },
  beforeDestroy() {
    let bootstrapStyle = document.getElementById("bsstyle");
    document.head.removeChild(bootstrapStyle);

    let jQuery = document.getElementById("jquery");
    document.body.removeChild(jQuery);

    let popperjs = document.getElementById("popperjs");
    document.body.removeChild(popperjs);

    let bootstrap = document.getElementById("bootstrap");
    document.body.removeChild(bootstrap);
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
    padding: 20px;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.61);
    border-radius: 10px;
  }
  .imgOverlay {
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