import './style.css'
import ThruSpace, { Opts } from './main'

const canvas = document.querySelector('#canvas') as HTMLCanvasElement
const button = document.querySelector('#toggle')
const optsEl = document.querySelector('#opts')
const resetOptsButton = document.querySelector('#reset')

button!.addEventListener('click', () => {
  thruSpace.toggleSpeed()
})

const create = (opts?: Opts) => {
  const thruSpace = new ThruSpace(canvas, opts).start()
  ;(window as any).thruSpace = thruSpace
  return thruSpace
}

const recreate = () => {
  const wasSpeedOfLight = thruSpace.isLightSpeed
  thruSpace.destroy()
  thruSpace = create(getOpts())
  if (wasSpeedOfLight) {
    thruSpace.lightSpeed()
  }
}

let thruSpace = create()

const createControl = (key: keyof Opts) => {
  const label = document.createElement('label')
  label.textContent = key
  const input = document.createElement('input')
  input.type = 'range'
  const params = opts[key]
  input.max = String(params.max)
  input.min = String(params.min)
  input.step = String(params.step)
  input.value = String(params.value)
  input.addEventListener('change', (e) => {
    onControlChange(key, Number((e.target as HTMLInputElement).value))
  })
  input.id = key
  const valueDisplay = document.createElement('span')
  valueDisplay.id = `${key}_value`
  valueDisplay.textContent = String(params.value)
  input.addEventListener('input', (e) => {
    setControlDisplayValue(key, (e.target as HTMLInputElement).value)
  })
  label.append(valueDisplay)
  label.append(input)
  optsEl?.append(label)
}
const onControlChange = (key: keyof Opts, value: number) => {
  opts[key].value = value
  recreate()
}
const setControlDisplayValue = (key: keyof Opts, value: number|string) => {
  document.querySelector(`#${key}_value`)!.textContent = String(value)
}

const opts: Record<keyof Opts, { value: number, min: number, max: number, step: number }> = {
  starsPerPx: { value: 0, min: 0.0001, max: 0.003, step: 0.0001 },
  speedNormal: { value: 0, min: 0, max: 20, step: 0.1 },
  speedLight: { value: 0, min: 0, max: 30, step: 0.1 },
  transitionSpeed: { value: 0, min: 0.01, max: 1, step: 0.01 },
  starMaxSize: { value: 0, min: 0.5, max: 10, step: 0.5 },
  starMinSize: { value: 0, min: 0.5, max: 10, step: 0.5 },
  lightSpeedTailLength: { value: 0, min: 0, max: 0.7, step: 0.05 }
}
for (const k in opts) {
  const key = k as keyof Opts
  opts[key].value = thruSpace[key]
  createControl(key)
}

const getOpts = () => Object.fromEntries(
  Object.entries(opts).map(
    ([key, { value }]) => [key, value]
  )
) as Opts

const defaultOptsValues = {...getOpts()}

resetOptsButton!.addEventListener('click', () => {
  for (const k in opts) {
    const key = k as keyof Opts
    const defaultValue = defaultOptsValues[key]
    opts[key].value = defaultValue
    const input = document.getElementById(key) as HTMLInputElement
    input.value = String(defaultValue)
    setControlDisplayValue(key, defaultValue)
  }
  recreate()
})

