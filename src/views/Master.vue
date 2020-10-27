<template>
  <div>
    <SendTicket
      v-if="isSend"
      @close="isSend = !isSend"
      @submit="submitForm"
    ></SendTicket>
    <Header @send-ticket="isSend = !isSend"></Header>
    <div class="container">
      <transition
        appear
        enter-active-class="animate__animated animate__fadeIn"
        mode="out-in"
      >
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import Header from "@/components/User/Header.vue";
import SendTicket from "@/components/User/SendTicket.vue";

export default {
  data() {
    return {
      isSend: false,
    };
  },
  methods: {
    /**
     * Hàm dùng để gửi ticket lên server
     * 1. Lấy thông tin về user gửi.
     * 2. Thực hiện gửi.
     * 3. Init lại các trường
     * @async
     */
    async submitForm(ticket) {
      try {
        const user = this.$store.getters["userModule/getUser"];
        ticket.userId = user.data.id;
        ticket.fullName = user.data.fullName;
        ticket.images = [];
        this.$helpers.loading(this.$i18n.locale);
        console.log(ticket);
        await this.$http.post("/ticket", ticket);
        await this.$swal.close();
        await this.$swal({
          title: this.$t("success"),
          icon: "success",
          allowOutsideClick: false,
        });
        this.isSend = !this.isSend;
      } catch (err) {
        this.$helpers.showError(err, this.$i18n.locale);
      }
    },
  },
  components: {
    Header,
    SendTicket,
  },
};
</script>