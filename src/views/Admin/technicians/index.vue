<template>
  <div class="technician__container">
    <div v-if="overlay" class="overlay">
      <form @submit.prevent="updateInformation">
        <div class="form-group">
          <label for="full-name">{{ $t('admin.technicians.updateInformation.fullName') }}</label>
          <input
              id="full-name"
              v-model="newTechnician.fullName"
              :disabled="!isChangeInformation"
              class="form-control"
              required
              type="text"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">{{ $t('admin.technicians.updateInformation.email') }}</label>
          <input
              id="exampleInputEmail1"
              v-model="newTechnician.email"
              :disabled="!isChangeInformation"
              aria-describedby="emailHelp"
              class="form-control"
              required
              type="email"
          />
        </div>
        <div class="form-group">
          <label for="password">{{
              $t('admin.technicians.updateInformation.newPassword')
            }}</label>
          <input
              id="password"
              v-model="newTechnician.password"
              :disabled="!isChangeInformation"
              class="form-control"
              required
              type="password"
          />
        </div>
        <div class="form-group">
          <label for="confirm-password">{{ $t('admin.technicians.updateInformation.confirmPassword') }}</label>
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
          {{ $t('admin.technicians.updateInformation.changeInformation') }}
        </button>
        <input
            v-if="isChangeInformation"
            :value="$t('admin.technicians.updateInformation.update')"
            class="btn btn-primary"
            type="submit"
        />
        <button
            class="btn btn-secondary"
            style="margin-left: 20px"
            type="button"
            @click="turnOffOverlay"
        >
          {{ $t('admin.technicians.updateInformation.back') }}
        </button>
        <button
            class="btn btn-danger"
            style="margin-left: 20px"
            type="button"
            @click="deleteTechnician"
        >
          {{ $t('admin.technicians.updateInformation.delete') }}
        </button>
      </form>
    </div>
    <Pagination
        v-if="isOnePage"
        :data-length="technicians.length"
        :page="page"
        :pages="pages"
        :per-page="perPage"
        @changePage="page = $event"
        @next="page++"
        @previous="page--"
    ></Pagination>
    <div v-if="displayedTechnicians.length === 0">
      <p id="noTechnician">{{ $t("admin.technicians.noTechnician") }}</p>
    </div>
    <table v-else>
      <thead>
      <tr>
        <th>{{ $t("admin.technicians.id") }}</th>
        <th>{{ $t("admin.technicians.fullName") }}</th>
        <th>{{ $t("admin.technicians.username") }}</th>
        <th>{{ $t("admin.technicians.email") }}</th>
      </tr>
      </thead>
      <Technician
          v-for="technician in displayedTechnicians"
          :key="technician.id"
          :technician="technician"
          @change-information="changeInformation"
      ></Technician>
    </table>
  </div>
</template>

<!--suppress ExceptionCaughtLocallyJS, ES6MissingAwait -->
<script>
import Technician from "@/components/Admin/Technician.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  data() {
    return {
      page: 1,
      perPage: 15,
      pages: [],
      technicians: [],
      overlay: false,
      isChangeInformation: false,
      confirm: "",
      newTechnician: {},
      isFetching: true,
    };
  },
  components: {
    Technician,
    Pagination,
  },
  methods: {
    changeInformation(event) {
      this.overlay = true;
      this.newTechnician = Object.assign({}, event);
    },
    turnOffOverlay() {
      this.overlay = false;
      this.isChangeInformation = false;
      this.confirm = "";
    },
    async updateInformation() {
      try {
        if (this.newTechnician.password !== this.confirm)
          throw new Error("Password not match");
        const chose = await this.$helpers.confirmSwal("Update");

        if (chose.isConfirmed) {
          this.$helpers.loading();
          await this.$http.put(
              "/user/" + this.newTechnician.id,
              this.newTechnician
          );
          this.$swal("Updated!", "", "success");
          this.overlay = false;
          this.technician = {};
        }
      } catch (err) {
        this.$helpers.showError(err)
      }
    },
    async deleteTechnician() {
      try {
        const chose = await this.$helpers.confirmSwal("Delete");
        if (chose.isConfirmed) {
          this.$helpers.loading();
          await this.$http.delete("/user/" + this.technician.id);

          this.$swal("Deleted!", "", "success");
          this.overlay = false;
          this.technician = {};
          this.$forceUpdate();
        }
      } catch (err) {
        this.$helpers.showError(err)
      }
    },
    async getData() {
      this.$helpers.loading();
      try {
        this.interval = setInterval(async () => {
          const res = await this.$http.get("/user/role/technician");
          this.technicians = res.data;
          this.isFetching = false;
        }, 2000);
      } catch (err) {
        this.$helpers.showError(err);
      }
    },
  },
  computed: {
    displayedTechnicians() {
      return this.technicians.length !== 0
          ? this.$helpers.paginate(this.technicians, this.page, this.perPage)
          : [];
    },
    isOnePage() {
      return this.pages.length > 1;
    },
  },
  watch: {
    technicians() {
      this.$helpers.setPages(this.technicians.length, this.perPage);
    },
    isFetching() {
      this.$swal.close();
    },
  },
  created() {
    this.getData();
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + "...";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/Admin/Technicians.scss";
</style>