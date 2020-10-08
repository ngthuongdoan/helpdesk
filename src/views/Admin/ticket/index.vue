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
    <div v-if="ticket" class="ticket__container custom-scrollbar">
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
        <span class="label">Assigned: </span>{{ technicianName }}
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
      <div class="ticket__assignee">
        <div class="form-group">
          <label for="exampleFormControlSelect1">Assign to</label>
          <select
            id="exampleFormControlSelect1"
            v-model="technicianId"
            class="form-control"
          >
            <option
              v-for="technician in technicians"
              :key="technician.id"
              :value="technician.id"
            >
              {{ technician.fullName }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="comment">Comment:</label>
        <textarea class="form-control" id="comment" rows="5" v-model="comment"></textarea>
      </div>
      <button
        :disabled="isDisable"
        class="btn btn-primary"
        type="button"
        @click="updateTicket"
      >
        Update
      </button>
      <button class="btn btn-secondary" type="button" @click="back">
        Cancel
      </button>
      <button class="btn btn-danger" type="button" @click="deleteTicket">
        Delete
      </button>
    </div>
  </div>
</template>

<!--suppress ES6MissingAwait -->
<script>
export default {
  data() {
    return {
      ticket: null,
      technicians: [],
      isDisable: true,
      technicianId: "",
      technicianName: "",
      overlay: false,
      img: "",
      comment:"",
    };
  },
  methods: {
    async getData() {
      try {
        const tickets = await this.$http.get(
          "/ticket/" + this.$route.params.id
        );
        const technicians = await this.$http.get("/user/role/technician");
        this.ticket = tickets.data;
        this.technicianId = this.ticket.technicianId
          ? this.ticket.technicianId
          : "";
        this.technicians = technicians.data;
        this.technicianName = this.getTechniciansName(
          this.technicians,
          this.technicianId
        );
        this.comment = this.ticket.comment;
      } catch (err) {
        this.$swal({
          icon: "error",
          title: err.message,
        });
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
          const status = {
            name: "Assigned",
            time: new Date().toISOString(),
          };
          this.ticket.status.push(status);
          this.ticket.modifiedBy = this.$store.getters[
            "userModule/getUser"
          ].data.id;
          this.ticket.comment = this.comment;

          this.$swal({
            title: "Please wait",
            showConfirmButton: false,
            allowOutsideClick: false,
            onOpen: () => {
              this.$swal.showLoading();
            },
          });
          await this.$http.put("/ticket/" + this.$route.params.id, this.ticket);
          this.$swal("Updated!", "", "success");
          await this.getData();
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
          this.$swal({
            title: "Please wait",
            showConfirmButton: false,
            allowOutsideClick: false,
            onOpen: () => {
              this.$swal.showLoading();
            },
          });
          this.ticket.modifiedBy = this.$store.getters[
            "userModule/getUser"
          ].data.id;
          await this.$http.delete(
            `/ticket/${this.$route.params.id}/${this.ticket.modifiedBy}`
          );
          await this.$swal("Delete!", "", "success");
          this.back();
        }
      } catch (err) {
        this.$swal({
          icon: "error",
          title: err.message,
        });
        console.log(err);
      }
    },
    back() {
      this.$router.back();
    },
    getTechniciansName(technicians, technicianId) {
      const name = technicians.filter((tech) => tech.id === technicianId);
      return name.length !== 0 ? name[0].fullName : "Not Assigned";
    },
    showImage(img) {
      this.overlay = true;
      this.img = img;
    },
  },
  watch: {
    technicianId() {
      this.isDisable = false;
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
@import "~@/assets/styles/Admin/Ticket.scss";
</style>