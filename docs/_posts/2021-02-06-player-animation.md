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
