import './style.css'
import { Opts, ThruSpace } from './main'

const canvas = document.querySelector('#canvas') as HTMLCanvasElement
const button = document.querySelector('#toggle')
const optsEl = document.querySelector('#opts')
const resetOptsButton = document.querySelector('#reset')

button!.addEventListener('click', () => {
  thruSpace.toggleSpeed()
})

const create = (opts?: Opts) => new ThruSpace(canvas, opts).start()

const recreate = () => {
  const wasSpeedOfLight = thruSpace.isLightSpeed
  thruSpace.destroy()
  thruSpace = create(opts)
  if (wasSpeedOfLight) {
    thruSpace.lightSpeed()
  }
}

let thruSpace = create()

const createControl = (key: keyof Opts) => {
  const label = document.createElement('label')
  label.textContent = key
  const input = document.createElement('input')
  input.type = 'number'
  input.step = '0.1'
  input.value = String(opts[key])
  input.addEventListener('input', (e) => {
    onControlChange(key, Number((e.target as HTMLInputElement).value))
  })
  input.id = key
  label.append(input)
  optsEl?.append(label)
}
const onControlChange = (key: keyof Opts, value: number) => {
  opts[key] = value
  recreate()
}

const opts: Opts = {
  starsPerPx: 0,
  speedNormal: 0,
  speedLight: 0,
  transitionSpeed: 0,
  starMaxSize: 0,
  starMinSize: 0,
  lightSpeedTailLength: 0,
}
for (const k in opts) {
  const key = k as keyof typeof opts
  opts[key] = thruSpace[key]
  createControl(key)
}
const defaultOpts = {...opts}

resetOptsButton!.addEventListener('click', () => {
  Object.assign(opts, defaultOpts)
  for (const key in opts) {
    const input = document.getElementById(key) as HTMLInputElement
    input.value = String(opts[key as keyof Opts])
  }
  recreate()
})

