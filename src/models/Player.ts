import { Playable } from './interface/interface';

export class Player {
  constructor(public player: Playable) {}

  get name(): string {
    return this.player.name;
  }

  get id(): number {
    return this.player.playerTurn;
  }

  get marker(): string {
    return this.player.marker;
  }

  get current(): boolean {
    return this.player.myTurn;
  }

  get score(): number {
    return this.player.score;
  }

  public addScore(): void {
    this.player.score += 1;
  }

  public changeName(newName: string): void {
    this.player.name = newName;
  }

  public toggleTurn(status: boolean): void {
    this.player.myTurn = status;
  }
}
