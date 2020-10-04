<!--suppress ES6MissingAwait -->
<template>
  <form style="padding: 30px" @submit.prevent="addInformation">
    <div class="form-group">
      <label for="full-name">Full name</label>
      <input
          id="full-name"
          v-model="technician.fullName"
          class="form-control"
          required
          type="text"
      />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input
          id="exampleInputEmail1"
          v-model="technician.email"
          aria-describedby="emailHelp"
          class="form-control"
          required
          type="email"
      />
    </div>
    <div class="form-group">
      <label for="username">Username</label>
      <input
          id="username"
          v-model="technician.username"
          class="form-control"
          required
          type="text"
      />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
          id="password"
          v-model="technician.password"
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
          class="form-control"
          required
          type="password"
      />
    </div>
    <input class="btn btn-primary" type="submit" value="Add new"/>
    <button
        class="btn btn-secondary"
        style="margin-left: 20px"
        type="button"
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
