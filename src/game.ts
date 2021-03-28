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
  player: ex.Actor | undefined;
}

export class Game extends ex.Scene implements GameState {
  public score = 0;
  public player = undefined;

  public onInitialize(engine: ex.Engine) {
    this.player = new Adventurer(engine);

    const width = 2500;
    const height = 1000;

    const floor = new Floor(width, height);

    this.add(new Score(engine, this));

    this.add(new Background(this.camera));
    this.add(new Background(this.camera, new ex.Vector(1024, 0)));
    this.add(new Background(this.camera, new ex.Vector(1024 * 2, 0)));
    this.add(this.player);
    this.add(floor);
    this.add(new Platform(engine, 400, 850));
    this.add(new Platform(engine, 700, 690));
    this.add(new Coin(this, 720, 640));
    this.add(new Coin(this, 790, 640));
    this.add(new Coin(this, 860, 640));
    this.add(new Coin(this, 930, 640));
    this.add(new Coin(this, 1000, 680));
    this.add(new Boundary(engine, 0, BoundarySide.Left));
    this.add(new Boundary(engine, width, BoundarySide.Right));

    this.camera.strategy.radiusAroundActor(this.player, 200);
    this.camera.strategy.limitCameraBounds(
      new ex.BoundingBox(0, 0, width, height + floor.thickness)
    );
  }
}
