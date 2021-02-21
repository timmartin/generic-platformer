import * as ex from "excalibur";
import { Adventurer } from "./actors/adventurer";
import { Boundary, BoundarySide } from "./actors/boundary";
import { Floor } from "./actors/floor";
import { Platform } from "./actors/platform";

export class Game extends ex.Scene {
  public onInitialize(engine: ex.Engine) {
    const adventurer = new Adventurer(engine);

    const width = 2500;

    this.add(adventurer);
    this.add(new Floor(engine, width));
    this.add(new Platform(engine, 400, 800));
    this.add(new Platform(engine, 700, 650));
    this.add(new Boundary(engine, 0, BoundarySide.Left));
    this.add(new Boundary(engine, width, BoundarySide.Right));

    this.camera.strategy.radiusAroundActor(adventurer, 200);
    this.camera.strategy.limitCameraBounds(new ex.BoundingBox(0, 0, width, engine.drawHeight + 100));
  }
}
