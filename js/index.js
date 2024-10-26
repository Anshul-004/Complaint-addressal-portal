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
let sbtn = document.getElementById("sbtn");
let searchval = document.getElementById("searchbox");
sbtn.addEventListener("click", async () => {
  localStorage.setItem("search", searchval.value);
  window.location.replace("./search.html");
});
//localstorage to MongoDB
const getissues = async () => {
  let req = await fetch("http://localhost:3000/");
  let issues = await req.json();
  console.log(issues);

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
</div>`;
  });

  card.innerHTML = issue_card.join("");
};

//function call
getissues();
