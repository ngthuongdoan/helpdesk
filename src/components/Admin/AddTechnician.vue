<!--suppress ES6MissingAwait -->
<template>
  <form style="padding: 30px" @submit.prevent="addInformation">
    <div class="form-group">
      <label for="full-name">{{ $t('admin.addTechnician.fullName') }}</label>
      <input
          id="full-name"
          v-model="technician.fullName"
          class="form-control"
          required
          type="text"
      />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">{{ $t('admin.addTechnician.email') }}</label>
      <input
          id="exampleInputEmail1"
          v-model="technician.email"
          aria-describedby="emailHelp"
          class="form-control"
          required
          type="email"
      />
    </div>
    <div class="form-group">
      <label for="username">{{ $t('admin.addTechnician.username') }}</label>
      <input
          id="username"
          v-model="technician.username"
          class="form-control"
          required
          type="text"
      />
    </div>
    <div class="form-group">
      <label for="password">{{ $t('admin.addTechnician.password') }}</label>
      <input
          id="password"
          v-model="technician.password"
          class="form-control"
          required
          type="password"
      />
    </div>
    <div class="form-group">
      <label for="confirm-password">{{ $t('admin.addTechnician.confirmPassword') }}</label>
      <input
          id="confirm-password"
          ref="confirmPassword"
          v-model="confirm"
          class="form-control"
          required
          type="password"
      />
    </div>
    <input class="btn btn-primary" type="submit" :value="$t('admin.addTechnician.add')"/>
    <button
        class="btn btn-secondary"
        style="margin-left: 20px"
        type="button"
        @click="turnOffOverlay"
    >
      {{ $t('admin.addTechnician.back') }}
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      technician: {
        fullName: "",
        username: "",
        email: "",
        password: "",
        role: "technician",
      },
      confirm: "",
    };
  },
  methods: {
    init() {
      this.technician = Object.assign({},{
        fullName: "",
        username: "",
        email: "",
        password: "",
        role: "technician",
      });
      this.confirm = "";
    },
    async addInformation() {
      try {
        if (this.technician.password !== this.confirm)
          throw new Error("Password not match");
        const chose = await this.$helpers.confirmSwal("Add")
        if (chose.isConfirmed) {
          await this.$http.post("/user", this.technician);
          this.$swal("Added!", "", "success");
          this.turnOffOverlay();
        }
      } catch (err) {
        this.$helpers.showError(err)
      }
    },
    turnOffOverlay() {
      this.init();
      this.$emit("turn-off-overlay");
    },
  },
};
</script>
