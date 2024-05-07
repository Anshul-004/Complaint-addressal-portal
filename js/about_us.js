//login out button logic
let navlogin = document.getElementById("navlogin");
let navlogout = document.getElementById("navlogout");

if (
  localStorage.getItem("userloginid") != null ||
  localStorage.getItem("adminloginid") != null
) {
  navlogin.classList.add("d-none");
  navlogout.classList.remove("d-none");
} else {
  navlogin.classList.remove("d-none");
  navlogout.classList.add("d-none");
}

//admin panel logic
let adcomp = document.getElementById("adcomp");
if (localStorage.getItem("adminloginid") != null) {
  adcomp.classList.remove("d-none");
} else {
  adcomp.classList.add("d-none");
}

//logout button
navlogout.addEventListener("click", () => {
  localStorage.removeItem("userloginid");
  localStorage.removeItem("adminloginid");
  toastersuccess("Logged Out");
});
