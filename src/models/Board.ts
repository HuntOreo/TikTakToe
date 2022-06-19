export class Board {
  private root!: number;

  constructor(private board: HTMLCollection) {}

  // Finds the amount of rows and columns on the board
  // amnt of rows should be same as columns.
  private findRoot(boardSize: number, counter = 1): number {
    if (counter < boardSize) {
      if (counter * counter === boardSize) return counter;
    }
    return this.findRoot(boardSize, counter + 1);
  }

  // Sets the amount of rows and columns
  private setRoot(): void {
    this.root = this.findRoot(Number(this.board?.length));
  }

  // Creates a 2D array represenitation of the board.
  // Returns the created array.
  public create(): HTMLElement[][] {
    this.setRoot();
    let row: HTMLElement[] = [];
    let column: HTMLElement[][] = [];
    for (let i = 0; i < this.root; i++) {
      for (let j = 0; j < this.root; j++) {
        const str = <HTMLElement>(<unknown>`<></>`);
        row = [...row, str];
      }
      column = [...column, row];
      row = [];
    }
    const builtBoard = [...column];

    return builtBoard;
  }

  // Updates the 2D array of the board
  // with the players placed marker,
  // returns the new updated 2D array.
  public update(): HTMLElement[][] {
    let row: HTMLElement[] = [];
    let column: HTMLElement[][] = [];
    for (let i = 0; i < Number(this.board?.length); i += this.root) {
      for (let j = i; j < i + this.root; j++) {
        const element = this.board[j].children[0] as HTMLElement;
        row = [...row, element];
      }
      column = [...column, row];
      row = [];
    }

    const builtBoard = [...column];
    return builtBoard;
  }
}
