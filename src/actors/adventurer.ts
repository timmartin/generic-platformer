import * as ex from "excalibur";

export class Adventurer extends ex.Actor {
  constructor(engine: ex.Engine) {
    super({
      x: engine.drawWidth / 2,
      y: engine.drawHeight / 2,
      color: ex.Color.Violet,
      width: 40,
      height: 60,
    });
  }
}
