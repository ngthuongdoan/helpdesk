<template>
  <div class="ticket" v-if="!isFetching">
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div v-if="overlay" class="overlay" @click="overlay = !overlay">
        <img :src="img" alt="imgOverlay" />
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
        <Comment v-for="id in ticket.comment" :key="id" :id="id"></Comment>
        <div class="ticket__box">
          <form @submit.prevent="addNewComment">
            <textarea
              cols="30"
              rows="3"
              placeholder="Type here"
              v-model="newComment"
              required
              :disabled="isClose"
            ></textarea>
            <div class="form-group">
              <label for="exampleFormControlSelect1">Assign to</label>
              <select
                id="exampleFormControlSelect1"
                v-model="technicianId"
                @change="assignTo"
                class="form-control"
                :disabled="isClose"
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
            <input
              type="submit"
              value="Comment"
              class="btn btn-success"
              :disabled="isClose"
            />
            <button class="btn btn-secondary" type="button" @click="back">
              Back
            </button>
            <button
              class="btn btn-light"
              type="button"
              @click="closeTicket"
              :disabled="isClose"
            >
              <img src="@/assets/icon/error_red.png" alt="" width="20px" />
              Close this
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<!--suppress ES6MissingAwait -->
<script>
import Comment from "@/components/Comment";
export default {
  data() {
    return {
      ticket: null,
      technicians: [],
      isClose: false,
      technicianId: "",
      technicianName: "",
      overlay: false,
      img: "",
      newComment: "",
      isFetching: true,
    };
  },
  methods: {
    async getData() {
      this.isFetching = true;
      this.$swal({
        title: "Please wait",
        showConfirmButton: false,
        allowOutsideClick: false,
        onOpen: () => {
          this.$swal.showLoading();
        },
      });
      try {
        this.interval = setInterval(async () => {
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
          this.isClose =
            this.ticket.status[this.ticket.status.length - 1].name === "Closed";
          this.isFetching = false;
        }, 500);
      } catch (err) {
        this.$swal({
          icon: "error",
          title: err.message,
        });
      }
    },
    async closeTicket() {
      try {
        const chose = await this.$swal({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Close",
        });
        if (chose.isConfirmed) {
          const status = {
            name: "Closed",
            time: new Date().toISOString(),
          };
          this.ticket.status.push(status);
          this.ticket.modifiedBy = this.$store.getters[
            "userModule/getUser"
          ].data.id;
          this.$swal({
            title: "Please wait",
            showConfirmButton: false,
            allowOutsideClick: false,
            onOpen: () => {
              this.$swal.showLoading();
            },
          });
          await this.$http.put("/ticket/" + this.$route.params.id, this.ticket);
          await this.$swal("Closed!", "", "success");
          await this.back();
        }
      } catch (err) {
        this.$swal({
          icon: "error",
          title: err.message,
        });
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
    async assignTo() {
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
          console.log(this.ticket);
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
  },
  watch: {
    technicianId() {
      clearInterval(this.interval);
    },
    isFetching() {
      this.$swal.close();
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
  async created() {
    this.getData();
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  components: {
    Comment,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/Admin/Ticket.scss";
</style>