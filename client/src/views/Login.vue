<template>
  <div class="login__container">
    <form class="login__form" @submit.prevent="submitForm">
      <label for>Username</label>
      <br />
      <input type="text" v-model="login.username" required />
      <br />
      <label for>Password</label>
      <br />
      <input type="password" v-model="login.password" required />
      <span id="eye">
        <img
          src="https://img.icons8.com/android/24/000000/visible.png"
          alt="show-password"
        />
      </span>
      <br />
      <input type="submit" value="Submit" />
      <button @click="init">Clear</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    init() {
      this.login = {
        username: "",
        password: "",
      };
    },
    async submitForm() {
      try {
        if (this.login.username === "") throw new Error("Username blank");
        if (this.login.password === "") throw new Error("Password blank");
        const user = await this.$http.post("/login", this.login);
        console.log(user.data);
        await this.$swal({
          title: "Success",
          icon: "success",
        });
        await this.$store.dispatch("userModule/logIn", user.data);
        switch (user.data.role.toLowerCase()) {
          case "admin":
            this.$router.replace("/admin");
            break;
          case "technician":
            this.$router.replace("/technician");
            break;
          case "user":
            this.$router.replace("/");
            break;
          default:
            break;
        }
      } catch (err) {
        this.$swal({
          title: "Error",
          icon: "error",
          text: err,
        });
      }
    },
  },
  mounted() {
    const eye = document.getElementById("eye");
    const password = document.querySelector("input[type='password']");
    let wasShowed = false;
    eye.addEventListener("click", () => {
      if (wasShowed) {
        wasShowed = false;
        eye.style.opacity = "0.4";
        password.type = "password";
      } else {
        wasShowed = true;
        eye.style.opacity = "1";
        password.type = "text";
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/Login.scss";
</style>