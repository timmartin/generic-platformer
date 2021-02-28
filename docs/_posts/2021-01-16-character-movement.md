---
title:  "Basic character movement"
---

If there's one thing I've learned over the years as a developer, it's that whatever
idea you initially have is always more complicated than you think it's going to
be, and thus too complicated. So it is with game development. I've previously tried
to write games that are original and interesting, but got bogged down immediately in
problems that I didn't foresee. This time I've deliberately gone for something as
simple as possible, and even so I've ended up having to think a little.

As Bob Ross says, "now, it's time to make some big decisions".

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

You might worry that the constant acceleration could eventually lead to the speed being unusably
fast, and that we should cap the terminal velocity. But it turns out that within the distance
that the player can fall on one screen, it doesn't really become a problem. I can revisit
that decision if I end up with the screen scrolling vertically.

But immediately this has actually involved a big decision: to model acceleration under gravity
realistically. This wasn't what I had in mind when I opened my code editor to write a
simple platform game, but Excalibur made it so easy to do that it's what I ended up doing.

And since we have relatively realistic falling under gravity, it invites us to have relatively
realistic left / right movement. Here's what I ended up with:

```typescript
  public update(engine: ex.Engine, delta: number) {
    if (this.onFloor && engine.input.keyboard.isHeld(ex.Input.Keys.Space)) {
      this.vel = new ex.Vector(this.vel.x, -400);
      this.acc = new ex.Vector(this.acc.x, 400);
    }

    if (engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
      if (this.onFloor) {
        this.acc = new ex.Vector(-1000, this.acc.y);
      } else {
        this.acc = new ex.Vector(-200, this.acc.y)
      }
    } else if (engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
      if (this.onFloor) {
        this.acc = new ex.Vector(1000, this.acc.y);
      } else {
        this.acc = new ex.Vector(200, this.acc.y);
      }
    } else if (this.onFloor) {
      this.acc.x = 0;
      this.vel.x = 0;
    }

    this.vel.x = Math.min(200, this.vel.x);
    this.vel.x = Math.max(-200, this.vel.x);

    return super.update(engine, delta);
  }
```

Space bar for jump. It just sets the velocity and resets the acceleration (in case
the acceleration got set to zero when the player landed on a platform).

Left and right arrows control the left and right movement, but they have a reduced
effect while the player is in the air. This is a compromise between real physics (where
you can hardly affect your trajectory in the air at all) and the desire in a platform
game to have some ability to control your character as it flies through the air.

Also, both left and right set the acceleration rather than immediately setting the velocity.
This leads to a small momentum effect where the player can't change direction instantly.
This is probably too much realism and too little fun as it currently stands.

The other detail is that once the player lands on the floor, they immediately stop moving
sideways. This reflects the fact that it's hard to control your motion in flight, but
you won't skid on the floor unless it's very slippery. I considered adding a very small
deceleration time so that the player would slip just a little as they landed, but it seemed
to be too much work. The motion is a bit unnatural, though.

I was worried that figuring out when the player was on a floor would be hard, but it turns
out to be pretty simple: I just set up this in the constructor:

```typescript
  constructor(engine: ex.Engine) {
    //...
    this.body.collider.on('collisionstart', () => {
      this.onFloor = true;
    });

    this.body.collider.on('collisionend', () => {
      this.onFloor = false;
    })
    //...
  }
```

This doesn't check that the collision is one with a horizontal surface, so the user is on
the "floor" if they graze past a vertical edge of a platform. This is actually quite
pleasing though, as it gives you the ability to jump from the edges of walls and platforms.
This rewards skill for the user, which is usually welcome in game design.