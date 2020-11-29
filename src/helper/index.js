import Swal from "sweetalert2";

const en = {
  error: "Error",
  loading: "Please wait",
  confirm: {
    title: "Are you sure about this?",
    content: "You won't be able to revert this!",
  },
  cancel: "Cancel",
};
const vi = {
  error: "Lỗi",
  loading: "Đợi một chút",
  confirm: {
    title: "Bạn có chắc không?",
    content: "Bạn sẽ không thể hoàn tác!",
  },
  cancel: "Trở về",
};

const language = { en, vi };
export default {
  /**
   * Import Bootstrap vào page
   */
  importBoostrap() {
    let bootstrapStyle = document.createElement("link");
    bootstrapStyle.setAttribute(
      "href",
      "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    );
    bootstrapStyle.setAttribute("rel", "stylesheet");
    // noinspection SpellCheckingInspection
    bootstrapStyle.setAttribute("id", "bsstyle");

    let bootstrap = document.createElement("script");
    bootstrap.setAttribute("id", "bootstrap");
    bootstrap.setAttribute(
      "src",
      "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
    );

    document.head.appendChild(bootstrapStyle);
    document.body.appendChild(bootstrap);
  },
  /**
   * Remove Bootstrap khỏi page
   */
  removeBoostrap() {
    // noinspection SpellCheckingInspection
    let bootstrapStyle = document.getElementById("bsstyle");
    document.head.removeChild(bootstrapStyle);

    let bootstrap = document.getElementById("bootstrap");
    document.body.removeChild(bootstrap);
  },
  /**
   * Hiển thị popup loading data
   */
  loading(lang) {
    Swal.fire({
      title: language[lang].loading,
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 10000,
      onOpen: () => {
        Swal.showLoading();
      },
    });
  },
  /**
   * Hiển thị lỗi
   * @param {Error} error - Object lỗi gặp phải
   */
  showError(error, lang) {
    Swal.fire({
      title: language[lang].error,
      icon: "error",
      text: error.message,
    });
    console.error(error);
  },
  /**
   * Hiện bảng cảnh báo
   * @param {String} confirmText
   * @returns {Promise<SweetAlertResult<Awaited<unknown>>>}
   */
  confirmSwal(confirmText, lang) {
    return Swal.fire({
      title: language[lang].confirm.title,
      text: language[lang].confirm.content,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmText,
      cancelButtonText: language[lang].cancel,
    });
  },
  /**
   * Phân trang cho 1 khối dữ liệu
   * @param {Number} length - Độ dài dữ liệu cần phân trang
   * @param {Number} perPage - Số dữ liệu mỗi trang
   * @returns {Number} - Số trang được phân
   */
  setPages(length, perPage) {
    if (length === 0) return;
    let pages = [];
    let numberOfPages = Math.ceil(length / perPage);
    for (let index = 1; index <= numberOfPages; index++) {
      pages.push(index);
    }
    return pages;
  },
  /**
   * Phân dữ liệu ra từng trang
   * @param {Array} tickets - Dữ liệu
   * @param {Number} page - Trang hiện tại
   * @param {Number} perPage - Số dữ liệu mỗi trang
   * @returns {Array} - Dữ liệu được phân
   */
  paginate(tickets, page, perPage) {
    let from = page * perPage - perPage;
    let to = page * perPage;
    return tickets.slice(from, to);
  },
};
