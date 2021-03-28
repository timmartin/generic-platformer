import * as ex from "excalibur";

import { GameState } from "../game";
import { coinSprite } from "../resources";

export class Coin extends ex.Actor {
  private gameState: GameState;

  constructor(gameState: GameState, x: number, y: number) {
    super({
      x,
      y,
      collisionType: ex.CollisionType.Passive,
    });

    this.gameState = gameState;

    this.on("collisionstart", (e: ex.CollisionStartEvent) => {
      if (e.other == this.gameState.player) {
        this.gameState.score += 1;
        this.kill();
      }
    });
  }

  public onInitialize() {
    this.addDrawing(coinSprite);
  }
}
