---
title:  "Basic character movement"
---

If there's one thing I've learned over the years as a developer, it's that whatever
idea you initially have is always more complicated than you think it's going to
be, and thus too complicated. So it is with game development. I've previously tried
to write games that are original and interesting, but got bogged down immediately in
problems that I didn't foresee. This time I've deliberately gone for something as
simple as possible, and even so I've ended up having to think a little.

As Bob Ross says, "now, it's time to make make some big decisions".

In the case of a platformer, even one that's deliberately setting out to be ultimately
generic, there are some big decisions to make straight out of the gate that have a
surprising impact on the rest of the project. The first thing I hit was character movement.

Start with falling. Copying some code from one of the examples, it's easy enough to get
the player to fall:

```typescript
export class Adventurer extends ex.Actor {
  constructor(engine: ex.Engine) {
    super({
      x: engine.drawWidth / 2,
      y: engine.drawHeight / 2,
      color: ex.Color.Violet,
      width: 40,
      height: 60,
      collisionType: ex.CollisionType.Active,
      acc: new ex.Vector(0, 400),
    });
  }
}
```

That <code>acc: new ex.Vector(0, 400)</code> is doing all the work: it's a constant acceleration
downwards (positive Y is downwards in our world, which models gravity pretty accurately. Combined
with the collision type, the player will fall down and hit the floor.

![Player falling]({{ site.baseurl }}/video/player_falling.mp4)
