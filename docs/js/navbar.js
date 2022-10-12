function hideNavbar() {
  let el_autohide = document.querySelector(".autohide");
  let page = document.getElementById("page-container-and-footer");
  let navbar = document.querySelector(".navbar");
  page.style.paddingTop = navbar.offsetHeight + "px";

  el_autohide.classList.remove("scrolled-down");
  el_autohide.classList.add("scrolled-up");
  if (el_autohide) {
    let last_scroll_top = 0;
    window.addEventListener("scroll", function () {
      let scroll_top = window.scrollY;
      if (scroll_top < last_scroll_top) {
        el_autohide.classList.remove("scrolled-down");
        el_autohide.classList.add("scrolled-up");
      } else {
        el_autohide.classList.remove("scrolled-up");
        el_autohide.classList.add("scrolled-down");
      }
      last_scroll_top = scroll_top;
    });
  }
}

export default hideNavbar;
//# sourceMappingURL=navbar.js.map
