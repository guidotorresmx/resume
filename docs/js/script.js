import addDownloadButton from "./downloadbtn.js";
import hideNavbar from "./navbar.js";
import animateResume from "./animate-resume.js"

document.addEventListener("DOMContentLoaded", function () {
  if (
    window.location.href.includes("resume") ||
    window.location.href.includes("localhost")
  )
    addDownloadButton();
  hideNavbar();
  animateResume();
});
//# sourceMappingURL=script.js.map
