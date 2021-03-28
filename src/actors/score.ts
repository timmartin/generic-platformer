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
    hudSprites.coins.draw(ctx, 0, 0);
    this.drawScoreDigits(ctx, this.gameState.score);
  }

  private drawScoreDigits(ctx: CanvasRenderingContext2D, score: number) {
    const digits = score.toString();

    let xOffset = hudSprites.coins.drawWidth + 5;

    for (const digit of digits) {
      const digitNum = Number.parseInt(digit, 10);

      // Line the center line of the digit with the center line
      // of the coin graphic.
      const yOffset =
        hudSprites.coins.drawHeight / 2 -
        hudSprites.numbers[digitNum].drawHeight / 2;

      hudSprites.numbers[digitNum].draw(ctx, xOffset, yOffset);

      xOffset += hudSprites.numbers[digitNum].drawWidth;
    }
  }
}
