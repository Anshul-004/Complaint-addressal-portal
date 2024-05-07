//login out button logic
let navlogin = document.getElementById("navlogin");
let navlogout = document.getElementById("navlogout");

if (localStorage.getItem("adminloginid") == null) {
  toasterdanger("Admin Access Only !");
  setTimeout(() => {
    window.location.replace("./index.html");
  }, 500);
}

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
  toastersuccess("Logged Out");
});

//Complaint Cards
let card = document.getElementById("parent");

function printdata() {
  let issues = localStorage.getItem("complaints");
  issues = JSON.parse(issues);

  let issue_card = issues.map((value) => {
    return `<div class="card-body">
    <h2>${value.firstname} ${value.lastName}</h2>
    <p>
    <strong>PIN CODE</strong> - ${value.pin}
    </p>
    <p>
    <strong>EMAIL ID</strong> - ${value.email}
    </p>
    <p>
    <strong>STATE</strong> - ${value.state} <strong>CITY</strong> - ${value.city}
    </p>
    <p>
    <strong>Issue Faced - </strong>
    ${value.issue}
    </p>
    <p>
    <button type="button" id="del" data-id="${value.id}">Mark As Resolved</button>
    </p>
    </div>`;
  });

  card.innerHTML = issue_card.join("");
  delelement();
}

printdata();

function delelement() {
  let deletebtn = document.querySelectorAll("#del");

  deletebtn.forEach((value) => {
    value.addEventListener("click", () => {
      let id = value.dataset.id;
      console.log(id); //returns id as number.

      let newdata = JSON.parse(localStorage.getItem("complaints"));
      newdata = newdata.filter((temp) => {
        return temp.id != id;
      });
      localStorage.setItem("complaints", JSON.stringify(newdata));
      printdata();
      toastersuccess("Resolved Complaint");
    });
  });
}
