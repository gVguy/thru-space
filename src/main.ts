type Opts = {
  starsPerPx: number
  speedNormal: number
  speedLight: number
  transitionSpeed: number
}

export class ThruSpace {
  isSpeedOfLight: boolean = false
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private stars: Star[] = []
  private animationFrameId: number | null = null
  private transitionProgress: number = 0
  private abortController: AbortController = new AbortController()

  private readonly starsPerPx = 0.1
  private readonly speedNormal = 0.5
  private readonly speedLight = 15
  private readonly transitionSpeed: number = 0.2
  
  constructor(canvas: HTMLCanvasElement, opts?: Partial<Opts>) {
    this.canvas = canvas
    Object.assign(this, opts)
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    this.resizeCanvas()
    window.addEventListener('resize', () => this.resizeCanvas(), { signal: this.abortController.signal })
    this.initStars()
  }

  private resizeCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.initStars()
  }

  private initStars() {
    this.stars = []
    const starCount = this.canvas.width * this.starsPerPx
    for (let i = 0; i < starCount; i++) {
      this.stars.push(new Star({
        x: Math.random() * this.canvas.width, 
        y: Math.random() * this.canvas.height,
        size: Math.random() * 1 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        speedFactor: Math.random() * 0.002 + 0.001,
      }))
    }
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

  speedOfLight() {
    this.isSpeedOfLight = true
  }

  normalSpeed() {
    this.isSpeedOfLight = false
  }

  toggleSpeed() {
    if (this.isSpeedOfLight) {
      this.normalSpeed()
    } else {
      this.speedOfLight()
    }
  }

  destroy() {
    this.stop()
    this.abortController.abort()
  }

  private animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate())
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    
    if (this.isSpeedOfLight) {
      this.transitionProgress = Math.min(1, this.transitionProgress + (this.transitionSpeed  * 0.1))
    } else {
      this.transitionProgress = Math.max(0, this.transitionProgress - (this.transitionSpeed  * 0.1))
    }
    
    const currentSpeed = this.speedNormal + (this.speedLight - this.speedNormal) * this.transitionProgress
    const centerX = this.canvas.width / 2
    const centerY = this.canvas.height / 2

    this.stars.forEach(star => {
      const dx = star.x - centerX
      const dy = star.y - centerY
      
      star.x += dx * currentSpeed * star.speedFactor
      star.y += dy * currentSpeed * star.speedFactor
      
      if (star.opacity < star.maxOpacity) {
        star.opacity += this.isSpeedOfLight ? 0.05 : 0.001
      }
      
      if (Math.abs(star.x - centerX) > this.canvas.width / 2 || Math.abs(star.y - centerY) > this.canvas.height / 2) {
        star.x = Math.random() * this.canvas.width
        star.y = Math.random() * this.canvas.height
        star.opacity = 0
      }
      
      this.ctx.beginPath()
      if (this.transitionProgress > 0) {
        const streakLength = star.size * 10 * this.transitionProgress
        const endX = star.x + dx * streakLength * 0.05
        const endY = star.y + dy * streakLength * 0.05
        const gradient = this.ctx.createLinearGradient(endX, endY, star.x, star.y)
        gradient.addColorStop(0, this.getStarFillStyle(star.opacity))
        gradient.addColorStop(1, 'transparent')
        this.ctx.strokeStyle = gradient
        this.ctx.lineWidth = star.size
        this.ctx.moveTo(endX, endY)
        this.ctx.lineTo(star.x, star.y)
        this.ctx.stroke()
      } else {
        this.ctx.fillStyle = this.getStarFillStyle(star.opacity)
        this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        this.ctx.fill()
      }
    })
  }

  private getStarFillStyle(opacity: number) {
    return `rgba(255, 255, 255, ${opacity})`
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
