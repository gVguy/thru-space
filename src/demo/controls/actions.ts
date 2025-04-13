import { AnyControl, ControlGroup, controls } from './config'
import { createControlReducer } from './creators/reducer'

const optsEl = document.querySelector('#opts') as HTMLElement

export function createControls(controlsList = controls, containerEl = optsEl) {
  for (const control of controlsList) {
    let createdEl: HTMLElement
    if (control.type == 'group') {
      createdEl = createGroup(control)
      createControls(control.controls, createdEl)
    } else {
      createdEl = createControl(control)
    }
    containerEl.append(createdEl)
  }
}

export function resetControls(controlsList = controls) {
  for (const control of controlsList) {
    if (control.valueDisplayEl) {
      control.valueDisplayEl.textContent = String(control.getValue())
    }
    if (control.type == 'group') {
      resetControls(control.controls)
    } else {
      if (control.resetFn) {
        control.resetFn()
      } else if (control.inputEl && 'value' in control.inputEl) {
        control.inputEl.value = String(control.getValue())
      } else {
        throw new Error(`Can not reset control "${control.name}", ${control.type}. Neither inputEl nor custom resetFn are defined.`)
      }
    }
  }
}


function createGroup(group: ControlGroup) {
  const details = document.createElement('details')
  const summary = document.createElement('summary')

  const titleEl = document.createElement('span')
  titleEl.className = 'title'
  titleEl.textContent = group.name

  const valueDisplayEl = document.createElement('span')
  valueDisplayEl.className = 'value-display'
  const setDisplayValue = () => {
    valueDisplayEl.textContent = String(group.getValue())
  }

  details.addEventListener('toggle', () => setDisplayValue())

  group.valueDisplayEl = valueDisplayEl

  summary.append(titleEl)
  summary.append(valueDisplayEl)
  details.append(summary)
  return details
}

function createControl(control: AnyControl) {
  const label = document.createElement('div')
  label.textContent = control.name
  label.className = `label ${control.type}`

  const input = createControlReducer(control)
  control.inputEl = input

  if (control.valueDisplayEl) {
    label.append(control.valueDisplayEl)
  }
  label.append(input)

  return label
}
