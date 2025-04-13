import { AnyControl } from '../config'
import { createColor } from './color'
import { createColorArray } from './color-array'
import { createRange } from './range'
import { createSelect } from './select'

export function createControlReducer(control: AnyControl) {
  switch (control.type) {
  case 'range':
    return createRange(control)
  case 'select':
    return createSelect(control)
  case 'color':
    return createColor(control)
  case 'color-array':
    return createColorArray(control)
  default:
    throw new Error('Can not create control. Unknown control type.')
  }
}
