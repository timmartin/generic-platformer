import * as ex from "excalibur";

import { coinSprite } from "../resources";

export class Coin extends ex.Actor {
  constructor(x: number, y: number) {
    super({
      x,
      y,
      collisionType: ex.CollisionType.Passive,
    });
  }

  public onInitialize() {
    this.addDrawing(coinSprite);
  }
}
