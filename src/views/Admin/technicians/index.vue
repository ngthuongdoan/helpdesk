<template>
  <div class="technician__container">
    <div v-if="overlay" class="overlay">
      <form @submit.prevent="updateInformation">
        <div class="form-group">
          <label for="full-name">Full name:</label>
          <input
            id="full-name"
            v-model="newTechnician.fullName"
            :disabled="!isChangeInformation"
            class="form-control"
            required
            type="text"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            id="exampleInputEmail1"
            v-model="newTechnician.email"
            :disabled="!isChangeInformation"
            aria-describedby="emailHelp"
            class="form-control"
            required
            type="email"
          />
        </div>
        <div class="form-group">
          <label for="password">New Password</label>
          <input
            id="password"
            v-model="newTechnician.password"
            :disabled="!isChangeInformation"
            class="form-control"
            required
            type="password"
          />
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            ref="confirmPassword"
            v-model="confirm"
            :disabled="!isChangeInformation"
            class="form-control"
            required
            type="password"
          />
        </div>
        <button
          v-if="!isChangeInformation"
          class="btn btn-primary"
          type="button"
          @click="isChangeInformation = !isChangeInformation"
        >
          Change Information
        </button>
        <input
          v-if="isChangeInformation"
          class="btn btn-primary"
          type="submit"
          value="Update"
        />
        <button
          class="btn btn-secondary"
          style="margin-left: 20px"
          type="button"
          @click="turnOffOverlay"
        >
          Cancel
        </button>
        <button
          class="btn btn-danger"
          style="margin-left: 20px"
          type="button"
          @click="deleteTechnician"
        >
          Delete
        </button>
      </form>
    </div>
    <Pagination
      v-if="isOnePage"
      :page="page"
      :pages="pages"
      @changePage="page = $event"
      @next="page++"
      @previous="page--"
    ></Pagination>
    <div v-if="displayedTechnicians.length === 0">
      <p id="noTechnician">No technician</p>
    </div>
    <table v-else>
      <thead>
        <tr>
          <th>ID</th>
          <th>Full name</th>
          <th>Username</th>
          <th>Email</th>
        </tr>
      </thead>
      <Technician
        v-for="technician in displayedTechnicians"
        :key="technician.id"
        :technician="technician"
        @change-information="changeInformation"
      ></Technician>
    </table>
  </div>
</template>

<!--suppress ExceptionCaughtLocallyJS, ES6MissingAwait -->
<script>
import Technician from "@/components/Admin/Technician.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  data() {
    return {
      page: 1,
      perPage: 15,
      pages: [],
      technicians: [],
      overlay: false,
      isChangeInformation: false,
      confirm: "",
      newTechnician: {},
      isFetching: true,
    };
  },
  components: {
    Technician,
    Pagination,
  },
  methods: {
    setPages() {
      if (this.technicians.length === 0) return;
      this.pages = [];
      let numberOfPages = Math.ceil(this.technicians.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(technicians) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return technicians.slice(from, to);
    },
    changeInformation(event) {
      this.overlay = true;
      this.newTechnician = Object.assign({}, event);
    },
    turnOffOverlay() {
      this.overlay = false;
      this.isChangeInformation = false;
      this.confirm = "";
    },
    async updateInformation() {
      try {
        if (this.newTechnician.password !== this.confirm)
          throw new Error("Password not match");
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
          this.$swal({
            title: "Please wait",
            showConfirmButton: false,
            allowOutsideClick: false,
            onOpen: () => {
              this.$swal.showLoading();
            },
          });
          await this.$http.put(
            "/user/" + this.newTechnician.id,
            this.newTechnician
          );
          this.$swal("Updated!", "", "success");
          this.overlay = false;
          this.technician = {};
        }
      } catch (err) {
        this.$swal({
          icon: "error",
          title: err.message,
        });
      }
    },
    async deleteTechnician() {
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
          await this.$http.delete("/user/" + this.technician.id);

          this.$swal("Deleted!", "", "success");
          this.overlay = false;
          this.technician = {};
          this.$forceUpdate();
        }
      } catch (err) {
        this.$swal({
          icon: "error",
          title: err.message,
        });
      }
    },
    async getData() {
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
          const res = await this.$http.get("/user/role/technician");
          this.technicians = res.data;
          this.setPages();
          this.isFetching = false;
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    },
    clearInterval(interval) {
      clearInterval(interval);
    },
  },
  computed: {
    displayedTechnicians() {
      return this.technicians.length !== 0
        ? this.paginate(this.technicians)
        : [];
    },
    isOnePage() {
      return this.pages.length > 1;
    },
  },
  watch: {
    technicians() {
      this.setPages();
    },
    isFetching() {
      this.$swal.close();
    },
  },
  created() {
    this.getData();
  },
  beforeDestroy() {
    this.clearInterval(this.interval);
  },
  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + "...";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/Admin/Technicians.scss";
</style>