import * as ex from "excalibur";

import { Resources } from "../resources";

export class Adventurer extends ex.Actor {
  private onFloor: boolean = false;

  constructor(engine: ex.Engine) {
    super({
      x: engine.drawWidth / 2,
      y: engine.drawHeight / 2,
      color: ex.Color.Violet,
      width: 66,
      height: 92,
      collisionType: ex.CollisionType.Active,
      acc: new ex.Vector(0, 400),
    });

    this.body.collider.on("collisionstart", () => {
      this.onFloor = true;
    });

    this.body.collider.on("collisionend", () => {
      this.onFloor = false;
    });

    this.addDrawing(Resources.playerFront);
  }

  public update(engine: ex.Engine, delta: number) {
    if (this.onFloor && engine.input.keyboard.isHeld(ex.Input.Keys.Space)) {
      this.vel = new ex.Vector(this.vel.x, -400);
      this.acc = new ex.Vector(this.acc.x, 400);
    }

    if (engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
      if (this.onFloor) {
        this.acc = new ex.Vector(-1000, this.acc.y);
      } else {
        this.acc = new ex.Vector(-200, this.acc.y);
      }
    } else if (engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
      if (this.onFloor) {
        this.acc = new ex.Vector(1000, this.acc.y);
      } else {
        this.acc = new ex.Vector(200, this.acc.y);
      }
    } else if (this.onFloor) {
      this.acc.x = 0;
      this.vel.x = 0;
    }

    this.vel.x = Math.min(200, this.vel.x);
    this.vel.x = Math.max(-200, this.vel.x);

    return super.update(engine, delta);
  }
}
