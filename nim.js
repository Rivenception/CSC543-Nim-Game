export class NimGame {
  #game = [1, 3, 5, 7];
  #moves = 0;
  constructor() {
    this.reset();
  }

  get state() {
    return this.#game;
  }
  
  get ended() {
    return this.#game.every(i => i === 0);
  }

  // Determines if player 0 or player 1 wins, after checking if game ended
  get winner() {
    if (this.ended){
      return this.#moves % 2;
    } else {
      return undefined;
    }
  }

  get moves() {
    return this.#moves
  }

  reset() {
    this.#game = [1, 3, 5, 7];
    this.#moves = 0;
  }

  // This is zero indexed
  move(row, amount) {
    // row === undefined only catches undefined, !amount catches all falsey values
    if (
      row > this.#game.length
      || amount > this.#game[row]
      || row === undefined
      || !amount
    ) {
      throw new Error(`Invalid Move: Cannot remove ${amount} from ${this.#game[row]} in row ${row}`);
    }
    this.#game[row] -= amount;
    this.#moves++;
  }
}

// TEST CODE, should not be executed unless testing this class
// Parts can be reused after importing NimGame
/*
const nim = new NimGame();
console.log(nim.state);
nim.move(0,1);
try {
  nim.move();
} catch (error) {
  console.log(`Caught: ${error}`);
}
console.log(nim.state, nim.moves);

nim.reset()
console.log(nim.ended, nim.moves, nim.winner)
const moves = [[0,1], [1,3], [2,5], [3,7]];
moves.map(m => nim.move(m[0], m[1]));
console.log(nim.state);
console.log(nim.ended, nim.moves, nim.winner);
*/
