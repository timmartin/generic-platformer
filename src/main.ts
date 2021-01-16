import * as ex from "excalibur";

import { Game } from "./game";

const engine = new ex.Engine({
  backgroundColor: ex.Color.Black,
});

engine.on("visible", () => {
  console.log("start");
  engine.start();
});

engine.add("game", new Game(engine));
engine.goToScene("game");

const loader = new ex.Loader();

engine.start(loader);
