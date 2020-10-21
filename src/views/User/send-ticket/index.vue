<template>
  <div class="ticket__container">
    <form class="ticket__form" @submit.prevent="submitForm">
      <div class="ticket__info">
        <label for="title">{{ $t("user.sendTicket.title") }}</label>
        <br />
        <input id="title" v-model="ticket.title" required type="text" />
        <br />
        <label for="place">{{ $t("user.sendTicket.place") }}</label>
        <br />
        <input id="place" v-model="ticket.place" required type="text" />
        <br />
      </div>
      <div class="ticket__description">
        <label for="problem">{{ $t("user.sendTicket.yourProblem") }}</label>
        <br />
        <textarea id="problem" v-model="ticket.description" required rows="8" />
        <br />
        <label for="file-upload" class="custom-file-upload">
          {{ uploadLabel }}
        </label>
        <input
          id="file-upload"
          ref="fileInput"
          accept="image/*"
          multiple
          type="file"
          @change="uploadImage"
        />
      </div>
      <input type="submit" :value="$t('user.sendTicket.submitBtn')" />
      <button @click="init">{{ $t("user.sendTicket.clearBtn") }}</button>
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
      uploadLabel: this.$tc("user.sendTicket.upload", 0),
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
      this.uploadLabel = this.$tc("user.sendTicket.upload", 0);

      input.type = "text";
      input.type = "file";
    },
    /**
     * Nén hình ảnh lại dùng CompressorJS
     */
    uploadImage(e) {
      const images = e.target.files;
      this.uploadLabel = this.$tc("user.sendTicket.upload", images.length);
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
    },
    /**
     * Hàm dùng để gửi ticket lên server
     * 1. Lấy thông tin về user gửi.
     * 2. Thực hiện gửi.
     * 3. Init lại các trường
     * @async
     */
    async submitForm() {
      try {
        const user = this.$store.getters["userModule/getUser"];
        this.ticket.userId = user.data.id;
        this.ticket.fullName = user.data.fullName;
        this.$helpers.loading(this.$i18n.locale);
        await this.$http.post("/ticket", this.ticket);
        await this.$swal.close();
        await this.$swal({
          title: this.$t("success"),
          icon: "success",
          allowOutsideClick: false,
        });
        this.init();
      } catch (err) {
        this.$helpers.showError(err, this.$i18n.locale);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/User/SendTicket.scss";
</style>