<template>
  <div class="notification">
    <div class="buttons">
      <div
        id="accountBtn"
        class="button"
        title="Change Information"
        @click="changeInformation"
      >
        <img
          alt="Change Information"
          src="https://img.icons8.com/ios-glyphs/30/000000/guest-male.png"
        />
      </div>
      <div
        v-if="!isTechnician"
        id="addBtn"
        class="button"
        title="Add Technician"
        @click="addNew"
      >
        <img
          alt="Add Technician"
          src="https://img.icons8.com/android/24/000000/plus.png"
        />
      </div>
      <div id="signOutBtn" class="button" title="Logout" @click="signOut">
        <img
          alt="Logout"
          src="https://img.icons8.com/metro/26/000000/export.png"
          width="16px"
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
    changeInformation() {
      this.$emit("change-information");
    },
    addNew() {
      this.$emit("add-technician");
    },
  },
  computed: {
    isTechnician() {
      return (
        this.$store.getters["userModule/getUser"].data.role === "technician"
      );
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

.buttons {
  justify-self: end;
  align-self: center;
  margin: auto 30px;
  display: inline-flex;
}

.button {
  margin: auto 5px;
}

#signOutBtn,
#addBtn,
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

#addBtn,
#accountBtn {
  background-color: white;

  img {
    transform: translate(35%, 35%);
    width: 20px;
  }
}

#addBtn {
  position: relative;
}

.option {
  position: absolute;
  width: max-content;
  left: -140%;
  background: white;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.61);

  ul {
    list-style-type: none;
    padding: 0;
    border-radius: 10px !important;
    margin: 0;

    li {
      padding: 10px;
      width: 100%;
      cursor: pointer;
      transition: 0.3s all ease-in-out;

      a {
        color: black;
        text-decoration: none;
      }

      &:hover {
        background: rgb(192, 191, 191);
      }
    }
  }
}
</style>