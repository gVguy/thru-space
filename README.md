# thru-space

Add space travel to your website! 

A tiny dependency-free javascript library for creating an effect of **flying through the universe at light speed** and rendering it on a canvas.

<p align="center">✨ <b><a href="https://gvguy.github.io/thru-space/">Live interactive demo</a></b> ✨</p>

<p align="center">
  <img alt="Flying thru space" src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnlrNjBuNXRvbnN0ZDZqZXltdmk1eTRoeGZubnU5aG1scGZlZ3pheiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/X0dJGrOR0q1ExlBRXg/giphy.gif">
</p>

## Installation

### npm

```
npm i thru-space
```

```js
import ThruSpace from 'thru-space'
```

### CDN

```
<script src="https://unpkg.com/thru-space@latest"></script>
```

## Usage

Provide a canvas element as the first argument.

```js
const canvas = document.querySelector('#canvas')

const thruSpace = new ThruSpace(canvas).start()
```

**⚠️ Important: set canvas size with styles.** thru-space internally manages canvas size attributes and context scale. In order to look sharp on displays with various DPRs it will observe the size of the canvas and override its `width` and `height` attributes. However, *to allow setting custom size with CSS, it doesn't apply inline styles to scale it back down*.

Here's example CSS you can use to make your canvas full-screen and thru-space will take care of managing its size attributes and context scale to make it look sharp on all displays.

```css
#canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}
```

## API

### start()

Starts the animation loop. In most cases, it can be called directly after instantiating the class.

### stop()

Stops the animation loop.

### destroy()

Stops the animation loop and disconnects resize observer. Call it if you're going to remove the canvas from DOM.

### lightSpeed()

Transitions to light speed!

### normalSpeed()

Transitions back to normal speed.

### toggleSpeed()

Toggles between the two speed modes.

### isLightSpeed

`true` if currently in light speed mode, otherwise `false`.

## Options

You can customize the effect by providing options object as the second argument.

All fields are optional. Following are default values:

```js
new ThruSpace(canvas, {
  starsPerPx: 0.0005,
  speedNormal: 0.5,
  speedLight: 15,
  transitionSpeed: 0.2,
  starSize: { min: 1, max: 3 },
  lightSpeedTailLength: 0.3,
  starColor: {
    base: [255,255,255],
    additional: [],
    mix: { min: 0, max: 1 }
  },
  isInitialLightSpeed: false
})
```

### starsPerPx

Controls stars density.

> ⚠️ Be careful with this option, setting this number too high can significantly affect the performance,  especially on higher-resolution screens.

### speedNormal

Controls speed in normal mode.

### speedLight

Controls speed in light speed mode.

### transitionSpeed

Controls transition speed between modes.

### starSize

Can be a number or an object. If it's a number, all stars will have that fixed size. If it's an object, star sizes will be randomized based on its fields (see below).

### starSize.max

Star sizes are randomized, this controls the upper limit.

### starSize.min

Star sizes are randomized, this controls the lower limit.

### starSize.easingFn

You can provide a custom function to shape the randomization curve for star sizes.
The function receives a linear value between `0` and `1`, and should return an eased value in the same range.

Ease-in curves favor smaller stars. Ease-out curves produce more larger stars.

> For a list of easing functions, consult [this gist](https://gist.github.com/gVguy/f6680f700ce6d1e796c5246edfcef7ce).

### lightSpeedTailLength

Controls the length of the trail behind stars in light speed mode.

### starColor.base

Controls base color of stars. Expects an array of exactly three numbers, representing RGB color components.

### starColor.additional

By default stars use a single color. Use this field to set other colors to get randomly mixed with the base. Expects an array of arrays of exactly three numbers, representing RGB color components, e.g.:

```js
new ThruSpace(canvas, {
  starColor: {
    additional: [
      [255, 0, 0], // red
      [0, 0, 255]  // blue
    ]
  }
})
```

Each star will pick a random color from this array and mix it with the base color with a ratio specified by the `mix` field (see below).

### starColor.mix

Can be a number in `0-1` range or an object. Higher values mix more of the additional colors, lower values favor the base color.

If it's a number, all stars will have that fixed color mix ratio. If it's an object, star sizes will be randomized based on its fields (see below).

### starColor.mix.max

Star color mix ratio will get randomized for each star. This field controls the upper limit. Should be within `0-1` range.

### starColor.mix.min

Star color mix ratio will get randomized for each star. This field controls the lower limit. Should be within `0-1` range.

### starColor.mix.easingFn

You can provide a custom function to shape the randomization curve for star color mix ratio.
The function receives a linear value between `0` and `1`, and should return an eased value in the same range.

Ease-in curves favor the base color. Ease-out curves favor the additional color.

> For a list of easing functions, consult [this gist](https://gist.github.com/gVguy/f6680f700ce6d1e796c5246edfcef7ce).

### isInitialLightSpeed

Normally the instance is initialized in normal speed. Set this to `true` to start with light speed instead.
