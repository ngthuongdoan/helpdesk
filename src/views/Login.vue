<!--suppress ALL -->
<template>
  <div>
    <div v-if="!isMobile" class="login__container">
      <div v-if="isChoose" id="chooseLanguage">
        <div class="flags__container">
          <h1>Choose your language</h1>
          <div>
            <div class="flags" @click="chooseLanguage('en')">
              <gb-flag code="us" height="200px" />
            </div>
            <div class="flags" @click="chooseLanguage('vi')">
              <gb-flag code="vn" height="200px" />
            </div>
          </div>
        </div>
      </div>
      <form class="login__form" @submit.prevent="submitForm">
        <label for="username">{{ $t("login.username") }}</label>
        <br />
        <input id="username" v-model="login.username" required type="text" />
        <br />
        <label for="password">{{ $t("login.password") }}</label>
        <br />
        <input
          id="password"
          v-model="login.password"
          required
          type="password"
        />
        <span id="eye">
          <img
            alt="show-password"
            src="https://img.icons8.com/android/24/000000/visible.png"
          />
        </span>
        <br />
        <div class="buttons">
          <input :value="$t('login.loginBtn')" type="submit" />
          <button @click="init">{{ $t("login.clearBtn") }}</button>
        </div>
      </form>
    </div>
    <!-- Giao diện cho mobile -->
    <Mobile v-else></Mobile>
    <!--  -->
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
      isChoose: true,
      connection: null,
    };
  },
  /**
   * Show/Hide password
   */
  mounted() {
    gsap.from(".flags__container", {
      opacity: 0,
      y: 70,
      duration: 1.5,
    });

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
  /**
   * Xét điều kiện hiển thị Mobile (width < 800px)
   */
  created() {
    if (window.innerWidth < 800) this.isMobile = true;
  },
  methods: {
    /**
     * Tạo mới đối tượng login
     */
    init() {
      this.login = {
        username: "",
        password: "",
      };
    },
    chooseLanguage(lang) {
      this.$i18n.locale = lang;
      this.isChoose = false;
    },
    /**
     * Điều hướng dựa trên quyền
     * @param {String} role - Quyền của người dùng
     */
    async changeRoute(role) {
      switch (role) {
        case "admin":
          this.$router.replace("/admin/dashboard");
          break;
        case "technician":
          this.$router.replace("/technician");
          break;
        case "user":
          await this.$store.dispatch("userModule/fetchFaq");
          this.$router.replace("/");

          break;
        default:
          break;
      }
    },
    /**
     * Login user
     * @async
     */
    async submitForm() {
      this.$helpers.loading(this.$i18n.locale);
      try {
        if (this.login.username === "") throw new Error("Username blank");
        if (this.login.password === "") throw new Error("Password blank");
        const user = await this.$http.post("/login", this.login);
        await this.$store.dispatch("userModule/logIn", user.data);
        await this.changeRoute(user.data.role.toLowerCase());

        this.$swal({
          title: this.$t("success"),
          icon: "success",
        });
      } catch (error) {
        this.$helpers.showError(error, this.$i18n.locale);
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