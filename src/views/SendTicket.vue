<template>
  <div class="ticket__container">
    <form class="ticket__form" @submit.prevent="submitForm">
      <div class="ticket__info">
        <label for>Your name</label>
        <br />
        <input type="text" v-model="ticket.customerName" required />
        <br />
        <label for>Employee ID</label>
        <br />
        <input type="text" v-model="ticket.idCustomer" required />
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
        <input type="file" accept="image/jpeg" @change="uploadImage" required />
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
        customerName: "",
        idCustomer: "",
        place: "",
        detail: "",
        image: null,
      },
    };
  },
  methods: {
    init() {
      this.ticket = {
        customerName: "",
        idCustomer: "",
        place: "",
        detail: "",
        image: null,
      };
    },
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.ticket.image = e.target.result;
      };
    },
    submitForm() {
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
.ticket {
  &__container {
    width: 100%;
    height: 100vh;
    label {
      color: white;
    }
    input[type="text"],
    textarea {
      width: 500px;
      padding: 12px 20px;
      margin: 10px 0;
      display: inline-block;
      border: 2px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;
      transition: 0.2s all ease-in-out;
      outline: none;
      &:focus {
        border: 2px solid #eccd59;
        box-shadow: 1px 1px 10px #eccd59;
      }
    }
    input[type="file"] {
      padding: 12px 20px;
      color: white;
      width: 100%;
    }
    input[type="submit"],
    button {
      align-self: center;
      justify-self: right;
      width: 50%;
      background-color: #eccd59;
      font-weight: bold;
      font-size: 14px;
      padding: 14px 20px;
      margin: 30px 0;
      border: none;
      border-radius: 4px;
      transition: 0.2s all ease-in-out;
      cursor: pointer;
      &:hover {
        background: #b4942b;
      }
      &:focus {
        border: none;
        outline: none;
      }
    }
    button {
      justify-self: left;
      background: #ccc;
      &:hover {
        background: rgb(124, 123, 123);
      }
      &:focus {
        border: none;
        outline: none;
      }
    }
  }
  &__form {
    background-color: rgba(0, 0, 0, 0.603);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 80% 20%;
    grid-column-gap: 50px;
  }
}
</style>