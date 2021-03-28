import playerSpritesheetImage from "./assets/player_spritesheet.png";
import grassLeftImage from "./assets/grass_cliff_left.png";
import grassMidImage from "./assets/grass_mid.png";
import grassRightImage from "./assets/grass_cliff_right.png";
import grassCenterImage from "./assets/grass_center.png";
import background from "./assets/background.png";
import coin from "./assets/coin_gold.png";
import hudCoins from "./assets/hud_coins.png";
import hud0 from "./assets/hud_0.png";
import hud1 from "./assets/hud_1.png";
import hud2 from "./assets/hud_2.png";
import hud3 from "./assets/hud_3.png";
import hud4 from "./assets/hud_4.png";
import hud5 from "./assets/hud_5.png";
import hud6 from "./assets/hud_6.png";
import hud7 from "./assets/hud_7.png";
import hud8 from "./assets/hud_8.png";
import hud9 from "./assets/hud_9.png";

import * as ex from "excalibur";

export const Resources = {
  playerSheet: new ex.Texture(playerSpritesheetImage),
  grassLeft: new ex.Texture(grassLeftImage),
  grassMid: new ex.Texture(grassMidImage),
  grassRight: new ex.Texture(grassRightImage),
  grassCenter: new ex.Texture(grassCenterImage),
  background: new ex.Texture(background),
  coin: new ex.Texture(coin),
  hudCoins: new ex.Texture(hudCoins),
  num0: new ex.Texture(hud0),
  num1: new ex.Texture(hud1),
  num2: new ex.Texture(hud2),
  num3: new ex.Texture(hud3),
  num4: new ex.Texture(hud4),
  num5: new ex.Texture(hud5),
  num6: new ex.Texture(hud6),
  num7: new ex.Texture(hud7),
  num8: new ex.Texture(hud8),
  num9: new ex.Texture(hud9),
};

export const playerSpritesheet = new ex.SpriteSheet(
  Resources.playerSheet,
  4,
  4,
  72,
  97
);
export const playerFrontSprite = playerSpritesheet.getSprite(1);

export const playerJumpRightSprite = playerSpritesheet.getSprite(3);
export const playerJumpLeftSprite = playerSpritesheet.getSprite(3).clone();
playerJumpLeftSprite.flipHorizontal = true;

export const grassLeftSprite = Resources.grassLeft.asSprite();
export const grassMidSprite = Resources.grassMid.asSprite();
export const grassRightSprite = Resources.grassRight.asSprite();
export const grassCenterSprite = Resources.grassCenter.asSprite();

export const backgroundSprite = Resources.background.asSprite();

export const coinSprite = Resources.coin.asSprite();

export const hudSprites = {
  coins: Resources.hudCoins.asSprite(),
  numbers: [
    Resources.num0.asSprite(),
    Resources.num1.asSprite(),
    Resources.num2.asSprite(),
    Resources.num3.asSprite(),
    Resources.num4.asSprite(),
    Resources.num5.asSprite(),
    Resources.num6.asSprite(),
    Resources.num7.asSprite(),
    Resources.num8.asSprite(),
    Resources.num9.asSprite(),
  ],
};
