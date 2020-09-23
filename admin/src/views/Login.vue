<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="exampleInputEmail1">Email</label>
      <input
        v-model="user.userName"
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder="Enter email"
      />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input
        v-model="user.password"
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        placeholder="Password"
      />
    </div>
    <button type="submit" class="btn btn-primary">Login</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      user: {
        userName: "",
        password: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        if (this.user.userName === "") throw new Error("Username blank");
        if (this.user.password === "") throw new Error("Password blank");
        // const response = await this.$http.post("/signIn", this.user);
        // if (response.data !== "") {
          this.$store.dispatch("userModule/fetchUser", this.user);
          await this.$swal({
            icon: "success",
            title: "Success...",
            text: "You are logged in.",
          });
          this.$router.replace("/mafa");
        // } else {
          // throw new Error("User not exist");
        // }
      } catch (err) {
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: `${err.message}`,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: left;
  label {
    color: #41444b;
    font-size: 18px;
  }
  button {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
  }
}
</style>