# CSC543-Nim-Game

## Running
#### Install the required packages
- npm install
  - Will install all packages listed in package.json (mysql2)

#### Run the server
- Create the "creds.js" file (or copy) in the root dir of the project. It contains an object with MySql server credentials.
  - "ajax.js" expects this file to exist with the module.exports being an object with attributes: "username", "password", "sqlHost"
- sudo $(which node) server.js

## List of Functionality
- Cards glow when hovered over
- Turns are counted and displayed on the page
- Button to submit the card selection and pass the turn
- An option to bring up an element with instructions
- A reset game button
- A front-end script to manage the page
- A separate module to manage the game state, could be front or back end
- An app.js to manage the server-side routing. Will return the landing game page
- Added a sign up / sign in page
- Added a score page
- Created game state data structure \(int\[] for count of cards in row)
 

