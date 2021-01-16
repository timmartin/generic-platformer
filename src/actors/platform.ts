import * as ex from "excalibur";

export class Platform extends ex.Actor {
  constructor(engine: ex.Engine, x: number, y: number) {
    const thickness = 20;

    super({
      x,
      y,
      width: 400,
      height: thickness,
      color: ex.Color.Vermilion,
      collisionType: ex.CollisionType.Fixed,
    });
  }
}
