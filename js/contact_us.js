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

//logout button
navlogout.addEventListener("click", () => {
  localStorage.removeItem("userloginid");
  localStorage.removeItem("adminloginid");
});

let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
let phone = document.getElementById("phone");
let email = document.getElementById("email");
let feedback = document.getElementById("feedback");
let btn = document.getElementById("sub-btn");

let u_feed = [];
btn.addEventListener("click", async () => {
  let newfeedback = {
    firstName: fname.value,
    lastName: lname.value,
    phone: phone.value,
    email: email.value,
    feedback: feedback.value,
  };
  //if blanks
  if (
    fname.value == "" ||
    lname.value == "" ||
    phone.value == "" ||
    email.value == "" ||
    feedback.value == ""
  ) {
    toasterdanger("Fill all the Fields");
    return false;
  }

  //replacing localstorage with mongodb
  const res = await fetch("http://localhost:3000/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newfeedback),
  });

  if (res.ok) {
    toastersuccess("We'll get back to you soon");
    fname.value = "";
    lname.value = "";
    phone.value = "";
    email.value = "";
    feedback.value = "";
  }
});

//admin panel logic
let adcomp = document.getElementById("adcomp");
if (localStorage.getItem("adminloginid") == 1) {
  adcomp.classList.remove("d-none");
} else {
  adcomp.classList.add("d-none");
}
