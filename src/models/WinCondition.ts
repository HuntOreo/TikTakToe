import { Player } from './Player';

export class WinCondition {
  private draw = new Player({
    name: 'draw',
    playerTurn: -1,
    marker: 'd',
    myTurn: false,
    score: 0,
  });

  constructor(
    private player: Player,
    private root: number,
    private board: HTMLElement[][],
    private listener: EventListener
  ) {}

  // Checks to see if a winning move has been made on the board.
  public check(): { winner: Player; result: boolean } {
    const column = this.columnCheck(this.player);
    const row = this.rowCheck(this.player);
    const back = this.backCheck(this.player);
    const forward = this.forwardCheck(this.player);
    const moves = this.movesLeft();

    if (column.won) {
      return this.won(this.listener, column.elements);
    } else if (row.won) {
      return this.won(this.listener, row.elements);
    } else if (back.won) {
      return this.won(this.listener, back.elements);
    } else if (forward.won) {
      return this.won(this.listener, forward.elements);
    } else if (moves === 0) {
      return { winner: this.draw, result: false };
    }

    return { winner: this.player, result: false };
  }

  // makes result === true when won
  // removes click listener for tiles, removing ability to add to board.
  // highlights the winning tiles.
  private won(
    remove: EventListener,
    elements: HTMLElement[]
  ): { winner: Player; result: boolean } {
    for (let i = 0; i < this.root; i++) {
      for (let j = 0; j < this.root; j++) {
        const element = this.board[i][j];
        const parent = element.parentNode;
        parent?.removeEventListener('click', remove);
      }
    }

    this.color(elements);
    this.player.addScore();
    return { winner: this.player, result: true };
  }

  // Applies highlights depending on win condition.
  private color(elements: HTMLElement[]) {
    elements.forEach((element) => {
      element.style.backgroundColor = 'cb9efe';
    });
  }

  // Check row for win
  private rowCheck(player: Player): {
    elements: HTMLElement[];
    won: boolean;
  } {
    let count = 0;
    let divs: HTMLElement[] = [];

    for (let i = 0; i < this.root; i++) {
      for (let j = 0; j < this.root + 1; j++) {
        if (count < this.root) {
          if (this.board[i][j].innerText !== player.marker) break;

          count += 1;
          divs = [...divs, this.board[i][j]];
          continue;
        }
        const row = { elements: divs, won: true };
        return row;
      }
      divs = [];
      count = 0;
    }
    return { elements: divs, won: false };
  }

  // Checks for win in a column
  private columnCheck(player: Player): {
    elements: HTMLElement[];
    won: boolean;
  } {
    let count = 0;
    let divs: HTMLElement[] = [];

    for (let i = 0; i < this.root; i++) {
      for (let j = 0; j < this.root + 1; j++) {
        if (count < this.root) {
          if (this.board[j][i].innerText !== player.marker) break;

          count += 1;
          divs = [...divs, this.board[j][i]];
          continue;
        }
        const column = { elements: divs, won: true };
        return column;
      }
      divs = [];
      count = 0;
    }
    return { elements: divs, won: false };
  }

  // Checks for a win in a forward diagonal
  private forwardCheck(player: Player): {
    elements: HTMLElement[];
    won: boolean;
  } {
    let count = 0;
    let indexTwo = this.root - 1;
    let divs: HTMLElement[] = [];

    for (let i = 0; i < this.root; i++) {
      if (this.board[i][indexTwo].innerText === player.marker) {
        count += 1;
        divs = [...divs, this.board[i][indexTwo]];

        indexTwo -= 1;

        if (count === this.root) {
          const diagonal = {
            elements: divs,
            won: true,
          };

          return diagonal;
        }
      }
    }
    return { elements: divs, won: false };
  }

  // Checks for a win on a back diagonal.
  private backCheck(player: Player): {
    elements: HTMLElement[];
    won: boolean;
  } {
    let count = 0; // counter for how many times a marker appears diagonolly
    let divs: HTMLElement[] = []; // array of elemnts that have the players marker

    for (let i = 0; i < this.root; i++) {
      // if counter does not meet needed amount for win, scan board for following marker.
      if (count < this.root + 1) {
        if (this.board[i][i].innerText === player.marker) {
          count += 1;
          divs = [...divs, this.board[i][i]];

          if (count === this.root) {
            const diagonal = {
              elements: divs,
              won: true,
            };

            console.log('won');
            return diagonal;
          }
        }
      }
    }
    return { elements: divs, won: false };
  }

  private movesLeft(): number {
    const tiles = this.root * this.root;
    let moves = tiles;

    this.board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.innerText !== '') {
          moves -= 1;
        }
      });
    });

    return moves;
  }
}
