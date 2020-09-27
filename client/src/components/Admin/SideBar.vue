<template>
  <div class="sidebar">
    <nav>
      <div class="sidebar__header">
        <h4>{{ user.username | ToUpperCase }}</h4>
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
    <h1 id="logo">HelpCenter</h1>
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
          url: "/admin",
          check: true,
        },
        {
          id: "request",
          name: "Request",
          url: "/admin/request",
          check: true,
        },
        {
          id: "technicians",
          name: "Technicians",
          url: "/admin/technicians",
          check: true,
        },
      ],
    };
  },
  props: ["user"],
  filters: {
    ToUpperCase(value) {
      return value.toUpperCase();
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Sonsie+One&display=swap");
.sidebar {
  color: white;
  position: fixed;
  height: 100%;
  min-width: 200px;
  text-align: center;
  background: rgb(49, 49, 49);
  &__header {
    background: rgb(31, 30, 30);
    text-align: center;
    h4 {
      padding: 50px 0;
      display: block;
      width: 100%;
      height: 100%;
      font-size: 20px;
    }
  }
  .active {
    background-color: rgb(250, 250, 122);
    a {
      color: black;
    }
  }
  &__menu {
    text-align: left;
    li {
      &:hover {
        background-color: rgb(66, 66, 66);
      }
      a {
        margin-left: 30px;
        padding: 10px;
        font-size: 16px;
        color: white;
      }
    }
  }
  #logo {
    position: absolute;
    bottom: 30px;
    text-align: center;
    width: 100%;
    justify-self: flex-start;
    align-self: center;
    font-size: 20px;
    font-family: "Sonsie One", cursive;
    font-style: italic;
  }
}
</style>