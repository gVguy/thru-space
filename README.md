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

### starsPerPx

Default: `0.0005`

Controls stars density.

> ⚠️ Be careful with this option, setting this number too high can significantly affect the performance,  especially on higher-resolution screens.

### speedNormal

Default: `0.5`

Controls speed in normal mode.

### speedLight

Default: `15`

Controls speed in light speed mode.

### transitionSpeed

Default: `0.2`

Controls transition speed between modes.

### starMaxSize

Default: `3`

Star sizes are randomized, this controls the upper limit.

### starMinSize

Default: `1`

Star sizes are randomized, this controls the lower limit.

### lightSpeedTailLength

Default: `0.3`

Controls the length of the trail behind stars in light speed mode.
