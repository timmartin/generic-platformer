---
title: Parallax background
---

The last remaining graphical element with a boring default is the background. This was just set
to black, which looks extremely low-effort. Even though our character is some sort of space alien,
it just doesn't look inviting.

I went back to the [Kenney](https://kenney.nl/) assets and picked up a background sprite, which looks
like this:

<img src="https://github.com/timmartin/generic-platformer/raw/v0.1.1/src/assets/background.png"
    alt="Background"
    width="512"
    height="512"
 />

There doesn't seem to be a simpler way to do this than just to create it as a new actor:

```typescript
import { backgroundSprite } from "../resources";

export class Background extends ex.Actor {
  constructor() {
    super({
      x: 512,
      y: 512,
      width: 2048,
      height: 2048,
      collisionType: ex.CollisionType.PreventCollision,
    });

    this.addDrawing(backgroundSprite);
  }

  //...
}
```

Note the `ex.CollisionType.PreventCollision`, which prevents any of our other elements from colliding with it,
and also prevents the system wasting any time calculating collisions with it.

This looks kind of flat though; we want to give the impression that this background is a long
way away and not nailed to the back of our platforms. A simple way to do that is with parallax, i.e.
making the background move depending on where the camera is.

At first thought it seems odd to have to move the background, because we're trying to make it look
like it's fixed in place, and things that are fixed in place don't move. But of course we're trying
to make an effect that implies depth in a 2D game engine, which means something will have to be faked.

Long story short, it's simplest if the platform and player objects are fixed in world coordinates and
we fake the depth by moving the background (which is a very simple object and doesn't interact with
anything). This means that as the camera moves right, the platforms won't move at all but the background
will move right a little bit, but less than the camera. In real 3D you'd transform things into
camera space where the camera would be fixed. We can compare these cases:

| Real 3D in camera coordinates | Fake 3D in 2D engine |
| --------------                | --------------       |
| Camera doesn't move           | Camera moves right   |
| Platform moves left a long way | Platform doesn't move |
| Background moves left a little | Platform moves right a little |

Obviously implementing this is going to involve getting access to the camera object somehow; at the moment all
camera movement is being automatically handled for us by Excalibur, and the code I've written doesn't
so much as read it. Luckily we can read the camera's current location really easily:


