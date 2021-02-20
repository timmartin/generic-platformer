import * as ex from "excalibur";

import { grassCenterSprite, grassMidSprite } from "../resources";

// A Floor is similar to a Platform, but doesn't have left and right end caps,
// because it's assumed that it's placed such that the player can never reach
// past the edge of the floor.
export class Floor extends ex.Actor {
  constructor(engine: ex.Engine, width: number) {
    const thickness = 20;

    super({
      x: width / 2,
      y: engine.drawHeight - thickness,
      width: width,
      height: thickness,
      collisionType: ex.CollisionType.Fixed,
    });
  }

  onPostDraw(ctx: CanvasRenderingContext2D) {
    const numTiles = Math.ceil(this.width / grassMidSprite.drawWidth);

    for (let i = 0; i < numTiles; i++) {
      grassMidSprite.draw(
        ctx,
        -(this.width / 2) + i * grassMidSprite.drawWidth,
        -(this.height / 2)
      );
      grassCenterSprite.draw(
        ctx,
        -(this.width / 2) + i * grassMidSprite.drawWidth,
        -(this.height / 2) + grassCenterSprite.drawHeight
      );
    }
  }
}
