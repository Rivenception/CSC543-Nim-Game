// Corwin: I wrote this script
// This manages instances of NimGame from nim.js, associating instances with users

const Nim = require("./nim.js");
let games = [];

//removes complete and old games
exports.prune = function (endedGames, oldGames) {
  if (endedGames)
    games = games.filter(g => !g.game.ended);
  if (oldGames)
    games = games.filter(g => g.time >= Date.now() - 3600000);
}

exports.newGame = function (userid1, userid2){
  games.push({u: {userid1, userid2}, game: new Nim(), time: Date.now()});
  return games[games.length-1];
}

exports.getGame = function (userid1, userid2){
  //console.log(games);
  return games.find(g => g.u.userid1 == userid1 && g.u.userid2 == userid2).game;
}

// returns if the move was successful
exports.move = function (userid1, userid2, row, amount){
  try{
    exports.getGame(userid1, userid2).move(row, amount);
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