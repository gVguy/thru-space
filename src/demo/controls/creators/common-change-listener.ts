import { recreateInstance } from '../../instance'
import { AnyControl } from '../config'

export function addCommonChangeListener(control: AnyControl, input: HTMLElement) {
  input.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement
    control.setValue(target.value as any)
    recreateInstance()
  })
}
