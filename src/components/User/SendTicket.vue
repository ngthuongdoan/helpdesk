<template>
  <div class="ticket__container custom-scrollbar">
    <form class="ticket__form" @submit.prevent="submit">
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
            @ready="onEditorReady($event)"
          >
          </quill-editor>
          <input
            type="file"
            accept="image/*"
            ref="imageInput"
            style="display: none"
          />
        </div>
      </div>
      <div class="button-group">
        <input type="submit" :value="$t('user.sendTicket.submitBtn')" />
        <button @click="close">{{ $t("user.sendTicket.closeBtn") }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
import Compressor from "compressorjs";

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
    close() {
      this.init();
      this.$emit("close");
    },
    submit() {
      this.$emit("submit", this.ticket);
    },
    /**
     * Kích hoạt chọn hình
     *
     */
    selectLocalImage() {
      const input = this.$refs.imageInput;
      input.click();
      input.onchange = () => {
        const file = input.files[0];
        // Nén hình
        new Compressor(file, {
          quality: 0.3,
          maxWidth: 640,
          maxHeight: 360,
          success: (result) => {
            let reader = new FileReader();
            reader.readAsDataURL(result);
            reader.onload = (evt) => {
              let img = evt.target.result;
              this.uploadImage(img).then((url) => {
                this.insertToEditor(url.data);
                input.type = "text";
                input.type = "file";
              });
            };
          },
          error(e) {
            console.error(e.message);
          },
        });
      };
    },
    /**
     * Thêm image vào editor.
     *
     * @param {String} img - Base64
     */
    insertToEditor(img) {
      const range = this.$refs.myQuillEditor.quill.getSelection();
      this.$refs.myQuillEditor.quill.insertEmbed(range.index, "image", img);
    },
    onEditorReady(quill) {
      let toolbar = quill.getModule("toolbar");
      toolbar.addHandler("image", this.selectLocalImage);
    },
    onEditorChange({ quill, html, text }) {
      this.ticket.description = html;
    },
    async uploadImage(img) {
      const url = await this.$http.post("/image", { image: img });
      console.log(url, img);
      return url;
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