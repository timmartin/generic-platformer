import * as ex from "excalibur";
import { backgroundSprite } from "../resources";

export class Background extends ex.Actor {
  private camera: ex.Camera;

  private offset: ex.Vector;

  constructor(camera: ex.Camera, offset: ex.Vector = new ex.Vector(0, 0)) {
    super({
      x: 512,
      y: 512,
      width: 1024,
      height: 1024,
      collisionType: ex.CollisionType.PreventCollision,
    });

    this.offset = offset;
    this.camera = camera;

    this.addDrawing(backgroundSprite);
  }

  onPreUpdate() {
    this.pos.setTo(this.offset.x + this.camera.x / 3, this.offset.y + 512 + this.camera.y / 3);
  }
}
