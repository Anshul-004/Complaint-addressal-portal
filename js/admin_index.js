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

//Complaint Cards
let card = document.getElementById("parent");

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
  <p>
      <button type="button" id="del" data-id="${value.id}">Mark As Resolved</button>
  </p>
</div>`;
  });

  card.innerHTML = issue_card.join("");
};

//function call
function delelement() {
  console.log("WORKS");
  let deletebtn = document.querySelectorAll("#del");

  deletebtn.forEach((value) => {
    value.addEventListener("click", async () => {
      let id = value.dataset.id;
      console.log(id); //returns id as number.

      const req = await fetch("http://localhost:3000/resolve", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id}),
      });
      if (req.ok) {
        toastersuccess("Issue Marked As Resolved")
        getissues();
      } else {
        toasterdanger("Can't Solve the Issue")
      }
    });
  });
}

let main = async () => {
  await getissues();
  delelement();
};

main();
