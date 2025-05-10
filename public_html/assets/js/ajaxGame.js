// Corwin: I wrote this file
// this contains ajax functions related to 'game' functions

let ajax = new XMLHttpRequest();

const move = async function (row, amount, user1, user2) {
  return new Promise((resolve, reject) => {
    ajax.open('PUT', '/game/move');
    ajax.setRequestHeader('Content-Type', 'application/json');
    ajax.onload = () => {
      if (ajax.status == 200) {
        console.log(`Move Valid`);
        resolve(true);
      } else {
        console.log(`Move Invalid`);
        resolve(false);
      }
    };
    ajax.onerror = () => reject(ajax.statusText);
    ajax.send(JSON.stringify({user1, user2, row, amount}));
  });
}

const newGame = async function(user1, user2) {
  return new Promise((resolve, reject) => {
    ajax.open('POST', '/game/new');
    ajax.setRequestHeader('Content-Type', 'application/json');
    ajax.onload = () => {
      if (ajax.status == 200) {
        console.log(`New Game Made!`);
        resolve(true);
      } else {
        console.log(`Failed to make New Game`);
        resolve(false);
      }
    };
    ajax.onerror = () => reject(ajax.statusText);
    ajax.send(JSON.stringify({user1, user2}));
  });
}

const winCheck = async function(user1, user2) {
  return new Promise((resolve, reject) => {
    ajax.open('POST', '/game/won');
    ajax.setRequestHeader('Content-Type', 'application/json');
    ajax.onload = () => {
      let winner = JSON.parse(ajax.responseText);
      //console.log(winner);
      if(undefined != winner){
        resolve(winner);
      } else {
        resolve(false);
      }
    };
    ajax.onerror = () => reject(ajax.statusText);
    ajax.send(JSON.stringify({user1, user2}));
  });
}

const resetGame = async function (user1, user2) {
  return new Promise((resolve, reject) => {
    ajax.open('PUT', '/game/reset');
    ajax.setRequestHeader('Content-Type', 'application/json');
    ajax.onload = () => {
      resolve(JSON.parse(ajax.responseText));
    };
    ajax.onerror = () => reject(ajax.statusText);
    ajax.send(JSON.stringify({user1, user2}));
  });
}

export { move, newGame, winCheck, resetGame };