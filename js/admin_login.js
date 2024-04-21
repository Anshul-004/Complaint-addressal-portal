let signupbtn = document.getElementById("signupbtn");
let signinbtn = document.getElementById("signinbtn");
let namefield = document.getElementById("namefield");
let pinfield = document.getElementById("pinfield");
let adminfield = document.getElementById("adminfield");
let title = document.getElementById("title");
let login = document.getElementById("login");
let save = document.getElementById("save");

signinbtn.onclick = function () {
  namefield.style.maxHeight = "0";
  pinfield.style.maxHeight = "0";
  adminfield.style.maxHeight = "0";
  title.innerHTML = "Sign In";
  signupbtn.classList.add("disable");
  signinbtn.classList.remove("disable");
  save.classList.add("d-none");
  login.classList.remove("d-none");
};
signupbtn.onclick = function () {
  namefield.style.maxHeight = "60px";
  adminfield.style.maxHeight = "60px";
  pinfield.style.maxHeight = "60px";
  title.innerHTML = "Sign Up";
  signupbtn.classList.remove("disable");
  signinbtn.classList.add("disable");
  save.classList.remove("d-none");
  login.classList.add("d-none");
};

//registration logic
let name = document.getElementById("name")
let acode = document.getElementById("acode")
let email = document.getElementById("email")
let pin = document.getElementById("pin")
let pass = document.getElementById("pass")

let a_details = [];
save.addEventListener("click", () => {
  let newAdmin = {
    name: name.value,
    adminCode:acode.value,
    email: email.value,
    pin: pin.value,
    pass: pass.value,
  };

  if (
    name.value == "" ||
    email.value == "" ||
    pin.value == "" ||
    pass.value == ""
  ) {
    console.log("Fill all values");
    return false;
  }

  if (acode.value != 6969) {
    console.log("Unauthorised Access");
    return false;
  }

  a_details = localStorage.getItem("admin_creds");
  a_details = a_details === null ? [] : JSON.parse(a_details);

  //finds wether new email exists already or not
  let adminexist = a_details.find((value) => {
    return value.email === newAdmin.email;
  });

  if (adminexist == undefined) {
    a_details.push(newAdmin);
  } else {
    console.log("Check EmailID");
    return false;
  }

  //user credentials will be updated
  localStorage.setItem("admin_creds", JSON.stringify(a_details));

  name.value = "";
  email.value = "";
  pin.value = "";
  pass.value = "";
  acode.value = "";
});

//login logic

login.addEventListener("click", () => {
  let username = email.value;
  let password = pass.value;

  let admins = localStorage.getItem("admin_creds");
  admins = admins === null ? [] : JSON.parse(admins);

  let adminexists = admins.findIndex((value) => {

    return value.email == username && value.pass == password;
  }); //index dega of such user

  if (adminexists == -1) {
    console.log("Invalid Creds");
  } else {
    localStorage.setItem("adminloginid", adminexists);
    window.location.replace("./admin_home.html");
  }
});


