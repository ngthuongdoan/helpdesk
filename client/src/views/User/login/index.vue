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
        <img src="https://img.icons8.com/android/24/000000/visible.png" alt="Show password"/>
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
        await this.$swal({
          title: "Success",
          icon: "success",
        });
        await this.$store.dispatch("userModule/logIn", user.data);
        await this.$router.replace("/");
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
#eye {
  position: absolute;
  z-index: 1;
  cursor: pointer;
  top: 50%;
  transform: translate(-150%, -25%);
  opacity: 0.4;
  transition: 0.3s all ease-in-out;
  &:hover {
    opacity: 1;
  }
}
.login {
  &__container {
    width: 100%;
    height: 100vh;
    label {
      color: white;
    }
    input {
      width: 500px;
      padding: 10px 20px;
      margin: 10px 0;
      display: inline-block;
      border: 2px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;
      transition: 0.2s all ease-in-out;
      outline: none;
      &:focus {
        border: 2px solid #eccd59;
        box-shadow: 1px 1px 10px #eccd59;
      }
    }
    input[type="password"] {
      position: relative;
    }
    input[type="submit"],
    button {
      align-self: center;
      justify-self: right;
      width: 40%;
      background-color: #eccd59;
      font-weight: bold;
      font-size: 14px;
      padding: 14px 20px;
      margin: 20px;
      border: none;
      border-radius: 4px;
      transition: 0.2s all ease-in-out;
      cursor: pointer;
      &:hover {
        background: #b4942b;
      }
      &:focus {
        border: none;
        outline: none;
      }
    }
    button {
      justify-self: left;
      background: #ccc;
      &:hover {
        background: rgb(124, 123, 123);
      }
      &:focus {
        border: none;
        outline: none;
      }
    }
  }
  &__form {
    background-color: rgba(0, 0, 0, 0.603);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
  }
}
</style>