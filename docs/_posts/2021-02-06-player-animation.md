---
title: Player animation
---

It looks pretty unnatural to have the player moving around the world without
any change.

The first task is to make the player look different while jumping. It turns
out that this can easily be done by loading two different drawings with
`addDrawing` and giving each a name, and then swapping the active
drawing with `setDrawing` during `update()`. You can see
[this diff](https://github.com/timmartin/generic-platformer/commit/9ba405526c9dfddf6af22615c7f6295a86afbdcf)
to see this in action.

This is OK, but the player always seems to be facing to the right even when
traveling leftwards. Obviously we could flip the image and then load it as a
separate texture, but that's wasteful. This is where the distinction between a
`Texture` and a `Sprite` comes in: we can create two `Sprite`s from the same
`Texture`, and have one flipped:

```typescript
export const playerJumpRightSprite = new ex.Sprite({image: Resources.playerJump});
export const playerJumpLeftSprite = new ex.Sprite({image: Resources.playerJump, flipHorizontal: true});
```

I believe this avoids loading the image twice, but still gives us two separate
`Drawable`s that we can swap between. Note that you can't call `.asSprite()` twice, because
that will return the same object twice and you'll end up with two references
to the same sprite.

It's easy enough to choose which sprite to use and call `setDrawable` appropriately
based on player movement,
[as you can see here](https://github.com/timmartin/generic-platformer/commit/2547c3b54b4b38747acff216c26623e6e327bca8).

This wasn't quite enough though, because I want some animation. You can create an
animation from a series of images, but it's better to load a single `Spritesheet`
with all the frames of the animation in it, so that's what I did.

Or tried to do, at any rate. The free art assets I'm using are set up for animation
with a sprite sheet, but it's done in a compact way where the images are packed as
closely as possible. Excalibur wants to load images from the sprite sheet in a
regular grid.

The best way I found to rearrange the images into a regular grid was to split them off by
using imagemagick crop:

```
$ convert player_spritesheet.png -crop 69x91+365+98 +repage -out duck.png
```

Here the exact offsets in the image are taken from the text file accompanying the
sprite sheet.

I could then pack these images into a sheet using the imagemagick `montage` command,
but in order to lay them out right I had to first resize them all to the same size:

```
$ convert -extent 72x97 -gravity south -background none front.png front_resized.png
```

Delete the old files and rename the new resized files, then I could paste them
together with:

```
$ montage duck.png front.png hurt.png jump.png stand.png walk01.png walk02.png \
    walk03.png walk04.png walk05.png walk06.png walk07.png walk08.png walk09.png \
    walk10.png walk11.png -geometry +0+0 -background none output.png
```

This generates a spritesheet on a regular grid, which can be used in Excalibur.
It's then easy enough to load this spritesheet and select out the frames that are
used for the walking animation:

```typescript
    this.walkingAnimationLeft = playerSpritesheet.getAnimationByIndices(
      engine,
      [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      50
    );
    this.walkingAnimationLeft.flipHorizontal = true;
```

There was another problem, though. My first attempt at setting the animation had a bunch
of logic like this:

```typescript
    if (engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
      if (this.onFloor) {
        // ...accelerate left quickly because feet are on the floor...

        this.setDrawing("walk-left");
      } else {
        //... accelerate left more slowly because we're floating ...

        this.setDrawing("jump-left");
      }
    }
```

This works fine when the drawings are fixed images, but when using an animation this
has the side-effect that it resets the animation on every frame, so the graphic never
animates.

I was able to work around this using the `wasPressed` function:

```typescript
    if (engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
      if (this.onFloor) {
        //...
        if (engine.input.keyboard.wasPressed(ex.Input.Keys.Left)) {
          this.setDrawing("walk-left");
        }
      } else {
        //...
        this.setDrawing("jump-left");
      }
    }
```

but this was pretty hard to maintain, because the decision about how to set the
animation is too closely tied to the keyboard handling logic. Instead, I
[introduced an abstraction](https://github.com/timmartin/generic-platformer/commit/0020c01759d41fa086383ada22fd20969717067e)
where the state is recalculated on each frame, but the old state is kept
and the drawing is only changed if the new state is different from the old state.
