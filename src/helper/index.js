import Swal from "sweetalert2";
export default {
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
  removeBoostrap() {
    // noinspection SpellCheckingInspection
    let bootstrapStyle = document.getElementById("bsstyle");
    document.head.removeChild(bootstrapStyle);

    let bootstrap = document.getElementById("bootstrap");
    document.body.removeChild(bootstrap);
  },
  loading() {
    Swal.fire({
      title: "Please wait",
      showConfirmButton: false,
      allowOutsideClick: false,
      onOpen: () => {
        this.$swal.showLoading();
      },
    });
  },
};
