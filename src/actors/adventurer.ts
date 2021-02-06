import * as ex from "excalibur";

import {
  playerFrontSprite,
  playerJumpLeftSprite,
  playerJumpRightSprite,
} from "../resources";

export class Adventurer extends ex.Actor {
  private onFloor: boolean = false;

  constructor(engine: ex.Engine) {
    super({
      x: engine.drawWidth / 2,
      y: engine.drawHeight / 2,
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

    this.addDrawing("still", playerFrontSprite);
    this.addDrawing("jump-left", playerJumpLeftSprite);
    this.addDrawing("jump-right", playerJumpRightSprite);
  }

  public onInitialize(engine: ex.Engine): void {
    this.setDrawing("still");
  }

  public update(engine: ex.Engine, delta: number) {
    if (this.onFloor) {
      if (engine.input.keyboard.isHeld(ex.Input.Keys.Space)) {
        this.vel = new ex.Vector(this.vel.x, -400);
        this.acc = new ex.Vector(this.acc.x, 400);
      } else {
        this.setDrawing("still");
      }
    } else {
      if (this.vel.x < 0) {
        this.setDrawing("jump-left");
      } else {
        this.setDrawing("jump-right");
      }
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
