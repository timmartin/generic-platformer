---
title: Some sprites
---

Excalibur makes it easy to create a mock-up of a game using just coloured
rectangles, but putting some real graphics in will make a massive difference
to making it seem like a real game. Obviously this requires having some
art assets, but luckily there are lots of creative commons sources out there
so you don't have to draw your own.

![Adding some sprites to the game]({{ site.baseurl }}/images/some_sprites1.png)

I picked up some cartoony platform graphics from [Kenney](https://kenney.nl/),
which are pretty nice and have CC0 licensing.

For the player character, it's just a matter of following the tutorials to load
an image and apply it as a drawable:

```typescript
import { Resources } from "../resources";

export class Adventurer extends ex.Actor {
  //...
  constructor(engine: ex.Engine) {
    super({
      x: engine.drawWidth / 2,
      y: engine.drawHeight / 2,
      width: 66,
      height: 92,
      collisionType: ex.CollisionType.Active,
      acc: new ex.Vector(0, 400),
    });
    //...
    this.addDrawing(Resources.playerFront);
  }
  //...
}
```

I had to set the `width` and `height` to the correct values for the image I'm
loading, which doesn't affect the rendering of the image but does get used for
calculating collisions. Luckily the image was a sensible size relative to the
other sizes in my game anyway.
