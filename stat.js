//Generic 404 error
exports.fof = function (url, res) {
  res.writeHead(404, {"Content-Type": "text/plain"});
  res.write(url ? `Could not find ${url.pathname}` : 'Could not find the specified resource');
  res.end();
}

//Static home page base
exports.home = function (url, res) {
  
}

//Static leaderboard base
exports.leaderboard = function (url, res) {

}
