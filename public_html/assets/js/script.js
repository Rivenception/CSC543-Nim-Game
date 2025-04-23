import { login } from "./ajaxLogin.js";

let cards = document.querySelectorAll(".card");

// let game_state = {
//   first_row: ["r1c1"],
//   second_row: ["r2c1", "r2c2", "r2c3"],
//   third_row: ["r3c1", "r3c2", "r3c3", "r3c4", "r3c5"],
//   fourth_row: ["r4c1", "r4c2", "r4c3", "r4c4", "r4c5", "r4c6", "r4c7"],
// };

selected_row = "";

let cardStatus = () => {
    let tiles = Array.from(cards);
    let anySelected = tiles.some(tile => tile.classList.contains("shadow"));

    if (!anySelected) {
        selected_row = "";
        console.log("Resetting selected row to empty string");
    } else {
        console.log("There is at least one card selected");
    }    
};

function rowStatus(element) {
    switch (selected_row) {
        case "first_row":
            console.log("Row 1 selected: " + selected_row);
            if (!element.parentElement.parentElement.classList.contains("selected") && selected_row === current_row) {
                element.parentElement.parentElement.classList.toggle("selected");
                return;
            }
            break;
        case "second_row":
            console.log("Row 2 selected: " + selected_row);
            if (!element.parentElement.parentElement.classList.contains("selected") && selected_row === current_row) {
                element.parentElement.parentElement.classList.toggle("selected");
                return;
            }
            break;
        case "third_row":
            console.log("Row 3 selected: " + selected_row);
            if (!element.parentElement.parentElement.classList.contains("selected") && selected_row === current_row) {
                element.parentElement.parentElement.classList.toggle("selected");
                return;
            }
            break;
        case "fourth_row":
            console.log("Row 4 selected: " + selected_row);
            if (!element.parentElement.parentElement.classList.contains("selected") && selected_row === current_row) {
                element.parentElement.parentElement.classList.toggle("selected");
                return;
            }
            break;
        default:
            console.log("No row selected: " + selected_row);
            element.parentElement.parentElement.classList.remove("selected");
    }
};

function getRowOfTile(element) {
    current_row = element.parentElement.parentElement.id;
    console.log("Current row: " + current_row);
    return element.parentElement.parentElement.id
}

function isRowSelected(element) {
    console.log("Checking if row is selected " + element.parentElement.parentElement.classList.contains("selected"));
    return element.parentElement.parentElement.classList.contains("selected")
}

function rowMatch(element) {
    if (selected_row === "") {
        console.log("No row selected, selecting: " + element.parentElement.parentElement.id);
        selected_row = element.parentElement.parentElement.id
        return true;
    } else if (selected_row === current_row) {
        console.log("Row match: " + selected_row + " === " + current_row);
        return true;
    } else {
        console.log("Row match: " + selected_row + " !== " + current_row);
        return false;
    }
}

function rowToggle(element) {
    element.parentElement.parentElement.classList.toggle("selected");
    return element.parentElement.parentElement.classList.toggle("selected")
}

function isTileSelected(element) {
    console.log("Checking if a tile is selected (should be highlighted): " + element.classList.contains("shadow"));
    return element.classList.contains("shadow");
}

function TileToggle(element) {
    console.log("Toggling tile: " + element.classList.contains("shadow"));
    element.classList.toggle("shadow");
    return
}

cards.forEach(element => {
    // console.log(element.parentElement.parentElement.id);
    // console.log(element.id);
    element.addEventListener("click", function() {
        current_row = "";
        cardStatus(element);
        getRowOfTile(element);
        isRowSelected(element);
        rowMatch(element);
        if (rowMatch(element) === true) {
            TileToggle(element);
        }
        isTileSelected(element);
        cardStatus(element);
        rowStatus(element);
    })
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
