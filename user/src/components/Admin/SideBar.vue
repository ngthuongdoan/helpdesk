<template>
  <div class="sidebar">
    <nav>
      <div class="sidebar__header">
        <h4>{{ user.role | toUpperCase}}</h4>
      </div>
      <transition enter-active-class="animate__animated animate__fadeInLeft">
        <ul class="nav flex-column sidebar__menu">
          <router-link
            v-for="value in menu"
            :key="value.id"
            tag="li"
            class="nav-item"
            :to="value.url"
            active-class="active"
            exact
          >
            <a class="nav-link">{{ value.name }}</a>
          </router-link>
        </ul>
      </transition>
    </nav>
    <button @click="signOut" class="btn btn-danger" id="signoutBtn">
      Sign Out
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          id: "dashboard",
          name: "Dashboard",
          url: "/",
          check: true,
        },
        {
          id: "tickets",
          name: "Tickets",
          url: "/tickets",
          check: true,
        },
        {
          id: "technicians",
          name: "Technicians",
          url: "/technicians",
          check: true,
        },
      ],
    };
  },
  props: ["user"],
  methods: {
    signOut() {
      this.$store.dispatch("userModule/signOut");
      this.$router.push("/login");
    },
  },
  filters: {
    toUpperCase(value) {
      return value.toUpperCase();
    },
  },
};
</script>

<style lang="scss">
.sidebar {
  color: white;
  position: relative;
  height: 100%;
  min-width: 250px;
  text-align: center;
  background:rgb(49, 49, 49);
  &__header {
    // padding: 40px 0;
    text-align: center;
    h4 {
      margin-top: 50px;
      font-size: 20px;
    }
  }
  .active {
    background-color: rgb(66, 66, 66);
    color: #2b2d30;
  }
  &__menu {
    text-align: left;
    margin-top: 50px;

    li {
      &:hover {
        background-color:rgb(66, 66, 66);
      }
      a {
        margin-left: 30px;
        padding: 10px;
        font-size: 16px;
        color: white;
      }
    }
  }
  button {
    position: absolute;
    width: 80%;
    bottom: 30px;
    left: 10%;
    padding: 10px;
  }
}
</style>