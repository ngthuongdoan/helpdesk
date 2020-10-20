<template>
  <div id="admin">
    <div v-if="overlay" class="overlay">
      <AddTechnician
        v-if="!update"
        @turn-off-overlay="overlay = false"
      ></AddTechnician>
      <UpdateInformation
        v-else
        :user="user"
        @turn-off-overlay="overlay = false"
      ></UpdateInformation>
    </div>
    <SideBar :user="user"></SideBar>
    <div class="content">
      <Notification
        @change-information="changeInformation"
        @add-technician="addTechnician"
      ></Notification>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/Admin/SideBar";
import Notification from "@/components/Notification";
import AddTechnician from "@/components/Admin/AddTechnician";
import UpdateInformation from "@/components/Admin/UpdateInformation";

export default {
  data() {
    return {
      overlay: false,
      update: false,
    };
  },
  mounted() {
    this.$helpers.importBoostrap();
  },
  beforeDestroy() {
    this.$helpers.removeBoostrap();
  },
  methods: {
    changeInformation() {
      this.overlay = true;
      this.update = true;
    },
    addTechnician() {
      this.overlay = true;
      this.update = false;
    },
    turnOffOverlay() {
      this.overlay = false;
    },
  },
  computed: {
    user() {
      return this.$store.getters["userModule/getUser"].data;
    },
  },
  components: {
    SideBar,
    Notification,
    AddTechnician,
    UpdateInformation,
  },
};
</script>

<style lang="scss">
@import "~@/assets/styles/MasterAdmin.scss";
</style>