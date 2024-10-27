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

//admin panel logic
let adcomp = document.getElementById("adcomp");
if (localStorage.getItem("adminloginid") == 1) {
  adcomp.classList.remove("d-none");
} else {
  adcomp.classList.add("d-none");
}

//Complaint Cards
let card = document.getElementById("parent");

//localstorage to MongoDB
const getissues = async () => {
  let req = await fetch("http://localhost:3000/");
  let issues = await req.json();
//   console.log(issues);
  let issueId = localStorage.getItem("updateid");
  if (issueId) {
    let issue = issues.find((issue) => issue.id == issueId);
    if (issue) {
      document.getElementById("fname").value = issue.firstname;
      document.getElementById("lname").value = issue.lastName;
      document.getElementById("email").value = issue.email;
      document.getElementById("state").value = issue.state;
      document.getElementById("city").value = issue.city;
      document.getElementById("pin").value = issue.pin;
      document.getElementById("issue").value = issue.issue;
     
    } else {
      console.error("Issue not found");
    }
  } else {
    console.error("No issue ID found in localStorage");
  }
};

getissues();

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
    id: localStorage.getItem("updateid"),
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
    alert("Fill all the Fields");
    return false;
  }

  // local storage replaced with MongoDB

  const res = await fetch("http://localhost:3000/updateComplaint", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newInfo),
  });

  //reseting values
  if (res.ok) alert("Complaint Updated Successfully");
  {
    fname.value = "";
    lname.value = "";
    pin.value = "";
    email.value = "";
    state.value = "";
    city.value = "";
    issue.value = "";
  }
  window.location.replace("./index.html")
});

cancel.addEventListener("click", () => {
  window.location.replace("./index.html");
});
