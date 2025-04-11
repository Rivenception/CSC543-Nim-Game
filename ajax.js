//Generic 404 error, AJAX edition
exports.fof = function (body, res) {
  res.writeHead(200, body ? { "Content-Type": "application/json" } : undefined);
  if (body) res.write(JSON.stringify(body));
  res.end();
};

//Ajax request responder
exports.home = function (body, res) {
  res.writeHead(200, body ? { "Content-Type": "application/json" } : undefined);
  if (body) res.write(JSON.stringify(body));
  res.end();
};

exports.signup = function (body, res) {
  res.writeHead(200, body ? { "Content-Type": "application/json" } : undefined);
  if (body) res.write(JSON.stringify(body));
  res.end();
};

//Ajax request responder
exports.leaderboard = function (body, res) {};
