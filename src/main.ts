import * as ex from "excalibur";

import { Game } from "./game";
import { Resources } from "./resources";

const engine = new ex.Engine({
  backgroundColor: ex.Color.Black,
});

const loader = new ex.Loader();

for (const key in Resources) {
  loader.addResource(Resources[key]);
}

engine.on("visible", () => {
  engine.start();
});

engine.add("game", new Game(engine));
engine.goToScene("game");

engine.start(loader);
