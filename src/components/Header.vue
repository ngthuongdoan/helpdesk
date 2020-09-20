<template>
  <header>
    <h1 id="logo" @click="home">HelpCenter</h1>
    <button id="sendBtn" @click="send">Send a Ticket</button>
  </header>
</template>

<script>
export default {
  methods:{
    home(){
      this.$router.push("/");
    },
    send(){
      this.$router.push("/sendticket")
    },
  }
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
}
#logo {
  width: 50%;
  justify-self: flex-start;
  align-self: center;
  cursor: pointer;
  font-size: 20px;
  font-family: "Sonsie One", cursive;
}

#sendBtn {
  grid-column: 3/4;
  width: fit-content;
  height: fit-content;
  padding: 10px 20px;
  justify-self: flex-end;
  align-self: center;
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