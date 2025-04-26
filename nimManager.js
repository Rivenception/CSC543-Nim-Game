const Nim = require("./nim.js");
let games = [];

//removes complete and optionally old games
exports.prune = function (oldGames) {
  games = games.filter(g => !g.game.ended);
  if (oldGames)
    games = games.filter(g => g.time >= Date.now() - 3600000);
}

exports.newGame = function (userid1, userid2){
  games.push({u: {userid1, userid2}, game: new Nim(), time: Date.now()});
  return games[games.length].game;
}

exports.getGame = function (userid1, userid2){
  return games.find(g => g.u.userid1 == userid1 && g.u.userid2 == userid2).game;
}

// returns if the move was successful
exports.move = function (userid1, userid2, row, amount){
  try{
    exports.getGame(userid1, userid1).move(row, amount);
    return true;
  }catch{
    return false;
  }
}

//returns if the reset was successful
exports.resetGame = function(userid1, userid2){
  try{
    exports.getGame(userid1,userid2).reset();
    return true;
  } catch {
    return false
  }
}