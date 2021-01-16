import * as ex from "excalibur";
import { Adventurer } from "./actors/adventurer";
import { Floor } from "./actors/floor";
import { Platform } from "./actors/platform";

export class Game extends ex.Scene {
  constructor(engine: ex.Engine) {
    super(engine);

    this.add(new Floor(engine));
    this.add(new Adventurer(engine));
    this.add(new Platform(engine, 400, 800));
    this.add(new Platform(engine, 700, 700));
  }
}
