import { loginRequest } from "./ajaxLogin.js";

let cards = document.querySelectorAll(".card");

// let game_state = {
//   first_row: ["r1c1"],
//   second_row: ["r2c1", "r2c2", "r2c3"],
//   third_row: ["r3c1", "r3c2", "r3c3", "r3c4", "r3c5"],
//   fourth_row: ["r4c1", "r4c2", "r4c3", "r4c4", "r4c5", "r4c6", "r4c7"],
// };

let selected_row = "";
let current_row = "";

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

const login = async (e) => {
    e.preventDefault();
    const user = {
        username: e.target.elements[0].value,
        password: e.target.elements[1].value,
    };
    try {
        const loginResult = await loginRequest(user);
        if (loginResult.ok) {
            const res = await loginResult.json();
            console.log(`Ok ${loginResult.status}: ${JSON.stringify(res)}`);
            if (e.target.id === "loginPlayer1Form") {
                localStorage.setItem("player1Name", user.username);
                localStorage.setItem("player1Id", res.id);
                document.getElementById("player1Name").innerText = user.username;
            } else {
                localStorage.setItem("player2Name", user.username);
                localStorage.setItem("player2Id", res.id);
                document.getElementById("player2Name").innerText = user.username;
            }
            alert(`${user.username} is logged in`);
        } else {
            throw new Error(`${loginResult.status}: ${loginResult.statusText}`);
        }
    } catch (error) {
        alert(error);
        console.log(error);
    }
};

document.getElementById("loginPlayer1Form").addEventListener("submit", login);
document.getElementById("loginPlayer2Form").addEventListener("submit", login);
