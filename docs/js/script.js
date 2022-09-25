
let navbar
let page 
let download
let prevScroll = 0;
let scrollUpAcc = 0;
let scrollFunctionActive = true;
window.onscroll = function () {
    scrollFunction();
};
window.onload = function () {
    navbar = document.getElementById("navbar")
    page = document.getElementById("page-container-and-footer")
    download = document.getElementById("download")
    
}

function scrollFunction() {
    if(navbar && page && scrollFunctionActive)
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            if (window.scrollY > prevScroll){
                navbar.style.top = "0px";
                download.style.top = 64+16*3 + "px";
            }
            else{
                scrollUpAcc += prevScroll-window.scrollY;
                page.style.top = Math.min(64, scrollUpAcc) + "px"
                if (page.style.top == "64px")
                    scrollFunctionActive = false;
            }
            prevScroll = window.scrollY;
        } 
}
//# sourceMappingURL=script.js.map
