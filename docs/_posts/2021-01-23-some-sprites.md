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

However, for the platforms things are a little more difficult. The examples in the
docs all assume that you're associating a single image with an actor, but this
doesn't work for my platforms because I want them to be variable length with
the obvious `(start_cap, middle, ..., middle, end_cap)` structure.

Poking around with some of the Excalibur examples it seemed like the way to achieve
this was to override the `onPostDraw` method. The name of this doesn't make it
very intuitive, but as far as I can tell this is the recommended way to do
things.

Within this method you're free to draw as many sprites as you want, so it's just
a matter of looping through the right number of times:

```typescript
import {
  grassLeftSprite,
  grassMidSprite,
  grassRightSprite,
} from "../resources";

export class Platform extends ex.Actor {
  //...

  onPostDraw(ctx: CanvasRenderingContext2D) {
    const overhang = 30;

    const drawWidth = this.width + overhang * 2;

    const numTiles = Math.ceil(drawWidth / grassMidSprite.drawWidth);

    grassLeftSprite.draw(ctx, -(drawWidth / 2), -(this.height / 2));

    if (numTiles > 2) {
      for (let i = 1; i < numTiles - 1; i++) {
        grassMidSprite.draw(ctx, -(drawWidth / 2) + i * grassMidSprite.drawWidth, -(this.height / 2));
      }
    }

    grassRightSprite.draw(ctx, drawWidth / 2 - grassRightSprite.drawWidth, -(this.height / 2));
  }
}
```

This assumes that the platform is sized appropriately that a whole number of cells
can be drawn, which avoids issues with textures not tiling.

Another small detail is that I added an overhang on each side where sprites
are drawn outside the bounds of the `Actor` object. The idea here is that this
will be drawn but won't participate in collision detection. This has the effect
that if they player gets too close to the edge they will fall "through" it, which
in practice given the rounded corners makes it look like they slipped off.

The physics isn't very detailed here, because the real shape of the platform
is still rectangular and thus they are either 100% supported by the platform or
falling through it, there is no intermediate stage where the player is sliding
at an angle. However, given the way that I've calculated sideways acceleration
when the player is not standing on a platform (sideways speed changes gradually
rather than instantly) it actually works fairly well.
