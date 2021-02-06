import playerFront from "./assets/player_front.png";
import playerJump from "./assets/player_jump.png";
import grassLeft from "./assets/grass_cliff_left.png";
import grassMid from "./assets/grass_mid.png";
import grassRight from "./assets/grass_cliff_right.png";

import * as ex from "excalibur";

export const Resources = {
  playerFront: new ex.Texture(playerFront),
  playerJump: new ex.Texture(playerJump),
  grassLeft: new ex.Texture(grassLeft),
  grassMid: new ex.Texture(grassMid),
  grassRight: new ex.Texture(grassRight),
};

export const playerFrontSprite = Resources.playerFront.asSprite();
export const playerJumpSprite = Resources.playerJump.asSprite();
export const grassLeftSprite = Resources.grassLeft.asSprite();
export const grassMidSprite = Resources.grassMid.asSprite();
export const grassRightSprite = Resources.grassRight.asSprite();
