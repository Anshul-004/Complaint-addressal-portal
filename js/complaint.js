if (
  localStorage.getItem("userloginid") == null &&
  localStorage.getItem("adminloginid") == null
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
submit.addEventListener("click", () => {
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
    toasterdanger("Fill out all the fields")
    return false;
  }

  let oldInfo = localStorage.getItem("complaints");
  oldInfo = oldInfo === null ? [] : JSON.parse(oldInfo);

  oldInfo.push(newInfo);

  localStorage.setItem("complaints", JSON.stringify(oldInfo));
  toastersuccess("Complaint Registered")

  //reseting values
  fname.value = "";
  lname.value = "";
  pin.value = "";
  email.value = "";
  state.value = "";
  city.value = "";
  issue.value = "";
});

cancel.addEventListener("click", () => {
  window.location.replace("./index.html");
});
