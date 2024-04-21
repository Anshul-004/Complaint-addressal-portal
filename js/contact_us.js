//login out button logic
let navlogin = document.getElementById("navlogin");
let navlogout = document.getElementById("navlogout");

if (localStorage.getItem("userloginid") != null|| localStorage.getItem("adminloginid") != null) {
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
btn.addEventListener("click", () => {
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
    return false;
  }

  let u_feed = localStorage.getItem("contact");
  u_feed = u_feed === null ? [] : JSON.parse(u_feed);

  u_feed.push(newfeedback);
  //   console.log(newfeedback); //current values

  localStorage.setItem("contact", JSON.stringify(u_feed));

  //resetting the fields
  fname.value = "";
  lname.value = "";
  phone.value = "";
  email.value = "";
  feedback.value = "";
});
