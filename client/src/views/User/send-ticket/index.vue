<template>
  <div class="ticket__container">
    <form class="ticket__form" @submit.prevent="submitForm">
      <div class="ticket__info">
        <label for>Title</label>
        <br />
        <input type="text" v-model="ticket.title" required />
        <br />
        <label for>Place</label>
        <br />
        <input type="text" v-model="ticket.place" required />
        <br />
      </div>
      <div class="ticket__detail">
        <label for>Your problems</label>
        <br />
        <textarea rows="8" v-model="ticket.detail" required />
        <br />
        <input
          type="file"
          accept="image/*"
          @change="uploadImage"
          multiple
          required
        />
      </div>
      <input type="submit" value="Submit" />
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
        userID: "",
        place: "",
        detail: "",
        images: [],
      },
    };
  },
  methods: {
    init() {
      this.ticket = {
        title: "",
        userID: "",
        place: "",
        detail: "",
        images: [],
      };
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
      this.ticket.userID = user.data.username;
      this.$http
        .post("/ticket", this.ticket)
        .then((res) => {
          this.$swal({
            title: "Success",
            icon: "success",
          });
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