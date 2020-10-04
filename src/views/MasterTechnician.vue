<template>
  <div id="admin">
    <div v-if="overlay" class="overlay">
      <UpdateInformation
        :user="user.data"
        @turn-off-overlay="overlay = false"
      ></UpdateInformation>
    </div>
    <div class="content">
      <Notification @change-information="turnOnOverlay"></Notification>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/Admin/SideBar";
import Notification from "@/components/Notification";
import UpdateInformation from "@/components/Admin/UpdateInformation";

export default {
  data() {
    return {
      overlay: false,
    };
  },
  mounted() {
    this.$helpers.importBoostrap();
  },
  destroyed() {
    this.$helpers.removeBoostrap();
  },
  methods: {
    turnOnOverlay() {
      this.overlay = true;
    },
    turnOffOverlay() {
      this.overlay = false;
    },
  },
  computed: {
    user() {
      return this.$store.getters["userModule/getUser"];
    },
  },
  components: {
    SideBar,
    Notification,
    UpdateInformation,
  },
};
</script>

<style lang="scss">
@import "~@/assets/styles/MasterAdmin.scss";
#admin {
  display: block;
}
.content {
  margin: 0;
  height: 100%;
}
</style>