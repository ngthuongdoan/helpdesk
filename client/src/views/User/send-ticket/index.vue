<template>
  <div class="ticket__container">
    <form class="ticket__form" @submit.prevent="submitForm">
      <div class="ticket__info">
        <label for="title">Title</label>
        <br/>
        <input id="title" v-model="ticket.title" required type="text"/>
        <br/>
        <label for="place">Place</label>
        <br/>
        <input id="place" v-model="ticket.place" required type="text"/>
        <br/>
      </div>
      <div class="ticket__description">
        <label for="problem">Your problems</label>
        <br/>
        <textarea id="problem" v-model="ticket.description" required rows="8"/>
        <br/>
        <input
            ref="fileInput"
            accept="image/*"
            multiple
            required
            type="file"
            @change="uploadImage"
        />
      </div>
      <input type="submit" value="Submit"/>
      <button @click="init">Clear</button>
    </form>
  </div>
</template>

<script>
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
    uploadImage(e) {
      const images = e.target.files;
      images.forEach((i) => {
        let reader = new FileReader();
        reader.readAsDataURL(i);
        reader.onload = (evt) => {
          let img = evt.target.result;
          this.ticket.images.push(img);
        };
      });
    },
    submitForm() {
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
      this.$http
          .post("/ticket", this.ticket)
          .then(() => {
            this.$swal.close();
            this.$swal({
              title: "Success",
              icon: "success",
              allowOutsideClick: false,
            });
            this.init();
          })
          .catch((err) => {
            this.$swal({
              title: "Error",
              icon: "error",
              text: err,
            });
          });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/User/SendTicket.scss";
</style>