import * as ex from "excalibur";

export enum BoundarySide {
  Left = "L",
  Right = "R",
}

// A boundary is an invisible wall that prevents players and other
// objects from straying outside the bounds of the game.
export class Boundary extends ex.Actor {
  constructor(engine: ex.Engine, xPos: number, side: BoundarySide) {
    const thickness = 10;

    const xOffset = side == BoundarySide.Right ? thickness : 0;

    super({
      x: xPos - thickness / 2 + xOffset,
      y: 0,
      width: thickness,
      height: 10000,
      collisionType: ex.CollisionType.Fixed,
    });
  }
}
