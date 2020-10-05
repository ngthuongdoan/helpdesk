<template>
  <div class="sidebar">
    <nav>
      <div class="sidebar__header">
        <h4>{{ user.role.toUpperCase() }}</h4>
      </div>
      <transition enter-active-class="animate__animated animate__fadeInLeft">
        <ul class="nav flex-column sidebar__menu">
          <router-link
              v-for="value in menu"
              :key="value.id"
              :to="value.url"
              active-class="active"
              class="nav-item"
              tag="li"
          >
            <a class="nav-link">{{ value.name }}</a>
          </router-link>
        </ul>
      </transition>
    </nav>
    <div id="logo"><img src="~@/assets/logo.png" alt="logo"></div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    let menu;
    switch (this.user.role) {
      case "admin":
        menu = [
          {
            id: "dashboard",
            name: "Dashboard",
            url: "/admin/dashboard",
            check: true,
          },
          {
            id: "tickets",
            name: "Tickets",
            url: "/admin/tickets",
            check: true,
          },
          {
            id: "technicians",
            name: "Technicians",
            url: "/admin/technicians",
            check: true,
          },
        ];
        break;
      case "technician":
        menu = [
          {
            id: "dashboard",
            name: "Dashboard",
            url: "/technician",
            check: true,
          },
        ];
        break;
    }
    return {
      menu: menu,
    };
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
    bottom: 0;
    width: 100%;
    text-align: center;
    justify-self: flex-start;
    align-self: center;
    background: #c8c8c8;
    img{
      width: 80px;
    }
  }
}
</style>