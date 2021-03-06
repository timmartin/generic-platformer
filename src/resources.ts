import playerSpritesheetImage from "./assets/player_spritesheet.png";
import grassLeftImage from "./assets/grass_cliff_left.png";
import grassMidImage from "./assets/grass_mid.png";
import grassRightImage from "./assets/grass_cliff_right.png";
import grassCenterImage from "./assets/grass_center.png";
import background from "./assets/background.png";

import * as ex from "excalibur";

export const Resources = {
  playerSheet: new ex.Texture(playerSpritesheetImage),
  grassLeft: new ex.Texture(grassLeftImage),
  grassMid: new ex.Texture(grassMidImage),
  grassRight: new ex.Texture(grassRightImage),
  grassCenter: new ex.Texture(grassCenterImage),
  background: new ex.Texture(background),
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
