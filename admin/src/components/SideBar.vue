<template>
  <div class="sidebar">
    <nav>
      <div class="sidebar__header">
        <h4>{{ user.userName }}</h4>
      </div>
      <transition enter-active-class="animate__animated animate__fadeInLeft">
        <ul class="nav flex-column sidebar__menu">
          <router-link
            v-for="value in menu"
            :key="value.id"
            tag="li"
            class="nav-item"
            :to="value.url"
            exact-active-class="active"
          >
            <a class="nav-link">{{ value.name }}</a>
          </router-link>
        </ul>
      </transition>
    </nav>
    <button @click="signOut" class="btn btn-danger" id="signoutBtn">Sign Out</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      site: "mafa",
      menu: [
        {
          id: "mafaInfo",
          name: "Thông tin chung",
          url: "/mafa/info",
          check: true,
        },
        {
          id: "mafaFoods",
          name: "Quản lý món",
          url: "/mafa/foods",
          check: true,
        },
        {
          id: "mafaEmployees",
          name: "Quản lý nhân viên",
          url: "/mafa/employees",
          check: true,
        },
        {
          id: "mafaPosts",
          name: "Quản lý bài viết",
          url: "/mafa/posts",
          check: true,
        },
        {
          id: "mafaBills",
          name: "Quản lý đơn",
          url: "/mafa/bills",
          check: true,
        },
      ],
    };
  },
  watch: {
    site: function (value) {
      switch (value) {
        case "mafa":
          this.$router.push("/mafa");
          break;
        case "amia":
          this.$router.push("/amia");
          break;
        case "amiDesign":
          this.$router.push("/amidesign");
          break;
        default:
          break;
      }
    },
  },
  props: ["user"],
  methods: {
    signOut() {
      this.$store.dispatch("userModule/signOut");
      this.$router.push("/login");
    },
  },
  filters: {
    getName(value) {
      return value.split("@")[0].toUpperCase();
    },
  },
};
</script>

<style lang="scss">
.sidebar {
  position: relative;
  height: 100%;
  min-width: 170px;
  background-color: #52575d;
  text-align: center;
  &__header {
    background-color: #41444b;
    padding: 20px;
    text-align: center;
    h4 {
      font-size: 16px;
    }
  }
  &__menu {
    text-align: left;
    li {
      &:hover {
        background-color: #fddb3a;
      }
      a {
        margin-left: 10px;
        padding: 20px 10px;
        color: white;
      }
    }
  }
  button {
    position: absolute;
    width: 100%;
    bottom: 30px;
    left: 0;
    padding: 10px;
  }
}
</style>