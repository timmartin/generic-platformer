import * as ex from "excalibur";

import { grassCenterSprite, grassMidSprite } from "../resources";

// A Floor is similar to a Platform, but doesn't have left and right end caps,
// because it's assumed that it's placed such that the player can never reach
// past the edge of the floor.
export class Floor extends ex.Actor {
  public thickness: number;

  // Width and height define the whole play area
  constructor(width: number, height: number) {
    const thickness = 140;
    super({
      x: width / 2,
      y: height + thickness / 2,
      width: width,
      height: thickness,
      collisionType: ex.CollisionType.Fixed,
    });

    this.thickness = thickness;
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
