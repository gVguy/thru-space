export type Opts = {
  starsPerPx: number
  speedNormal: number
  speedLight: number
  transitionSpeed: number
  starMaxSize: number
  starMinSize: number
  lightSpeedTailLength: number
}

export default class ThruSpace {
  isLightSpeed: boolean = false
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private canvasWidth = 0
  private canvasHeight = 0
  private stars: Star[] = []
  private animationFrameId: number | null = null
  private transitionProgress = 0
  private resizeObserver: ResizeObserver

  // opts
  private starsPerPx: number
  private speedNormal: number
  private speedLight: number
  private transitionSpeed: number
  private starMaxSize: number
  private starMinSize: number
  private lightSpeedTailLength: number
  
  constructor(canvas: HTMLCanvasElement, opts?: Partial<Opts>) {
    this.canvas = canvas

    this.speedNormal = opts?.speedNormal ?? 0.5
    this.speedLight = opts?.speedLight ?? 15
    this.transitionSpeed = opts?.transitionSpeed ?? 0.2
    this.starMaxSize = opts?.starMaxSize ?? 3
    this.starMinSize = opts?.starMinSize ?? 1
    this.lightSpeedTailLength = opts?.lightSpeedTailLength ?? 0.3
    const starsPerPx = opts?.starsPerPx ?? 0.0005
    const MAX_STARS_PER_PX = 0.05
    this.starsPerPx = Math.min(starsPerPx, MAX_STARS_PER_PX)

    this.ctx = canvas.getContext('2d')!

    this.handleCanvasSize()
    this.initStars()
    
    this.resizeObserver = new ResizeObserver(() => {
      this.handleCanvasSize()
      this.initStars()
    })
    this.resizeObserver.observe(this.canvas)
  }

  private handleCanvasSize() {
    const rect = this.canvas.getBoundingClientRect()
    const ratio = window.devicePixelRatio || 1
    if (
      rect.width == this.canvasWidth * ratio &&
      rect.height == this.canvasHeight * ratio
    ) {
      return
    }
    this.canvasWidth = rect.width
    this.canvasHeight = rect.height
    this.canvas.width = this.canvasWidth * ratio
    this.canvas.height = this.canvasHeight * ratio
    this.ctx.scale(ratio, ratio)
  }

  private initStars() {
    this.stars = []
    const starCount = this.getStarCount()
    for (let i = 0; i < starCount; i++) {
      this.addOneStar()
    }
  }

  private addOneStar() {
    this.stars.push(new Star({
      x: Math.random() * this.canvasWidth, 
      y: Math.random() * this.canvasHeight,
      size: this.starMinSize + (Math.random() * (this.starMaxSize - this.starMinSize)),
      opacity: Math.random() * 0.7 + 0.3,
      speedFactor: Math.random() * 0.002 + 0.001,
    }))
  }

  start() {
    if (this.animationFrameId === null) {
      this.animate()
    }
    return this
  }

  stop() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId)
      this.animationFrameId = null
    }
    return this
  }

  lightSpeed() {
    this.isLightSpeed = true
  }

  normalSpeed() {
    this.isLightSpeed = false
  }

  toggleSpeed() {
    if (this.isLightSpeed) {
      this.normalSpeed()
    } else {
      this.lightSpeed()
    }
  }

  destroy() {
    this.stop()
    this.resizeObserver.disconnect()
  }

  private animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate())
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    
    if (this.isLightSpeed) {
      if (this.transitionProgress < 1) {
        this.transitionProgress = Math.min(1, this.transitionProgress + (this.transitionSpeed  * 0.1))
      }
    } else {
      if (this.transitionProgress > 0) {
        this.transitionProgress = Math.max(0, this.transitionProgress - (this.transitionSpeed  * 0.1))
      }
    }
    
    const currentSpeed = this.speedNormal + (this.speedLight - this.speedNormal) * this.transitionProgress
    const centerX = this.canvasWidth / 2
    const centerY = this.canvasHeight / 2

    const starOpacitySpeed = this.getStarOpacitySpeed()
    
    for (const star of this.stars) {
      const dx = star.x - centerX
      const dy = star.y - centerY
      
      star.x += dx * currentSpeed * star.speedFactor
      star.y += dy * currentSpeed * star.speedFactor
      
      if (star.opacity < star.maxOpacity) {
        star.opacity = Math.min(star.maxOpacity, star.opacity + starOpacitySpeed)
      }
      
      // tail line
      this.ctx.beginPath()
      const tailLength = this.transitionProgress * this.lightSpeedTailLength
      const endX = star.x - dx * tailLength
      const endY = star.y - dy * tailLength
      const gradient = this.ctx.createLinearGradient(endX, endY, star.x, star.y)
      gradient.addColorStop(0, this.getStarFillStyle(0))
      gradient.addColorStop(1, this.getStarFillStyle(star.opacity))
      this.ctx.strokeStyle = gradient
      this.ctx.lineWidth = star.size
      this.ctx.moveTo(endX, endY)
      this.ctx.lineTo(star.x, star.y)
      this.ctx.stroke()
      // circle
      this.ctx.beginPath()
      this.ctx.fillStyle = this.getStarFillStyle(star.opacity)
      this.ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2)
      this.ctx.fill()

      // check offscreen
      if (
        Math.abs(endX - centerX) - star.size > this.canvasWidth / 2 ||
        Math.abs(endY - centerY) - star.size > this.canvasHeight / 2
      ) {
        star.x = Math.random() * this.canvasWidth
        star.y = Math.random() * this.canvasHeight
        star.opacity = 0
      }
    }
  }

  private getStarFillStyle(opacity: number) {
    return `rgba(255, 255, 255, ${opacity})`
  }

  private getStarCount() {
    return this.canvasWidth * this.canvasHeight * this.starsPerPx
  }

  private getStarOpacitySpeed() {
    const opacitySpeedNormal = this.speedNormal * 0.002
    const opacitySpeedLight = this.speedLight * 0.00333
    if (!this.transitionProgress) {
      return opacitySpeedNormal
    }
    return opacitySpeedNormal + (opacitySpeedLight - opacitySpeedNormal) * this.transitionProgress
  }
}

class Star {
  x: number
  y: number
  size: number
  opacity: number
  maxOpacity: number
  speedFactor: number
  
  constructor(opts: Omit<Star, 'maxOpacity'>) {
    this.x = opts.x
    this.y = opts.y
    this.size = opts.size
    this.opacity = opts.opacity
    this.maxOpacity = opts.opacity
    this.speedFactor = opts.speedFactor
  }
}
