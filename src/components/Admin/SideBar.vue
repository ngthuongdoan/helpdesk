<template>
  <div class="sidebar">
    <nav>
      <ul class="nav flex-column sidebar__menu">
        <router-link
          v-for="value in menu"
          :key="value.id"
          :to="value.url"
          active-class="active"
          class="nav-item"
          tag="li"
        >
          <a class="nav-link">{{ value.name[$i18n.locale] }}</a>
        </router-link>
      </ul>
    </nav>
    <div id="logo"><img src="~@/assets/logo.png" alt="logo" /></div>
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
    return {
      menu: [
        {
          id: "dashboard",
          name: {
            en: "Dashboard",
            vi: "Trang chủ",
          },
          url: "/admin/dashboard",
          check: true,
        },
        {
          id: "tickets",
          name: {
            en: "Tickets",
            vi: "Yêu cầu",
          },
          url: "/admin/tickets",
          check: true,
        },
        {
          id: "technicians",
          name: {
            en: "Technicians",
            vi: "Kỹ thuật viên",
          },
          url: "/admin/technicians",
          check: true,
        },
      ],
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
  background: #ffffff;
  box-shadow: 1px 1px 5px rgba($color: #000000, $alpha: 0.6);
  .active {
    background-color: rgb(250, 250, 122);
  }
  &__menu {
    text-align: left;
    li {
      transition: 0.3s all ease-in-out;
      &:hover {
        background-color: rgb(148, 148, 51);
        a {
          margin-left: 40px;
        }
      }
      a {
        transition: 0.3s all ease-in-out;

        margin-left: 30px;
        padding: 10px;
        font-size: 16px;
        color: black;
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
    background: #f0f0f0;
    img {
      width: 80px;
    }
  }
}
</style>