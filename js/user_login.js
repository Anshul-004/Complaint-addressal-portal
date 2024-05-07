let signupbtn = document.getElementById("signupbtn");
let signinbtn = document.getElementById("signinbtn");
let namefield = document.getElementById("namefield");
let cnfpassword = document.getElementById("confirm-password");
let title = document.getElementById("title");
let login = document.getElementById("login");
let save = document.getElementById("save");

signinbtn.onclick = function () {
  namefield.style.maxHeight = "0";
  cnfpassword.style.maxHeight = "0";
  title.innerHTML = "Sign In";
  signupbtn.classList.add("disable");
  signinbtn.classList.remove("disable");
  save.classList.add("d-none");
  login.classList.remove("d-none");
};
signupbtn.onclick = function () {
  namefield.style.maxHeight = "60px";
  cnfpassword.style.maxHeight = "60px";
  title.innerHTML = "Sign Up";
  signupbtn.classList.remove("disable");
  signinbtn.classList.add("disable");
  save.classList.remove("d-none");
  login.classList.add("d-none");
};
let name = document.getElementById("name");
let email = document.getElementById("email");
let pin = document.getElementById("pin");
let pass = document.getElementById("pass");
let cpass = document.getElementById("cpass");

//Registration Logic
let u_details = [];
save.addEventListener("click", () => {
  let newUser = {
    name: name.value,
    email: email.value,
    pin: pin.value,
    pass: pass.value,
  };

  if (
    name.value == "" ||
    email.value == "" ||
    pin.value == "" ||
    pass.value == "" ||
    cpass.value == ""
  ) {
    toasterdanger("Fill all values");
    return false;
  }

  if (pass.value != cpass.value) {
    console.log("Try Again");
    return false;
  }

  u_details = localStorage.getItem("user_creds");
  u_details = u_details === null ? [] : JSON.parse(u_details);

  //finds wether new email exists already or not
  let userexist = u_details.find((value) => {
    return value.email === newUser.email;
  });

  if (userexist == undefined) {
    u_details.push(newUser);
  } else {
    toasterdanger("Email Already Exists");
    return false;
  }

  //user credentials will be updated
  localStorage.setItem("user_creds", JSON.stringify(u_details));

  toastersuccess("Registered Successfully")
  
  name.value = "";
  email.value = "";
  pin.value = "";
  pass.value = "";
  cpass.value = "";
});

//login Logic

login.addEventListener("click", () => {
  let username = email.value;
  let password = pass.value;
  let pincode = pin.value;
  if(username == "" || password == "" || pincode == "")
    {
      toasterdanger("Fill all the fields !");
      return false;
    }

  let users = localStorage.getItem("user_creds");
  users = users === null ? [] : JSON.parse(users);

  let userexists = users.findIndex((value) => {
    return value.email == username && value.pass == password&& value.pin == pincode;
  }); //index dega of such user

  if (userexists == -1) {
    toasterdanger("Invalid Credentials");
  } else {
    localStorage.setItem("userloginid", userexists);
    toastersuccess("Logged in Successfully");
    setTimeout(() => {
      window.location.replace("./complaint.html");
    }, 500);
  }
});
