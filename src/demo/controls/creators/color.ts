import { Control } from '../config'
import { addCommonChangeListener } from './common-change-listener'

export type ColorControl = Control<{
  type: 'color'
}>
export function createColor(control: ColorControl) {
  const input = document.createElement('input')
  input.type = 'color'

  addCommonChangeListener(control, input)

  return input
}
