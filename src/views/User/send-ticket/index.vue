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
        <div class="editor">
          <quill-editor
            v-model="ticket.description"
            ref="myQuillEditor"
            :options="editorOption"
            @change="onEditorChange($event)"
          >
          </quill-editor>
        </div>
      </div>
      <div class="button-group">
        <input type="submit" :value="$t('user.sendTicket.submitBtn')" />
        <button @click="init">{{ $t("user.sendTicket.clearBtn") }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    const toolbarOptions = [
      ["bold", "italic", "underline", "strike"], // toggled buttons

      [{ list: "ordered" }, { list: "bullet" }],

      [{ size: [] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
        ["image"],
    ];
    return {
      editorOption: {
        placeholder: this.$t("ticket.typeHere"),
        modules: {
          toolbar: toolbarOptions,
        },
      },
      ticket: {
        title: "",
        place: "",
        description: "",
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
      };
    },
    onEditorChange({ quill, html, text }) {
      this.ticket.description = html;
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
  components: {
    quillEditor,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/User/SendTicket.scss";
</style>