import { move, newGame, winCheck, resetGame } from "./ajaxGame.js";
import { loginRequest } from "./ajaxLogin.js";

//Rick: added for tracking cards
let cards = document.querySelectorAll(".card");

// Rick: added this to track the game state but we didn't use it.
// let game_state = {
//   first_row: ["r1c1"],
//   second_row: ["r2c1", "r2c2", "r2c3"],
//   third_row: ["r3c1", "r3c2", "r3c3", "r3c4", "r3c5"],
//   fourth_row: ["r4c1", "r4c2", "r4c3", "r4c4", "r4c5", "r4c6", "r4c7"],
// };

let selected_row = "";
let current_row = "";
// Corwin: lookup table
const indexToRowTag = [undefined, "first_row", "second_row", "third_row", "fourth_row"];

// Rick: helper function to track is a card is already hovered over
let cardStatus = () => {
    let tiles = Array.from(cards);
    let anySelected = tiles.some(tile => tile.classList.contains("shadow"));

    if (!anySelected) {
        selected_row = "";
        // console.log("Resetting selected row to empty string");
    } else {
        // console.log("There is at least one card selected");
    }
};

// Rick: helper function to track if a card is selected
function rowStatus(element) {
    switch (selected_row) {
        case "first_row":
            // console.log("Row 1 selected: " + selected_row);
            if (!element.parentElement.parentElement.classList.contains("selected") && selected_row === current_row) {
                element.parentElement.parentElement.classList.toggle("selected");
                return;
            }
            break;
        case "second_row":
            // console.log("Row 2 selected: " + selected_row);
            if (!element.parentElement.parentElement.classList.contains("selected") && selected_row === current_row) {
                element.parentElement.parentElement.classList.toggle("selected");
                return;
            }
            break;
        case "third_row":
            // console.log("Row 3 selected: " + selected_row);
            if (!element.parentElement.parentElement.classList.contains("selected") && selected_row === current_row) {
                element.parentElement.parentElement.classList.toggle("selected");
                return;
            }
            break;
        case "fourth_row":
            // console.log("Row 4 selected: " + selected_row);
            if (!element.parentElement.parentElement.classList.contains("selected") && selected_row === current_row) {
                element.parentElement.parentElement.classList.toggle("selected");
                return;
            }
            break;
        default:
            // console.log("No row selected: " + selected_row);
            element.parentElement.parentElement.classList.remove("selected");
    }
};

// Rick: helper function to track the row of a card
function getRowOfTile(element) {
    current_row = element.parentElement.parentElement.id;
    // console.log("Current row: " + current_row);
    return element.parentElement.parentElement.id
}

// Rick: helper function to track if a card is selected what row it is in
function isRowSelected(element) {
    // console.log("Checking if row is selected " + element.parentElement.parentElement.classList.contains("selected"));
    return element.parentElement.parentElement.classList.contains("selected")
}

// Rick: helper fucntion to check if a row is selected and if it matches the current row
function rowMatch(element) {
    if (selected_row === "") {
        // console.log("No row selected, selecting: " + element.parentElement.parentElement.id);
        selected_row = element.parentElement.parentElement.id
        return true;
    } else if (selected_row === current_row) {
        // console.log("Row match: " + selected_row + " === " + current_row);
        return true;
    } else {
        // console.log("Row match: " + selected_row + " !== " + current_row);
        return false;
    }
}

// Rick: helper function to track if a tile is selected
function isTileSelected(element) {
    // console.log("Checking if a tile is selected (should be highlighted): " + element.classList.contains("shadow"));
    return element.classList.contains("shadow");
}

// Rick: helper function to toggle the tile has shadow class tag
function TileToggle(element) {
    // console.log("Toggling tile: " + element.classList.contains("shadow"));
    element.classList.toggle("shadow");
    return
}

// Rick: function to handle the visual feedback of the game board to the user
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

// Rick: added this visual feedback for turn change on move submission
function turnToggle() {
    let player1 = document.getElementById("first_player")
    let player2 = document.getElementById("second_player")
    if (player1.classList.contains("turn")) {
        player1.classList.toggle("turn")
        player2.classList.add("turn")
    }
    else if (player2.classList.contains("turn")) {
        player2.classList.toggle("turn")
        player1.classList.add("turn")
    } else {
        preventDefault()
    }
}

//Rick: added this visual to reset turns
function turnToggleReset() {
    let player1 = document.getElementById("first_player")
    let player2 = document.getElementById("second_player")
    if (!player1.classList.contains("turn")) {
        player1.classList.toggle("turn")
    }
    else if (player2.classList.contains("turn")) {
        player2.classList.toggle("turn")
    } else {
        preventDefault()
    }
}

