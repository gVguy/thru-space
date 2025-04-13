import { Control } from '../config'
import { addCommonChangeListener } from './common-change-listener'

export type RangeControl = Control<{
  type: 'range'
  min: number
  max: number
  step: number
}>
export function createRange(control: RangeControl) {
  const input = document.createElement('input')
  input.type = 'range'
  input.max = String(control.max)
  input.min = String(control.min)
  input.step = String(control.step)

  const valueDisplay = document.createElement('span')
  input.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement
    valueDisplay.textContent = target.value
  })
  control.valueDisplayEl = valueDisplay

  addCommonChangeListener(control, input)

  return input
}
