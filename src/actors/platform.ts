import * as ex from "excalibur";

import {
  grassLeftSprite,
  grassMidSprite,
  grassRightSprite,
} from "../resources";

export class Platform extends ex.Actor {
  constructor(engine: ex.Engine, x: number, y: number) {
    const width = 430;
    const thickness = 30;

    super({
      x,
      y,
      width: width,
      height: thickness,
      collisionType: ex.CollisionType.Fixed,
    });
  }

  onPostDraw(ctx: CanvasRenderingContext2D) {
    // Draw the platform a little wider than the actor, because a player
    // standing on the very extremity shouldn't be supported by the platform.
    const overhang = 30;

    // Overhang on both ends
    const drawWidth = this.width + overhang * 2;

    const numTiles = Math.ceil(drawWidth / grassMidSprite.drawWidth);

    grassLeftSprite.draw(ctx, -(drawWidth / 2), -(this.height / 2));

    if (numTiles > 2) {
      for (let i = 1; i < numTiles - 1; i++) {
        grassMidSprite.draw(ctx, -(drawWidth / 2) + i * grassMidSprite.drawWidth, -(this.height / 2));
      }
    }

    grassRightSprite.draw(ctx, drawWidth / 2 - grassRightSprite.drawWidth, -(this.height / 2));
  }
}
