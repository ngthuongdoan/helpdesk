<template>
  <header ref="header">
    <h1 id="logo" @click="home">
      <!--suppress CheckImageSize -->
      <img alt="logo" src="@/assets/logo.png" srcset="" width="50px" />
    </h1>
    <nav>
      <ul>
        <router-link tag="li" to="/tickets">{{
          $t("user.header.yourTicket")
        }}</router-link>
        <router-link tag="li" to="/faq">{{
          $t("user.header.faq")
        }}</router-link>
      </ul>
    </nav>
    <div class="buttons">
      <!-- <img
      @click="changeLanguage"
        id="changeLanguage"
        src="https://img.icons8.com/material-outlined/24/000000/globe--v2.png"
      /> -->
      <button id="sendBtn" @click="send">
        {{ $t("user.header.sendTicket") }}
      </button>
      <button id="logoutBtn" @click="logout">
        {{ $t("user.header.logout") }}
      </button>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    home() {
      this.$router.push("/");
    },
    send() {
      this.$emit("send-ticket");
    },
    logout() {
      this.$store.dispatch("userModule/signOut");
    },
    handleScroll(event) {
      var header = this.$refs.header;

      if (window.scrollY >= 200) {
        header.style.background = "#f7f7f7";
      } else {
        header.style.background = "transparent";
      }
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Sonsie+One&display=swap");

header {
  z-index: 10;
  background: transparent;
  height: 80px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0 80px;
  position: fixed;
  transition: 0.3s all ease-in-out;
}

#logo {
  justify-self: flex-start;
  margin-left: 80px;
  align-self: center;
  cursor: pointer;
}

nav {
  width: 100%;
  height: 100%;
  position: relative;

  ul {
    width: fit-content;
    display: inline-flex;
    list-style-type: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    li {
      margin: auto 20px;
      cursor: pointer;
      font-weight: bold;
      opacity: 0.6;
      position: relative;
      transition: 0.3s all ease-in-out;

      &:hover,
      &.router-link-active,
      & .router-link-exact-active {
        opacity: 1;

        &::after {
          position: absolute;
          right: 0;
          content: "";
          height: 100%;
          width: 80%;
          border-bottom: 5px solid #47daad;
          z-index: -1;
        }
      }
    }
  }
}

.buttons {
  grid-column: 3/4;
  justify-self: flex-end;
  align-self: center;
  display: inline-flex;
}
#changeLanguage {
  height: 25px;
  align-self: center;
  margin-right: 20px;
  cursor: pointer;
}
#sendBtn,
#logoutBtn {
  width: 120px;
  height: fit-content;
  padding: 10px 20px;
  margin: auto 10px;
  border: none;
  border-radius: 20px;
  background: #eccd59;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.2s ease-in;
  cursor: pointer;

  &:hover {
    background: #dbb73e;
  }

  &:focus {
    border: none;
    outline: none;
  }
}

#logoutBtn {
  background: #ec5959;

  &:hover {
    background: #db3e3e;
  }
}

.hamburger-wrapper {
  grid-column: 2/3;
  align-self: center;
  justify-self: flex-end;

  .hamburger {
    cursor: pointer;
    background-color: transparent;
    border: transparent;

    &:focus {
      border: transparent;
    }
  }

  span {
    pointer-events: none;
    width: 30px;
    height: 3px;
    background-color: black;
    display: block;
    margin: 4px 0;
    opacity: 0.8;
  }
}

#hamburger-content {
  display: none;
}

.desktop {
  display: block;
}

.mobile {
  display: none;
  cursor: pointer;
  grid-column: 3/4;
  align-self: center;
  justify-self: flex-end;
}

@media screen and (max-width: 812px) {
  .desktop {
    display: none;
  }
  .mobile {
    display: block;
  }
  header {
    padding: 0 30px;
  }
}
</style>