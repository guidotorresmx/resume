import addDownloadButton from "./downloadbtn.js";
import hideNavbar from "./navbar.js";

document.addEventListener("DOMContentLoaded", function () {
  if (
    window.location.href.includes("resume") ||
    window.location.href.includes("localhost")
  )
    addDownloadButton();
  hideNavbar();
});
//# sourceMappingURL=script.js.map
