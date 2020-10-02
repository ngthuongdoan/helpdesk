<template>
  <form @submit.prevent="updateInformation">
    <div class="form-group">
      <label for="fullname">Full name:</label>
      <input
        type="text"
        class="form-control"
        id="fullname"
        v-model="newUser.fullName"
        :disabled="!isChangeInformation"
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
        v-model="newUser.email"
        :disabled="!isChangeInformation"
        required
      />
    </div>
    <div class="form-group">
      <label for="password">New Password</label>
      <input
        type="password"
        class="form-control"
        id="password"
        :disabled="!isChangeInformation"
        v-model="newUser.password"
        required
      />
    </div>
    <div class="form-group">
      <label for="confirmpassword">Confirm Password</label>
      <input
        type="password"
        class="form-control"
        id="confirmpassword"
        :disabled="!isChangeInformation"
        ref="confirmPassword"
        required
      />
    </div>
    <button
      type="button"
      class="btn btn-primary"
      v-if="!isChangeInformation"
      @click="isChangeInformation = !isChangeInformation"
    >
      Change Information
    </button>
    <input
      type="submit"
      class="btn btn-primary"
      value="Update"
      v-if="isChangeInformation"
    />
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
      isChangeInformation: false,
    };
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async updateInformation(evt) {
      try {
        this.newUser.password = this.newPass;
        console.log(this.newUser, this.user);
        if (this.newUser.fullName === this.user.fullName)
          throw new Error("Not change");
        if (!this.isChangeInformation)
          this.newUser.password = this.user.password;
        console.log(this.newUser);
        //       const chose = await this.$swal({
        //         title: "Are you sure?",
        //         text: "You won't be able to revert this!",
        //         icon: "warning",
        //         showCancelButton: true,
        //         confirmButtonColor: "#3085d6",
        //         cancelButtonColor: "#d33",
        //         confirmButtonText: "Update",
        //       });
        //       if (chose.isConfirmed) {
        //         await this.$http.put("/user/" + this.user.data.id, this.user.data);
        //         this.$forceUpdate();

        //         this.$swal("Updated!", "", "success");
        //         this.$store.dispatch("userModule/signOut");
        //       }
      } catch (err) {
        this.$swal({
          icon: "error",
          title: err.message,
        });
        console.log(err);
      }
    },
    turnOffOverlay() {
      this.isChangeInformation = false;
      this.$emit("turn-off-overlay");
    },
  },
  created() {
    this.newUser = this.$props.user;
  },
};
</script>

<style>
</style>