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
save.addEventListener("click", async () => {
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
    toasterdanger("Fill all the Fields");
    return false;
  }

  if (acode.value != 6969) {
    toasterdanger("Incorrect Admin Code");
    return false;
  }

  //replacing localstorage with mongodb
  const res = await fetch("http://localhost:3000/adminlogin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newAdmin),
  });

  if (res.status === 409) {
    toasterdanger("Email already exists, Try another one !");
  }

  if(res.ok)
  {
    toastersuccess("Admin Registered Successfully")
    name.value = "";
    email.value = "";
    pin.value = "";
    pass.value = "";
    acode.value = "";
  }
});

//login logic
login.addEventListener("click", async() => {
  let username = email.value;
  let password = pass.value;

  let logininfo = {
    username,
    password,
  };

  if (username == "" || password == "") {
    toasterdanger("Fill all the Fields");
    return false;
  }

  //replacing localstorage with mongodb
  const res = await fetch("http://localhost:3000/adminlogincheck", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(logininfo),
  });

  if (res.status === 200) {
    toastersuccess("Logged In Successfully")
    localStorage.setItem("adminloginid", 1); //1 ki jagah, it must be id of user
    setTimeout(() => {
      window.location.replace("./admin_index.html"); 
    }, 500);
  }
  else{
    toasterdanger("Invalid Credentials")
  }

});


