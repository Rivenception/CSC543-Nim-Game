const creds = require('./creds.js');
const gameManager = require("./nimManager.js");

const mysql = require('mysql2/promise');
const databaseConfig = {
  host: creds.sqlHost,
  user: creds.username,
  password: creds.password,
  database: "nim"
};

//Generic 404 error, AJAX edition
exports.fof = function (body, res) {
  respond(res, 404, "application/json", body);
};

//Ajax request responder
exports.home = async function (body, res) {
  respond(res, 200, "application/json", body);
};

exports.signup = async function (body, res) {
  const {username, password} = JSON.parse(body);
  try {
    [results] = await insertUser(username, password);
    //console.log(results);
    respond(res, 200, "application/json", JSON.stringify({ username: username }));
  } catch (error) {
    respond(res, 500, "application/json", JSON.stringify({ error: `Failed to INSERT user ${username}` }));
  }
};

exports.login = async function (body, res) {
  const { username, password } = JSON.parse(body);
  [[results]] = await getSignin(username, password);
  if (results) {
    respond(res, 200, "application/json", JSON.stringify({ id: results.id }));
  } else {
    respond(res, 500, "application/json", JSON.stringify({ error: `Failed to LOGIN user ${username}` }));
  }
};

//Ajax request responder
exports.leaderboard = async function (body, res) {
  [results] = await getStatistics();
  console.log(results);
  if (results) {
    respond(res, 200, "application/json", JSON.stringify(results));
  } else {  
    respond(res, 500, "application/json", JSON.stringify({error: `Failed to GET leaderboard statistics`}));
  }
};

// expects user1 and user2 id's
exports.newGame = function (body, res) {
  const { u1, u2 } = JSON.parse(body);
  game = gameManager.newGame(u1, u2);
  if (game) {
    respond(res, 200, "application/json", JSON.stringify(game));
    gameManager.prune();
  } else {
    respond(res, 300, "application/json", JSON.stringify({error: `Failed to create new game!`}));
  }
}

// expects user1 and user2 id's and row and amount
exports.moveGame = function (body, res) {
  const { u1, u2, r, a } = JSON.parse(body);
  success = gameManager.move(u1, u2, r, a);
  if (success) {
    respond(res, 200, "application/json", JSON.stringify(success));
    gameManager.prune();
  } else {
    respond(res, 300, "application/json", JSON.stringify({error: `Failed to make move!`}));
  }
}

// expects user1 and user2 id's
exports.resetGame = function (body, res) {
  const { u1, u2 } = JSON.parse(body);
  success = gameManager.resetGame(u1, u2);
  if (success) {
    respond(res, 200, "application/json", JSON.stringify(success));
    gameManager.prune();
  } else {
    respond(res, 300, "application/json", JSON.stringify({error: `Failed to reset game!`}));
  }
}

// requires res and status, type and body optional
function respond (res, status, type, body){
  console.log(`Sending ${status}`);
  if (!type)
    res.writeHead(status);
  else
    res.writeHead(status, {'Content-Type': type});
  if (body)
    res.write(body);
  res.end();
}

// Non-exported SQL Functions
// ALL RETURN PROMISES TO BE AWAITED IN AN ASYNCHRONOUS CONTEXT!!!!!

async function insertUser (username, password) {
  database = await mysql.createConnection(databaseConfig);
  return database.query(
    "INSERT INTO user (username, password) VALUES (?, ?)",
    values = [username, password]
  );
}

async function getSignin (username, password) {
  database = await mysql.createConnection(databaseConfig);
  return database.query(
    "SELECT id FROM user WHERE username = ? AND password = ?",
    values = [username, password]
  );
}

async function dropUser (id) {
  database = await mysql.createConnection(databaseConfig);
  return database.query(
    "DELETE FROM user WHERE id = ?",
    values = [id]
  );
}

async function addWin (id) {
  database = await mysql.createConnection(databaseConfig);
  return database.query(
    "UPDATE user SET wins = wins + 1 WHERE id = ?",
    values = [id]
  );
}

async function addLoss (id) {
  database = await mysql.createConnection(databaseConfig);
  return database.query(
    "UPDATE user SET losses = losses + 1 WHERE id = ?",
    values = [id]
  );
}

async function getStatistics () {
  database = await mysql.createConnection(databaseConfig);
  return database.query(
    "SELECT id, username, wins, losses FROM user",
  );
}
