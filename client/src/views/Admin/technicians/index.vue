<template>
  <div class="technician__container">
    <div class="overlay" v-if="overlay">
      <form @submit.prevent="updateInformation">
        <div class="form-group">
          <label for="fullname">Full name:</label>
          <input
            type="text"
            class="form-control"
            id="fullname"
            v-model="technician.fullName"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="technician.email"
          />
        </div>
        <button
          type="button"
          class="btn btn-dark"
          style="margin-bottom: 10px"
          @click="isChangePassword = !isChangePassword"
        >
          Change Password
        </button>
        <div class="form-group">
          <label for="password">New Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            :disabled="!isChangePassword"
            v-model="newPass"
            required
          />
        </div>
        <div class="form-group">
          <label for="confirmpassword">Confirm Password</label>
          <input
            type="password"
            class="form-control"
            id="confirmpassword"
            :disabled="!isChangePassword"
            ref="confirmPassword"
            required
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Update" />

        <button
          type="button"
          class="btn btn-secondary"
          style="margin-left: 20px"
          @click="overlay = false"
        >
          Cancel
        </button>
        <button
          type="button"
          class="btn btn-danger"
          style="margin-left: 20px"
          @click="deleteTechnician"
        >
          Delete
        </button>
      </form>
    </div>
    <Pagination
      :page="page"
      :pages="pages"
      @previous="page--"
      @changePage="page = $event"
      @next="page++"
      v-if="isOnePage"
    ></Pagination>
    <div v-if="displayedTechnicians.length === 0">
      <p id="noTechnician">Không có technician nào</p>
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

<script>
import Technician from "@/components/Admin/Technician.vue";
import Pagination from "@/components/Pagination.vue";
import mockTechnicians from "@/mocks/technician.js";
export default {
  data() {
    return {
      page: 1,
      perPage: 15,
      pages: [],
      technicians: [],
      overlay: false,
      isChangePassword: false,
      newPass: "",
      technician: {},
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
      this.technician = event;
    },
    validate() {
      if (this.isChangePassword)
        return this.$refs.confirmPassword.value === this.newPass;
      return true;
    },
    async updateInformation() {
      if (!this.validate()) {
        this.$swal({
          icon: "error",
          title: "Password not match",
        });
        return;
      }
      try {
        this.technician.password = this.newPass;
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
          await this.$http.put("/user/" + this.technician.id, this.technician);
          this.$forceUpdate();

          this.$swal("Updated!", "", "success");
          this.overlay = false;
          this.technician = {};
        }
      } catch (err) {
        this.$swal({
          icon: "error",
          title: "Sorry we busy right now",
        });
        console.log(err);
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
          await this.$http.delete("/user/" + this.technician.id);

          this.$swal("Deleted!", "", "success");
          this.overlay = false;
          this.technician = {};
          this.$forceUpdate();

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
    async getData() {
      try {
        this.interval = setInterval(async () => {
          const res = await this.$http.get("/user/role/technician");
          this.technicians = res.data;
          this.setPages();
        }, 500);
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