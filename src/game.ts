import * as ex from "excalibur";
import { Adventurer } from "./actors/adventurer";
import { Floor } from "./actors/floor";

export class Game extends ex.Scene {
  constructor(engine: ex.Engine) {
    super(engine);

    this.add(new Floor(engine));
    this.add(new Adventurer(engine));
  }
}
