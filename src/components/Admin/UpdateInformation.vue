<!--suppress JSUnresolvedVariable, ES6MissingAwait -->
<template>
  <form @submit.prevent="updateInformation">
    <div class="form-group">
      <label for="full-name">{{ $t("admin.updateInformation.fullName")}}</label>
      <input
          id="full-name"
          v-model="newUser.fullName"
          :disabled="!isChangeInformation"
          class="form-control"
          required
          type="text"
      />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">{{ $t("admin.updateInformation.email")}}</label>
      <input
          id="exampleInputEmail1"
          v-model="newUser.email"
          :disabled="!isChangeInformation"
          aria-describedby="emailHelp"
          class="form-control"
          required
          type="email"
      />
    </div>
    <div class="form-group">
      <label for="password">{{ $t("admin.updateInformation.newPassword")}}</label>
      <input
          id="password"
          v-model="newUser.password"
          :disabled="!isChangeInformation"
          class="form-control"
          required
          type="password"
      />
    </div>
    <div class="form-group">
      <label for="confirm-password">{{ $t("admin.updateInformation.confirmPassword")}}</label>
      <input
          id="confirm-password"
          ref="confirmPassword"
          v-model="confirm"
          :disabled="!isChangeInformation"
          class="form-control"
          required
          type="password"
      />
    </div>
    <button
        v-if="!isChangeInformation"
        class="btn btn-primary"
        type="button"
        @click="isChangeInformation = !isChangeInformation"
    >
      {{ $t("admin.updateInformation.changeInformation")}}
    </button>
    <input
        v-if="isChangeInformation"
        class="btn btn-primary"
        type="submit"
        :value="$t('admin.updateInformation.update')"
    />
    <button
        class="btn btn-secondary"
        style="margin-left: 20px"
        type="button"
        @click="turnOffOverlay"
    >
      {{ $t("admin.updateInformation.back")}}
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      isChangeInformation: false,
      confirm: "",
    };
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async updateInformation() {
      try {
        if (this.newUser.password !== this.confirm)
          throw new Error("Password not match");
        const chose = await this.$swal({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Update",
        });
        if (chose.isConfirmed) {
          await this.$http.put("/user/" + this.user.id, this.newUser);

          this.$swal("Updated!", "", "success");
          this.$store.dispatch("userModule/signOut");
        }
      } catch (err) {
        this.$swal({
          icon: "error",
          title: err.message,
        });
        console.log(err);
      }
    },
    turnOffOverlay() {
      this.isChangeInformation = false;
      this.newUser = Object.assign({});
      this.$emit("turn-off-overlay");
    },
  },
  created() {
    this.newUser = Object.assign({}, this.$props.user);
  },
};
</script>