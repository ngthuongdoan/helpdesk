<template>
  <div class="request">
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
        <span class="label">Assigned: </span>{{ technicianName }}
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
      />
      <div class="request__assignee">
        <div class="form-group">
          <label for="exampleFormControlSelect1">Assign to</label>
          <select
            class="form-control"
            id="exampleFormControlSelect1"
            v-model="technicianId"
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
      request: null,
      technicians: [],
      isDisable: true,
      technicianId: "",
      technicianName: "",
    };
  },
  methods: {
    async getData() {
      try {
        const tickets = await this.$http.get(
          "/ticket/" + this.$route.params.id
        );
        const technicians = await this.$http.get("/user/role/technician");
        this.request = tickets.data;
        this.technicianId = this.request.technicianId
          ? this.request.technicianId
          : "";
        this.technicians = technicians.data;
        this.technicianName = this.getTechniciansName(
          this.technicians,
          this.technicianId
        );
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
          this.request.technicianId = this.technicianId;
          this.request.technicianName = this.getTechniciansName(
            this.technicians,
            this.technicianId
          );
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
          this.request.technicianId = this.technicianId;

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
    getTechniciansName(technicians, technicianId) {
      const name = technicians.filter((tech) => tech.id === technicianId);

      return name.length !== 0 ? name[0].fullName : "Not Assigned";
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
.request {
  padding: 20px;
  width: 100%;
  height: 100%;
  &__container {
    background: white;
    max-width: 100%;
    height: 100%;
    overflow: auto;
    padding: 20px;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.61);
    border-radius: 10px;
  }
  &__img {
    margin: 10px;
    max-width: 250px;
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