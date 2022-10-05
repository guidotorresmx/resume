document.addEventListener("DOMContentLoaded", function () {
	console.log("inside layout");

	let a = document.createElement("a");
	a.setAttribute("class", "nav-link btn btn-secondary");
	a.setAttribute("href", "./assets/GuidoTorres_Resume.pdf");
	a.setAttribute("target", "_blank");
	a.appendChild(document.createTextNode("Download"));

	let navbarButtonParent = document.getElementById("custom-button");
	navbarButtonParent.appendChild(a);
});
//# sourceMappingURL=layout.js.map
