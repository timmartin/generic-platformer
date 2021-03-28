import * as ex from "excalibur";
import { Adventurer } from "./actors/adventurer";
import { Boundary, BoundarySide } from "./actors/boundary";
import { Floor } from "./actors/floor";
import { Platform } from "./actors/platform";
import { Background } from "./actors/background";
import { Score } from "./actors/score";
import { Coin } from "./actors/coin";

export interface GameState {
  score: number;
}

export class Game extends ex.Scene implements GameState {
  public score = 0;

  public onInitialize(engine: ex.Engine) {
    const adventurer = new Adventurer(engine);

    const width = 2500;
    const height = 1000;

    const floor = new Floor(width, height);

    this.add(new Score(this));

    this.add(new Background(this.camera));
    this.add(new Background(this.camera, new ex.Vector(1024, 0)));
    this.add(new Background(this.camera, new ex.Vector(1024 * 2, 0)));
    this.add(adventurer);
    this.add(floor);
    this.add(new Platform(engine, 400, 850));
    this.add(new Platform(engine, 700, 690));
    this.add(new Coin(720, 640));
    this.add(new Boundary(engine, 0, BoundarySide.Left));
    this.add(new Boundary(engine, width, BoundarySide.Right));

    this.camera.strategy.radiusAroundActor(adventurer, 200);
    this.camera.strategy.limitCameraBounds(
      new ex.BoundingBox(0, 0, width, height + floor.thickness)
    );
  }
}
