<template>
  <div class="notification">
    <div class="btn-group">
      <div class="button" id="accountBtn">
        <img src="https://img.icons8.com/ios-glyphs/30/000000/guest-male.png" />
      </div>
      <div class="button" id="notifyBtn">
        <img
          src="https://img.icons8.com/ios-filled/24/000000/appointment-reminders.png"
        />
      </div>
      <div class="button" id="signOutBtn" @click="signOut">
        <img
          src="https://img.icons8.com/metro/26/000000/export.png"
          width="16px"
          alt="signout"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    signOut() {
      this.$store.dispatch("userModule/signOut");
      this.$router.push("/login").catch(() => {});
    },
  },
};
</script>

<style lang="scss">
.notification {
  width: 100%;
  min-height: 50px;
  height: fit-content;
  position: sticky;
  display: grid;
}
.btn-group {
  justify-self: end;
  align-self: center;
  margin: auto 30px;
}
.button {
  margin: auto 5px;
}
#signOutBtn,
#notifyBtn,
#accountBtn {
  width: 35px;
  height: 35px;
  background-color: rgb(224, 89, 89);
  border-radius: 10px;
  cursor: pointer;
  img {
    position: absolute;
    transform: translate(60%, 60%);
  }
}
#notifyBtn,
#accountBtn {
  background-color: white;
  img {
    transform: translate(35%, 35%);
    width: 20px;
  }
}
</style>