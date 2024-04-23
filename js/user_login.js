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
save.addEventListener("click", async () => {
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
    toasterdanger("Fill all the Fields");
    return false;
  }

  if (pass.value != cpass.value) {
    toasterdanger("Password and Confirm Password must be same");
    return false;
  }
  //replacing localstorage with mongodb
  const res = await fetch("http://localhost:3000/userlogin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

  if (res.status === 409) {
    toasterdanger("Email already exists, try another one !");
  }
  if (res.ok) {
    toastersuccess("Registration Successful");
    name.value = "";
    email.value = "";
    pin.value = "";
    pass.value = "";
    cpass.value = "";
  }
});

//login Logic

login.addEventListener("click", async () => {
  let username = email.value;
  let password = pass.value;
  let pincode = pin.value;

  let logininfo = {
    username,
    password,
    pincode,
  };

  if (username == "" || password == "" || pincode == "") {
    toasterdanger("Fill all the Fields");
    return false;
  }

  //replacing localstorage with mongodb
  const res = await fetch("http://localhost:3000/userlogincheck", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(logininfo),
  });

  if (res.status === 200) {
    toastersuccess("Logged In Successfully");
    localStorage.setItem("userloginid", 1); //1 ki jagah, it must be id of user
    setTimeout(() => {
      window.location.replace("./complaint.html");
    }, 500);
  } else {
    toasterdanger("Invalid Username or Password");
  }
});
