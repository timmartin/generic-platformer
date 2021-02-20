---
title: A wider world
---

A major problem with the game up to this point has been that the entire game world is limited
by the screen (the size of which depends on the device you're using the game on). I put a quick
"floor" element at the bottom of the screen to catch the player when they aren't standing on a
platform, but if the player walks too far they just drop off into infinite space.

The first thing to do is to sort out the camera. If we want more than a single screenful of
game, there has to be some way for the camera to move around the world. Luckily Excalibur
comes with a bunch of camera presets that make it easy to make something that looks pretty good.

The camera is a property of the `Scene`. In my game we only have one scene, and it's called
(for now) `Game`.

Our first guess is just to have the camera follow the player around:

```typescript
export class Game extends ex.Scene {
  constructor(engine: ex.Engine) {
    super(engine);

    const adventurer = new Adventurer(engine);
    this.add(adventurer);

    //...

    this.camera.strategy.lockToActor(adventurer);
  }
}
```

This makes the scene scroll around like an old-school platform game. A nicer effect is
a camera that follows the actor, but with a little flexibility so that the player needn't
be in the dead centre of the screen:

```typescript
    this.camera.strategy.radiusAroundActor(adventurer, 200);
```

This is already a pretty nice effect. I think behind the scenes there's a bit of
sophistication to this to make the camera movement look smooth.

The floor was bothering me, because it was still using a lazy flat colour and didn't have a texture.
We also have the problem that the floor is supposed to look like it extends infinitely deep and
isn't just floating in empty space.

We can easily enough add some sprites to the floor, rendering it as a double layer of tiles so
that it looks thicker than the platforms above:

```typescript
export class Floor extends ex.Actor {
  //...

  onPostDraw(ctx: CanvasRenderingContext2D) {
    const numTiles = Math.ceil(this.width / grassMidSprite.drawWidth);

    for (let i = 0; i < numTiles; i++) {
      grassMidSprite.draw(
        ctx,
        -(this.width / 2) + i * grassMidSprite.drawWidth,
        -(this.height / 2)
      );
      grassCenterSprite.draw(
        ctx,
        -(this.width / 2) + i * grassMidSprite.drawWidth,
        -(this.height / 2) + grassCenterSprite.drawHeight
      );
    }
  }
}
```

No matter how thick we render the floor, it will still have empty space underneath
it if the camera is allowed to scroll that far. Luckily there's another camera
preset for this, and we can stack the two in a way that gives us the best of both:

```typescript
    this.camera.strategy.radiusAroundActor(adventurer, 200);
    this.camera.strategy.limitCameraBounds(new ex.BoundingBox(0, 0, width, engine.drawHeight + 100));
```

This means that the camera will not show anything outside the bounding box we've defined, but otherwise
will scroll around following the player. This looks pretty nice.

However, just stopping the camera movement isn't enough. At the moment the player can wakl off
the edge of the floor and fall into infinite space. We can easily fix this with a couple of
invisible barriers:

```typescript
export class Boundary extends ex.Actor {
  constructor(engine: ex.Engine, xPos: number, side: BoundarySide) {
    const thickness = 10;

    const xOffset = side == BoundarySide.Right ? thickness : 0;

    super({
      x: xPos - thickness / 2 + xOffset,
      y: 0,
      width: thickness,
      height: 10000,
      collisionType: ex.CollisionType.Fixed,
    });
  }
}
```

This introduces yet another problem: our collisions aren't sophisticated enough. Early on
I simplified the collision code by just assuming that anything the player came into contact
with was a platform, and that as long as they player remained in contact they were on a "floor".
Being on a floor has two effects: it means that the player can jump, and it changes the animation.

The naive approach to collisions actually had one nice side-effect: the player could "wall-jump" off
the edge of a platform, jumping higher than they would otherwise have been able to without completing
a jump to the higher platform. I noticed this ages ago, and didn't bother to fix it as it
was actually quite fun to be able to pull off a skillful effect like this.

The bigger problem only arose once there were large walls like the invisible walls at the edge of
the level: if you walked into the wall and then walked away, the collision handler would see
this as you having left a "floor" even though you hadn't left contact with another surface.

The solution is to examine the collision and see whether it has a vertical component. If it does,
we're on a floor and can do all our floor physics.

The Excalibur model complicates this a bit, because you want to handle the `oncollisionstart` and
`oncollisionend` events, but these events don't give you direction information. You need instead
to look at the `precollision` event. This event actually triggers every frame; I assume this is useful
if two actors are sliding past each other, and may have a series of mini-collisions each frame.

In our case, we can ditch the simple boolean "on floor" flag, and instead keep track of any floor we've
landed on in the `precollision` event. If we finish a collision with our current floor then we're in
the air again, but otherwise we can start and stop as many other non-floor collisions as we like
without it affecting us. This overlooks the possibility of colliding with two different (semi-)vertical
services at once, as for example if the player is standing in a valley between two surfaces.
But for now, we'll just ignore this.

```typescript
    this.on("precollision", (e: ex.PreCollisionEvent) => {
      if (e.intersection.y < 0) {
        this.currentFloor = e.other;
      }
    });

    this.on("collisionstart", () => {
      if (engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
        this.currentActivity = "walking_left";
      } else if (engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
        this.currentActivity = "walking_right";
      } else {
        this.currentActivity = "standing";
      }
    });

    this.on("collisionend", (e: ex.CollisionEndEvent) => {
      if (e.other == this.currentFloor) {
        this.currentFloor = null;
      }
    });
```

That's it. The player can move around wherever they like, in a world that can be as big as we want to make it.
