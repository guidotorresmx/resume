import addDownloadButton from "./download-btn.js";
import animateResume from "./animate-resume.js";

document.addEventListener("DOMContentLoaded", function () {
  if (
    window.location.href.includes("resume") ||
    window.location.href.includes("localhost")
  )
    addDownloadButton();
  animateResume();
});
