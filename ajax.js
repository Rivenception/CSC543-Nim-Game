//Generic 404 error, AJAX edition
exports.fof = function (body, res) {
  res.writeHead(400, body ? {"Content-Type":"application/json"} : undefined);
  if (body)
    res.write(body);
  res.end();
}

//Ajax request responder
exports.home = function (body, res) {

}

//Ajax request responder
exports.leaderboard = function (body, res) {

}