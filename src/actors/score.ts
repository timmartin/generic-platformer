import * as ex from "excalibur";

import { GameState } from "../game";
import { hudSprites } from "../resources";

// Display the score, which is a number of coins collected, as part
// of the HUD.
export class Score extends ex.ScreenElement {
  private gameState: GameState;
  private engine: ex.Engine;

  constructor(engine: ex.Engine, gameState: GameState) {
    super();

    this.engine = engine;
    this.gameState = gameState;
  }

  onPostDraw(ctx: CanvasRenderingContext2D) {
    const digitsWidth = this.drawScoreDigits(ctx, this.gameState.score);
    hudSprites.coins.draw(
      ctx,
      this.engine.screen.drawWidth -
        digitsWidth -
        5 -
        hudSprites.coins.drawWidth,
      0
    );
  }

  // Draw the digits for the score and return the total draw width of that
  private drawScoreDigits(ctx: CanvasRenderingContext2D, score: number) {
    // We draw the digits right-to-left, so reverse the order here
    const digits = score.toString().split("").reverse();

    let currentWidth = 0;

    for (const digit of digits) {
      const digitNum = Number.parseInt(digit, 10);
      const digitSprite = hudSprites.numbers[digitNum];

      const xOffset = this.engine.screen.drawWidth - currentWidth;

      // Line the center line of the digit with the center line
      // of the coin graphic.
      const yOffset =
        hudSprites.coins.drawHeight / 2 - digitSprite.drawHeight / 2;

      digitSprite.draw(ctx, xOffset - digitSprite.drawWidth, yOffset);

      currentWidth += digitSprite.drawWidth;
    }

    return currentWidth;
  }
}
