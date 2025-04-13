import { Control } from '../config'
import { addCommonChangeListener } from './common-change-listener'

export type SelectControl = Control<{
  type: 'select'
  options: {
    name?: string
    value: string
  }[]
}>
export function createSelect(control: SelectControl) {
  const select = document.createElement('select')
  for (const option of control.options) {
    const optionEl = document.createElement('option')
    optionEl.textContent = option.name || option.value
    select.append(optionEl)
  }

  addCommonChangeListener(control, select)

  return select
}
