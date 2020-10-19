<!--suppress ALL -->
<template>
  <div>
    <div class="login__container" v-if="!isMobile">
      <form class="login__form" @submit.prevent="submitForm">
        <label for="username">{{ $t("login.username") }}</label>
        <br />
        <input id="username" type="text" v-model="login.username" required />
        <br />
        <label for="password">{{ $t("login.password") }}</label>
        <br />
        <input
          id="password"
          type="password"
          v-model="login.password"
          required
        />
        <span id="eye">
          <img
            src="https://img.icons8.com/android/24/000000/visible.png"
            alt="show-password"
          />
        </span>
        <br />
        <div class="buttons">
          <input type="submit" :value="$t('login.loginBtn')" />
          <button @click="init">{{ $t("login.clearBtn") }}</button>
        </div>
      </form>
    </div>
    <Mobile v-else></Mobile>
  </div>
</template>

<script>
import Mobile from "@/components/Mobile";
export default {
  data() {
    return {
      login: {
        username: "",
        password: "",
      },
      isMobile: false,
    };
  },
  mounted() {
    if (!this.isMobile) {
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
    }
  },
  created() {
    if (window.innerWidth < 800) this.isMobile = true;
  },
  methods: {
    init() {
      this.login = {
        username: "",
        password: "",
      };
    },
    changeRoute(role) {
      switch (role) {
        case "admin":
          this.$router.replace("/admin/dashboard");
          break;
        case "technician":
          this.$router.replace("/technician");
          break;
        case "user":
          this.$router.replace("/");
          this.$store.dispatch("userModule/fetchFaq");
          break;
        default:
          break;
      }
    },
    async submitForm() {
      try {
        if (this.login.username === "") throw new Error("Username blank");
        if (this.login.password === "") throw new Error("Password blank");
        const user = await this.$http.post("/login", this.login);
        await this.$store.dispatch("userModule/logIn", user.data);
        await this.$swal({
          title: "Success",
          icon: "success",
        }).then();
        this.changeRoute(user.data.role.toLowerCase());
      } catch (err) {
        await this.$swal({
          title: "Error",
          icon: "error",
          text: err,
        });
      }
    },
  },
  components: {
    Mobile,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/Login.scss";
</style>