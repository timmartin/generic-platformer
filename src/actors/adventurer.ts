import * as ex from "excalibur";

export class Adventurer extends ex.Actor {
  constructor(engine: ex.Engine) {
    super({
      x: engine.drawWidth / 2,
      y: engine.drawHeight / 2,
      color: ex.Color.Violet,
      width: 40,
      height: 60,
      collisionType: ex.CollisionType.Active,
      acc: new ex.Vector(0, 400),
    });
  }

  public update(engine: ex.Engine, delta: number) {
    if (engine.input.keyboard.isHeld(ex.Input.Keys.Space)) {
      this.vel = new ex.Vector(0, -400);
      this.acc = new ex.Vector(0, 400);
    }

    if (engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
      this.acc = new ex.Vector(-800, this.acc.y);
    } else if (engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
      this.acc = new ex.Vector(800, this.acc.y);
    } else {
      this.acc.x = 0;
    }

    this.vel.x = Math.min(200, this.vel.x);
    this.vel.x = Math.max(-200, this.vel.x);

    return super.update(engine, delta);
  }
}
