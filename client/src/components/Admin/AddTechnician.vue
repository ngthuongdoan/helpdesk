<template>
  <form @submit.prevent="addInformation" style="padding: 30px">
    <div class="form-group">
      <label for="fullname">Full name</label>
      <input
        type="text"
        class="form-control"
        id="fullname"
        v-model="technician.fullName"
        required
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
        required
      />
    </div>
    <div class="form-group">
      <label for="username">Username</label>
      <input
        type="text"
        class="form-control"
        id="username"
        v-model="technician.username"
        required
      />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        type="password"
        class="form-control"
        id="password"
        v-model="technician.password"
        required
      />
    </div>
    <div class="form-group">
      <label for="confirmpassword">Confirm Password</label>
      <input
        type="password"
        class="form-control"
        id="confirmpassword"
        ref="confirmPassword"
        v-model="confirm"
        required
      />
    </div>
    <input type="submit" class="btn btn-primary" value="Add new" />
    <button
      type="button"
      class="btn btn-secondary"
      style="margin-left: 20px"
      @click="turnOffOverlay"
    >
      Cancel
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      technician: {
        fullName: "",
        username: "",
        email: "",
        password: "",
        role: "technician",
      },
      confirm: "",
    };
  },
  methods: {
    init() {
      this.technician = {
        fullName: "",
        username: "",
        email: "",
        password: "",
        role: "technician",
      };
      this.confirm = "";
    },
    async addInformation() {
      try {
        if (this.technician.password !== this.confirm)
          throw new Error("Password not match");
        const chose = await this.$swal({
          title: "Are you sure?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Add",
        });
        if (chose.isConfirmed) {
          await this.$http.post("/user", this.technician);
          this.$swal("Added!", "", "success");

          this.turnOffOverlay();
        }
      } catch (err) {
        this.$swal({
          icon: "error",
          title: err.message,
        });
      }
    },
    turnOffOverlay() {
      this.init();
      this.$emit("turn-off-overlay");
    },
  },
};
</script>
