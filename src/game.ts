import * as ex from "excalibur";
import { Adventurer } from "./actors/adventurer";
import { Floor } from "./actors/floor";
import { Platform } from "./actors/platform";

export class Game extends ex.Scene {
  constructor(engine: ex.Engine) {
    super(engine);

    const adventurer = new Adventurer(engine);

    this.add(new Floor(engine));
    this.add(adventurer);
    this.add(new Platform(engine, 400, 800));
    this.add(new Platform(engine, 700, 650));

    this.camera.strategy.radiusAroundActor(adventurer, 200);
  }
}
