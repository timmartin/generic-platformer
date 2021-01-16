import * as ex from "excalibur";

export class Floor extends ex.Actor {
  constructor(engine: ex.Engine) {
    const thickness = 20;

    super({
      x: engine.drawWidth / 2,
      y: engine.drawHeight - thickness,
      width: engine.drawWidth,
      height: thickness,
      collisionType: ex.CollisionType.Fixed,
      color: ex.Color.Vermilion
    });
  }
}
