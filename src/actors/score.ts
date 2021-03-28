import * as ex from "excalibur";

import { GameState } from "../game";
import { hudSprites } from "../resources";

// Display the score, which is a number of coins collected, as part
// of the HUD.
export class Score extends ex.ScreenElement {
  private gameState: GameState;

  constructor(gameState: GameState) {
    super();

    this.gameState = gameState;
  }

  onPostDraw(ctx: CanvasRenderingContext2D) {
    const score = 42;

    hudSprites.coins.draw(ctx, 0, 0);
    this.drawScoreDigits(ctx, this.gameState.score);
  }

  private drawScoreDigits(ctx: CanvasRenderingContext2D, score: number) {
    const digits = score.toString();

    let offset = hudSprites.coins.drawWidth;

    for (const digit of digits) {
      const digitNum = Number.parseInt(digit, 10);
      hudSprites.numbers[digitNum].draw(ctx, offset, 0);

      offset += hudSprites.numbers[digitNum].drawWidth;
    }
  }
}
