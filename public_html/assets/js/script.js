import { login } from "./ajaxLogin.js";

let cards = document.querySelectorAll(".card");

let game_state = {
  first_row: ["r1c1"],
  second_row: ["r2c1", "r2c2", "r2c3"],
  third_row: ["r3c1", "r3c2", "r3c3", "r3c4", "r3c5"],
  fourth_row: ["r4c1", "r4c2", "r4c3", "r4c4", "r4c5", "r4c6", "r4c7"],
};

let selected_row = "";

cards.forEach((element) => {
  // console.log(element.parentElement.parentElement.id);
  // console.log(element.id);

  element.addEventListener("click", function () {
    if (
      selected_row === "" ||
      selected_row === element.parentElement.parentElement.id
    ) {
      // console.log(selected_row)
      // console.log(element.parentElement.parentElement.id + ": " + element.id);
      selected_row = element.parentElement.parentElement.id;
      console.log(selected_row);
      element.parentElement.parentElement.classList.add("selected");
      element.classList.toggle("shadow");
      if (!element.classList.contains("shadow")) {
        element.parentElement.parentElement.classList.toggle("selected");
      }
    } else if (
      selected_row !== "" &&
      selected_row !== element.parentElement.parentElement.id
    ) {
      console.log("Must select from current row: " + selected_row);
      return;
    }
  });
});

const updateNames = () => {
  const player1Name = localStorage.getItem("player1Name");
  const player2Name = localStorage.getItem("player2Name");
  document.getElementById("player1Name").innerText = player1Name
    ? player1Name
    : "Player 1 not found";
  document.getElementById("player2Name").innerText = player2Name
    ? player2Name
    : "Player 2 not found";
};

document
  .getElementById("loginPlayer1Submit")
  .addEventListener("click", function () {
    login(this);
  });
document
  .getElementById("loginPlayer2Submit")
  .addEventListener("click", function () {
    login(this);
  });

document
  .getElementById("updateNamesButton")
  .addEventListener("click", updateNames);
