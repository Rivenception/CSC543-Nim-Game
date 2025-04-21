const creds = require('./creds.js');

const mysql = require('mysql2/promise');
const databaseConfig = {
  host: creds.sqlHost,
  user: creds.username,
  password: creds.password,
  database: "nim"
};

//Generic 404 error, AJAX edition
exports.fof = function (body, res) {
  res.writeHead(404, body ? { "Content-Type": "application/json" } : undefined);
  if (body) res.write(JSON.stringify(body));
  res.end();
};

//Ajax request responder
exports.home = async function (body, res) {
  res.writeHead(200, body ? { "Content-Type": "application/json" } : undefined);
  if (body) res.write(JSON.stringify(body));
  res.end();
};

exports.signup = async function (body, res) {
  const {username, password} = JSON.parse(body);
  try {
    [results] = await insertUser(username, password);
    //console.log(results);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({username: username}));
    res.end();
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.write(JSON.stringify({error: `Failed to INSERT user ${username}`}));
    res.end();
  }
};

exports.login = async function (body, res) {
  const {username, password} = JSON.parse(body);
  [[results]] = await getSignin(username, password);
  console.log(results);
  if (!results) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.write(JSON.stringify({error: `Failed to LOGIN user ${username}`}));
    res.end();
  } else {  
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({id: results.id}));
    res.end();
  }
};

//Ajax request responder
exports.leaderboard = async function (body, res) {
  [results] = await getStatistics();
  console.log(results);
  if (!results) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.write(JSON.stringify({error: `Failed to GET leaderboard statistics`}));
    res.end();
  } else {  
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(results));
    res.end();
  }
};


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
