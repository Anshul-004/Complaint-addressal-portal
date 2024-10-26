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
let adcomp = document.getElementById("adcomp")
if(localStorage.getItem("adminloginid") == 1)
{
  adcomp.classList.remove("d-none")
}
else{
  adcomp.classList.add("d-none")
}

//Complaint Cards
let card = document.getElementById("parent");
let searchval = document.getElementById("searchbox")
let sbtn = document.getElementById("sbtn")

searchval.value = localStorage.getItem("search");


//localstorage to MongoDB
const getissues = async () => {
  let req = await fetch("http://localhost:3000/");
  let issues = await req.json();

  sbtn.addEventListener("click", async() => {
    localStorage.setItem("search", searchval.value);
    window.location.reload();
  })
  
  let issue_card = issues.map((val) => {
    if (searchval.value == val.issue)
    return `<div class="card-body">
  <h2>${val.firstname} ${val.lastName}</h2>
  <p>
      <strong>PIN CODE</strong> - ${val.pin}
  </p>
  <p>
      <strong>EMAIL ID</strong> - ${val.email}
  </p>
  <p>
      <strong>STATE</strong> - ${val.state} <strong>CITY</strong> - ${val.city}
  </p>
  <p>
      <strong>Issue Faced - </strong>
      ${val.issue}
  </p>
</div>`;
  });

  card.innerHTML = issue_card.join("");
};

//function call
getissues();
