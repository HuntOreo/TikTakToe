import { Entrees } from './interface/interface';
import { Player } from './Player';
import { Board } from './Board';
import { WinCondition } from './WinCondition';

// Controls match progression
export class Match {
  public players!: Player[];
  public root!: number;
  private board!: Board;
  private builtBoard!: HTMLElement[][];
  public scoreKeepers = document.querySelectorAll('.score');

  constructor(private entrees: Entrees[], public foundation: HTMLCollection) {
    this.setPlayers(entrees);
    this.setBoard(foundation);
  }

  // Creates players for match
  private setPlayers(players: Entrees[]): void {
    this.players = players.map((player) => {
      return new Player({
        name: player.name,
        playerTurn: players.indexOf(player),
        marker: player.marker,
        myTurn: players.indexOf(player) === 0 ? true : false,
        score: 0,
      });
    });
  }

  // Gets whose turn it currently is.
  // If no player turn is set,
  // Default to player ones turn
  private getCurrent(players: Player[]): Player {
    const current = players.find((player) => player.current === true);
    if (current) return current;

    return players[0];
  }

  // Gets the next player. defaults to player one, if no player is found.
  private getNext(players: Player[], current: Player): Player {
    const next = players[players.indexOf(current) + 1];
    if (players.indexOf(current) + 1 > players.length - 1) return players[0];

    return next;
  }

  // Places the players marker.
  // Updates the board array with marker.
  private placeMarker(event: Event, player: Player): void {
    const target = event.target as HTMLElement;
    target.innerText = player.marker;
    this.builtBoard = this.board.update();
  }

  // Create Board
  private setBoard(foundation: HTMLCollection): void {
    this.board = new Board(foundation);
    this.builtBoard = this.board.create();

    for (let i = 0; i < this.scoreKeepers.length; i++) {
      this.scoreKeepers[i].innerHTML = `
      <h3>${this.players[i].name}</h3>
      <p>${this.players[i].score}</p>
    `;
    }
  }

  public getPlayers(): Player[] {
    return this.players;
  }

  // wipes board, then sets a fresh one for a new round.
  public restart(): void {
    const alert = document.querySelector('.results') as HTMLElement;
    const foundation = document.querySelector('.board')?.children;

    for (let i = 0; i < foundation!.length; i++) {
      foundation![i].innerHTML = `<div></div>`;
    }

    alert.classList.toggle('show');
    alert.classList.toggle('hide');

    this.setBoard(foundation!);
  }

  // Cycles through the players turn, then ends it, passing to the next player.
  public play(
    event: Event,
    listener: EventListener
  ): { winner: Player; result: boolean } {
    const current = this.getCurrent(this.players);
    const next = this.getNext(this.players, current);

    this.placeMarker(event, current);

    const condition = new WinCondition(
      current,
      this.builtBoard.length,
      this.builtBoard,
      listener
    );
    const results = condition.check();

    for (let i = 0; i < this.scoreKeepers.length; i++) {
      this.scoreKeepers[i].innerHTML = `
      <h3>${this.players[i].name}</h3>
      <p>${this.players[i].score}</p>
    `;
    }

    current.toggleTurn(false);
    next.toggleTurn(true);

    return results;
  }
}
