import * as ex from "excalibur";

import {
  playerFrontSprite,
  playerJumpLeftSprite,
  playerJumpRightSprite,
  playerSpritesheet,
} from "../resources";

type Activity = "standing" | "jumping_left" | "jumping_right" | "walking_left" | "walking_right";

export class Adventurer extends ex.Actor {
  private onFloor: boolean = false;

  private walkingAnimationRight: ex.Animation;
  private walkingAnimationLeft: ex.Animation;

  private previousActivity: Activity = "standing";
  private currentActivity: Activity = "standing";

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
      if (engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
        this.currentActivity = "walking_left";
      } else if (engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
        this.currentActivity = "walking_right";
      } else {
        this.currentActivity = "standing";
      }
    });

    this.body.collider.on("collisionend", () => {
      this.onFloor = false;
    });

    this.walkingAnimationRight = playerSpritesheet.getAnimationByIndices(
      engine,
      [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      50
    );

    this.walkingAnimationLeft = playerSpritesheet.getAnimationByIndices(
      engine,
      [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      50
    );
    this.walkingAnimationLeft.flipHorizontal = true;

    this.addDrawing("still", playerFrontSprite);
    this.addDrawing("jump-left", playerJumpLeftSprite);
    this.addDrawing("jump-right", playerJumpRightSprite);
    this.addDrawing("walk-left", this.walkingAnimationLeft);
    this.addDrawing("walk-right", this.walkingAnimationRight);
  }

  public onInitialize(engine: ex.Engine): void {
    this.setDrawing("jump-right");
  }

  public onPreUpdate(engine: ex.Engine, delta: number) {
    this.previousActivity = this.currentActivity;
  }

  public update(engine: ex.Engine, delta: number) {
    if (this.onFloor) {
      if (engine.input.keyboard.isHeld(ex.Input.Keys.Space)) {
        this.vel = new ex.Vector(this.vel.x, -400);
        this.acc = new ex.Vector(this.acc.x, 400);
        if (this.vel.x < 0) {
          this.currentActivity = "jumping_left";
        } else {
          this.currentActivity = "jumping_right";
        }
      }
    } else {
      if (this.vel.x > 0) {
        this.currentActivity = "jumping_right";
      } else {
        this.currentActivity = "jumping_left";
      }
    }

    if (engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
      if (this.onFloor) {
        this.acc = new ex.Vector(-1000, this.acc.y);
        this.currentActivity = "walking_left";
      } else {
        this.acc = new ex.Vector(-200, this.acc.y);
      }
    } else if (engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
      if (this.onFloor) {
        this.acc = new ex.Vector(1000, this.acc.y);
        this.currentActivity = "walking_right";
      } else {
        this.acc = new ex.Vector(200, this.acc.y);
      }
    } else if (this.onFloor) {
      this.acc.x = 0;
      this.vel.x = 0;
      this.currentActivity = "standing";
    }

    this.vel.x = Math.min(200, this.vel.x);
    this.vel.x = Math.max(-200, this.vel.x);

    if (this.currentActivity != this.previousActivity) {
      if (this.currentActivity === "standing") {
        this.setDrawing("still");
      } else if (this.currentActivity === "walking_left") {
        this.setDrawing("walk-left");
      } else if (this.currentActivity === "walking_right") {
        this.setDrawing("walk-right");
      } else if (this.currentActivity === "jumping_left") {
        this.setDrawing("jump-left");
      } else if (this.currentActivity === "jumping_right") {
        this.setDrawing("jump-right");
      }
    }

    return super.update(engine, delta);
  }
}
