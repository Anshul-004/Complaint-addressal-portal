if (
  localStorage.getItem("userloginid") != 1 &&
  localStorage.getItem("adminloginid") != 1
) {
  toasterdanger("Login First");
  setTimeout(() => {
    window.location.replace("./login.html");
  }, 500);
}

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
let pin = document.getElementById("pin");
let email = document.getElementById("email");
let state = document.getElementById("state");
let city = document.getElementById("city");
let submit = document.getElementById("submit");
let cancel = document.getElementById("cancel");
let issue = document.getElementById("issue");

let oldInfo = [];
submit.addEventListener("click", async () => {
  let newInfo = {
    firstname: fname.value,
    lastName: lname.value,
    pin: pin.value,
    email: email.value,
    state: state.value,
    city: city.value,
    issue: issue.value,
    id: Date.now(),
  };

  if (
    fname.value == "" ||
    lname.value == "" ||
    pin.value == "" ||
    email.value == "" ||
    state.value == "" ||
    city.value == "" ||
    issue.value == ""
  ) {
    toasterdanger("Fill all the Fields");
    return false;
  }

  // local storage replaced with MongoDB

  const res = await fetch("http://localhost:3000/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newInfo),
  });

  //reseting values
  if (res.ok) toastersuccess("Complaint Registered Successfully");
  {
    fname.value = "";
    lname.value = "";
    pin.value = "";
    email.value = "";
    state.value = "";
    city.value = "";
    issue.value = "";
  }
});

cancel.addEventListener("click", () => {
  window.location.replace("./index.html");
});

//admin panel logic
let adcomp = document.getElementById("adcomp");
if (localStorage.getItem("adminloginid") == 1) {
  adcomp.classList.remove("d-none");
} else {
  adcomp.classList.add("d-none");
}
