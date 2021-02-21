import * as ex from "excalibur";
import { backgroundSprite } from "../resources";

export class Background extends ex.Actor {
  private camera: ex.Camera;

  constructor(camera: ex.Camera) {
    super({
      x: 512,
      y: 512,
      width: 2048,
      height: 2048,
      collisionType: ex.CollisionType.PreventCollision,
    });

    this.camera = camera;

    this.addDrawing(backgroundSprite);
  }

  onPreUpdate() {
    this.pos.setTo(512 + this.camera.x / 3, 512 + this.camera.y / 3);
  }
}
