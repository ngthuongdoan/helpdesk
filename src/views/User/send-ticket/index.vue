<template>
  <div class="ticket__container">
    <form class="ticket__form" @submit.prevent="submitForm">
      <div class="ticket__info">
        <label for="title">{{ $t("user.sendTicket.title")}}</label>
        <br />
        <input id="title" v-model="ticket.title" required type="text" />
        <br />
        <label for="place">{{ $t("user.sendTicket.place")}}</label>
        <br />
        <input id="place" v-model="ticket.place" required type="text" />
        <br />
      </div>
      <div class="ticket__description">
        <label for="problem">{{ $t("user.sendTicket.yourProblem")}}</label>
        <br />
        <textarea id="problem" v-model="ticket.description" required rows="8" />
        <br />
        <input
          ref="fileInput"
          accept="image/*"
          multiple
          required
          type="file"
          @change="uploadImage"
        />
      </div>
      <input type="submit" :value='$t("user.sendTicket.submitBtn")' />
      <button @click="init">{{ $t("user.sendTicket.clearBtn")}}</button>
    </form>
  </div>
</template>

<script>
import Compressor from "compressorjs";

export default {
  data() {
    return {
      ticket: {
        title: "",
        place: "",
        description: "",
        images: [],
      },
    };
  },
  methods: {
    /**
     * Tạo mới lại các data
     */
    init() {
      this.ticket = {
        title: "",
        place: "",
        description: "",
        images: [],
      };
      const input = this.$refs.fileInput;
      input.type = "text";
      input.type = "file";
    },
    /**
     * Nén hình ảnh lại dùng CompressorJS
     */
    uploadImage(e) {
      const images = e.target.files;
      images.forEach((i) => {
        new Compressor(i, {
          quality: 0.3,
          maxWidth: 640,
          maxHeight: 360,
          success: (result) => {
            let reader = new FileReader();
            reader.readAsDataURL(result);
            reader.onload = (evt) => {
              let img = evt.target.result;
              this.ticket.images.push(img);
            };
          },
          error(e) {
            console.error(e.message);
          },
        });
      });
      //----
    },
    /**
     * Hàm dùng để gửi ticket lên server
     * 1. Lấy thông tin về user gửi.
     * 2. Thực hiện gửi.
     * 3. Init lại các trường
     */
    async submitForm() {
      try {
        const user = this.$store.getters["userModule/getUser"];
        this.ticket.userId = user.data.id;
        this.ticket.fullName = user.data.fullName;
        this.$swal({
          title: "Please wait",
          showConfirmButton: false,
          allowOutsideClick: false,
          onOpen: () => {
            this.$swal.showLoading();
          },
        });
        await this.$http.post("/ticket", this.ticket);
        await this.$swal.close();
        await this.$swal({
          title: "Success",
          icon: "success",
          allowOutsideClick: false,
        });
        this.init();
      } catch (err) {
        this.$swal({
          title: "Error",
          icon: "error",
          text: err,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/User/SendTicket.scss";
</style>