<template>
  <div id="admin">
    <SideBar :user="user.data"></SideBar>
    <div class="content">
      <Notification></Notification>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SideBar from "@/components/Admin/SideBar";
import Notification from "@/components/Admin/Notification";

export default {
  computed: {
    ...mapGetters({
      user: "userModule/getUser",
    }),
  },
  components: {
    SideBar,
    Notification,
  },
  mounted() {
    let bootstrapStyle = document.createElement("link");
    bootstrapStyle.setAttribute(
      "href",
      "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    );
    bootstrapStyle.setAttribute("rel", "stylesheet");
    bootstrapStyle.setAttribute("id", "bsstyle");

    let jQuery = document.createElement("script");
    jQuery.setAttribute("id", "jquery");
    jQuery.setAttribute(
      "src",
      "https://code.jquery.com/jquery-3.5.1.slim.min.js"
    );

    let popperjs = document.createElement("script");
    popperjs.setAttribute("id", "popperjs");
    popperjs.setAttribute(
      "src",
      "https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
    );

    let bootstrap = document.createElement("script");
    bootstrap.setAttribute("id", "bootstrap");
    bootstrap.setAttribute(
      "src",
      "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
    );

    document.head.appendChild(bootstrapStyle);
    document.body.appendChild(jQuery);
    document.body.appendChild(popperjs);
    document.body.appendChild(bootstrap);
  },
  beforeDestroy() {
    let bootstrapStyle = document.getElementById("bsstyle");
    document.head.removeChild(bootstrapStyle);

    let jQuery = document.getElementById("jquery");
    document.body.removeChild(jQuery);

    let popperjs = document.getElementById("popperjs");
    document.body.removeChild(popperjs);

    let bootstrap = document.getElementById("bootstrap");
    document.body.removeChild(bootstrap);
  },
};
</script>

<style lang="scss">
@import "~@/assets/styles/MasterAdmin.scss";
</style>