// Emmanuel
const login = async (e) => {
    const spinner = document.getElementById("spinnerDiv");
    spinner.hidden = false;
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
    spinner.hidden = true;
};

// Corwin: written to work with other code in the front end
function rowToIndex(row){
    switch(row){
        case "first_row":
            return 1;

        case "second_row":
            return 2;

        case "third_row":
            return 3;
        
        case "fourth_row":
            return 4;

        default:
            return 0;
    }
}

// Corwin: does the front end logic to make a move in game
async function makeMove(){
    let row = rowToIndex(current_row);
    let tiles = Array.from(cards);
    let amount = tiles.filter(tile => tile.classList.contains("shadow")).length;
    const user1 = localStorage.getItem("player1Id");
    const user2 = localStorage.getItem("player2Id");
    if(!user1 || !user2){
        displayMove(0,0);
        throw(new Error("Not Logged In!"));
    }

    //Rick: added this visual feedback for turn change on move submission
    turnToggle();
    
    //do move front-end validation and call out to server
    let moveStatus = await move(row-1, amount, user1, user2);
    let gameStatus = "";
    if(!moveStatus){
        gameStatus = await newGame(user1, user2);
        if(gameStatus)
            moveStatus = await move(row-1, amount, user1, user2);
        else
            throw(new Error(`Failed to make Game for ${user1} ${user2}!`));
    }

    //show the move
    if(moveStatus){
        displayMove(row, amount);
    } else {
        displayMove(0,0);
        throw(new Error("Could not make Move or create Game!"));
    }

    let player1 = document.getElementById("first_player")
    let player2 = document.getElementById("second_player")

    if (!player1.classList.contains("turn")) {
        let player1 = document.getElementById("player1Name").innerHTML;
        let player2 = document.getElementById("player2Name").innerHTML;
        console.log(`Move made by: ${player1}(playerId:${user1}) on row: ${row} with amount: ${amount}`);
        console.log(`It is ${player2}(playerId:${user2}) move now`);
    }
    else if (!player2.classList.contains("turn")) {
        console.log(`Move made by: ${player2}(playerId:${user2}) on row: ${row} with amount: ${amount}`);
        console.log(`It is ${player1}(playerId:${user1}) move now`);
    } else {
        preventDefault()
    }

    //check if won
    let winner = await winCheck(user1, user2);
    console.log(winner);
    if(undefined != winner){
        const player1Id = localStorage.getItem("player1Id");
        const winnerFinal = winner == player1Id ? localStorage.getItem("player1Name") : localStorage.getItem("player2Name")
        alert(`${winnerFinal} has won!`);
    }
}

// Corwin: ask server to reset game
async function clientResetGame(){
    displayMove(0,0);
    const user1 = localStorage.getItem("player1Id");
    const user2 = localStorage.getItem("player2Id");
    if (!user1 || !user2)
        throw(new Error("Not Logged In!"));
    const success = await resetGame(user1, user2);
    if(success){
        let tiles = Array.from(cards);
        tiles.map(tile => tile.parentElement.classList.remove("d-none"));
    } else {
        throw(new Error("Failed to Reset Game!"))
    }

    // Rick: added function to reset the turn indicator
    turnToggleReset()
}

// Corwin: Front end GUI code
function displayMove(row, amount) {
    console.log(`Removing ${amount} from row #${row}`);
    let tiles = Array.from(cards);
    // reset all the highlights to clear selection
    tiles.map(tile => tile.classList.remove("shadow"));
    tiles.map(tile => tile.parentElement.parentElement.classList.remove("selected"));
    // inform the rest of the code selection was cleared
    cardStatus();
    // find the correct nth row
    row = document.getElementById(indexToRowTag[row])
    if(!row)
        return;
    //Parse the childNodes "NodeList" type into a normal array and filter it
    let rowNodes = [];
    for(let node of row.childNodes){
        if(node.classList && !node.classList.contains("d-none"))
            rowNodes.push(node);
    }
    // d-none the correct number of cards
    for(let i=0; i<amount; i++){
        console.log(rowNodes[i]);
        rowNodes[i].classList.add("d-none");
    }
}

document.getElementById("loginPlayer1Form").addEventListener("submit", login);
document.getElementById("loginPlayer2Form").addEventListener("submit", login);

document.getElementById("submitMoveButton").addEventListener("click", makeMove);
document.getElementById("resetGameButton").addEventListener("click", clientResetGame);
