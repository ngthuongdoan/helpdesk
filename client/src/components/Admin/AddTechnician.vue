<template>
  <form @submit.prevent="addInformation">
    <div class="form-group">
      <label for="fullname">Full name:</label>
      <input type="text" class="form-control" id="fullname" required />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        required
      />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="password" required />
    </div>
    <div class="form-group">
      <label for="confirmpassword">Confirm Password</label>
      <input
        type="password"
        class="form-control"
        id="confirmpassword"
        ref="confirmPassword"
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
  methods: {
    turnOffOverlay() {
      this.$emit("turn-off-overlay");
    },
  },
};
</script>

<style>
</style>