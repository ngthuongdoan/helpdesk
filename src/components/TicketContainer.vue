<template>
  <div class="ticket">
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div v-if="overlay" class="overlay" @click="overlay = !overlay">
        <img :src="img" alt="imgOverlay" />
      </div>
    </transition>
    <div class="ticket__container custom-scrollbar">
      <div class="ticket__information">
        <table>
          <thead>
            <th colspan="2">
              {{ $t("ticket.header")
              }}<span id="ticketId">#{{ ticket.id }}</span>
            </th>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>{{ $t("ticket.title") }}:</b>
                {{ ticket.title.toUpperCase() }}
              </td>
              <td>
                <b>{{ $t("ticket.assign") }}:</b> {{ technicianName }}
              </td>
            </tr>
            <tr>
              <td>
                <b>{{ $t("ticket.startDate") }}:</b>
                {{ ticket.startDate | changeDate }}
              </td>
              <td>
                <b>{{ $t("ticket.status") }}:</b>
                {{ ticket.status | getStatusName($i18n.locale) }}
                {{ $t("ticket.at") }}
                {{ ticket.status | getStatusTime }}
              </td>
            </tr>
            <tr>
              <td>
                <b>{{ $t("ticket.endDate") }}:</b>
                {{ ticket.endDate | changeDate }}
              </td>
              <td>
                <b>{{ $t("ticket.place") }}:</b> {{ ticket.place }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <img
        v-for="img in ticket.images"
        :key="img"
        :src="img"
        alt="image"
        class="ticket__img"
        @click="showImage(img)"
      />
      <div class="ticket__conversation">
        <Comment v-for="id in ticket.comment" :id="id" :key="id"></Comment>
        <div class="ticket__box">
          <form @submit.prevent="addNewComment">
            <textarea
              v-model="newComment"
              :disabled="isClose"
              :placeholder="$t('ticket.typeHere')"
              cols="30"
              required
              rows="3"
            ></textarea>
            <div v-if="isAdmin" class="form-group">
              <label for="exampleFormControlSelect1">{{
                $t("ticket.assignTo")
              }}</label>
              <select
                id="exampleFormControlSelect1"
                v-model="technicianId"
                :disabled="isClose"
                class="form-control"
                @change="assignTo"
              >
                <option
                  v-for="technician in technicians"
                  :key="technician.id"
                  :value="technician.id"
                >
                  {{ technician.fullName }}
                </option>
              </select>
            </div>
            <input
              :disabled="isClose"
              :value="$t('ticket.comment')"
              class="btn btn-success"
              type="submit"
            />
            <button class="btn btn-secondary" type="button" @click="back">
              {{ $t("ticket.back") }}
            </button>
            <button
              :disabled="isClose"
              class="btn btn-light"
              type="button"
              @click="closeTicket"
            >
              <img alt="" src="@/assets/icon/error_red.png" width="20px" />
              {{ $t("ticket.close") }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<!--suppress ES6MissingAwait -->
<script>
import Comment from "@/components/Comment";

export default {
  data() {
    return {
      ticket: null,
      technicians: [],
      isClose: false,
      technicianId: "",
      technicianName: "",
      overlay: false,
      img: "",
      newComment: "",
      isFetching: true,
      isAdmin: false,
    };
  },
  props: {
    role: {
      type: String,
      required: true,
    },
  },
  methods: {
    async getData() {
      this.isFetching = true;
      try {
        this.interval = setInterval(async () => {
          const tickets = await this.$http.get(
            "/ticket/" + this.$route.params.id
          );
          this.ticket = tickets.data;
          this.technicianName =
            this.ticket.technicianName === ""
              ? "Not Assigned"
              : this.ticket.technicianName;
          this.technicianId = this.ticket.technicianId
            ? this.ticket.technicianId
            : "";
          this.isClose =
            this.ticket.status[this.ticket.status.length - 1].name.en ===
            "Closed";
          //Dành cho admin
          if (this.role === "admin") {
            this.isAdmin = true;
            const technicians = await this.$http.get("/user/role/technician");
            this.technicians = technicians.data;
          }
          //----

          this.isFetching = false;
        }, 2000);
      } catch (err) {
        this.$helpers.showError(err, this.$i18n.locale);
      }
    },
    /**
     * Hàm dùng để đóng ticket, chuyển trạng thái ticket sang "Closed"]
     * và thêm end date cho ticket
     */
    async closeTicket() {
      try {
        const chose = await this.$helpers.confirmSwal(
          this.$t("close"),
          this.$i18n.locale
        );

        if (chose.isConfirmed) {
          const status = {
            name: "Closed",
            time: new Date().toISOString(),
          };
          this.ticket.status.push(status);
          this.ticket.modifiedBy = this.$store.getters[
            "userModule/getUser"
          ].data.id;

          this.$helpers.loading(this.$i18n.locale);
          await this.$http.put("/ticket/" + this.$route.params.id, this.ticket);
          await this.$swal(this.$t("closed"), "", "success");
          await this.back();
        }
      } catch (err) {
        this.$helpers.showError(err, this.$i18n.locale);
      }
    },
    /**
     * Hàm dùng thêm mới 1 comment
     */
    async addNewComment() {
      try {
        const comment = {
          fullName: this.$store.getters["userModule/getUser"].data.fullName,
          userId: this.$store.getters["userModule/getUser"].data.id,
          content: this.newComment,
        };
        this.newComment = "";
        await this.$http.put(
          "/comment/ticket/" + this.$route.params.id,
          comment
        );
        await this.getData();
      } catch (err) {
        this.$helpers.showError(err, this.$i18n.locale);
      }
    },
    /**
     * Trở về trang chính
     */
    back() {
      this.$router.back();
    },
    /**
     * Lấy tên technician để assign
     * @param {Array} technicians - Danh sách technician
     * @param {String} technicianId - Mã technician
     * @returns {string} - Tên của technician
     */
    getTechniciansName(technicianId) {
      const name = this.technicians.filter((tech) => tech.id === technicianId);
      return name.length !== 0 ? name[0].fullName : "";
    },
    /**
     * Hiển thị hình ảnh
     * @param {String} img - Đường link ảnh được hiển thị
     */
    showImage(img) {
      this.overlay = true;
      this.img = img;
    },
    /**
     * Chỉ định cho một technician
     * @returns {Promise<void>}
     */
    async assignTo() {
      clearInterval(this.interval);

      try {
        const chose = await this.$helpers.confirmSwal(
          this.$t("assign"),
          this.$i18n.locale
        );
        if (chose.isConfirmed) {
          this.ticket.technicianId = this.technicianId;
          this.ticket.technicianName = this.getTechniciansName(
            this.ticket.technicianId
          );
          const status = {
            name: "Assigned",
            time: new Date().toISOString(),
          };
          this.ticket.status.push(status);
          this.ticket.modifiedBy = this.$store.getters[
            "userModule/getUser"
          ].data.id;
          this.$helpers.loading(this.$i18n.locale);
          await this.$http.put("/ticket/" + this.$route.params.id, this.ticket);
          await this.$swal(this.$t("updated"), "", "success");
          await this.getData();
        } else {
          await this.getData();
        }
      } catch (err) {
        this.$helpers.showError(err, this.$i18n.locale);
      }
    },
  },
  watch: {
    isFetching() {
      if (!this.isFetching) this.$swal.close();
    },
  },
  filters: {
    changeDate(value) {
      return value ? new Date(value).toLocaleString() : "";
    },
    getStatusTime(value) {
      return value
        ? new Date(value[value.length - 1].time).toLocaleString()
        : "";
    },
    getStatusName: (value, lang) => {
      return value ? value[value.length - 1].name[lang] : "";
    },
  },
  async created() {
    this.$helpers.loading(this.$i18n.locale);
    this.getData();
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  components: {
    Comment,
  },
};
</script>

