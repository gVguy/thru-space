import { recreateInstance } from '../../instance'
import { Control } from '../config'

export type ColorArrayControl = Control<{
  type: 'color-array'
}, string[], string[]>
export function createColorArray(control: ColorArrayControl) {
  const wrapperEl = document.createElement('div')
  wrapperEl.className = 'color-array'

  const colorList = document.createElement('ul')
  wrapperEl.append(colorList)

  const renderInputs = () => {
    const colors = control.getValue()
    colorList.innerHTML = '' // clear previous

    colors.forEach((color, index) => {
      const colorLI = document.createElement('li')

      const colorInput = document.createElement('input')
      colorInput.type = 'color'
      colorInput.value = color

      // custom change listener
      colorInput.addEventListener('change', () => {
        const newColors = control.getValue().slice()
        newColors[index] = colorInput.value
        control.setValue(newColors)
        recreateInstance()
      })

      // 'remove' button
      const removeBtn = document.createElement('button')
      removeBtn.className = 'secondary'
      removeBtn.textContent = '✕'
      removeBtn.addEventListener('click', () => {
        const newColors = control.getValue().slice()
        newColors.splice(index, 1)
        control.setValue(newColors)
        setTimeout(() => {
          renderInputs()
          recreateInstance()
        }, 1)
      })

      colorLI.append(colorInput, removeBtn)
      colorList.append(colorLI)
    })
  }

  // 'add' button
  const addBtn = document.createElement('button')
  addBtn.className = 'secondary add-color'
  addBtn.textContent = '+ Add color'
  addBtn.addEventListener('click', () => {
    const newColors = control.getValue().concat('#ffffff') // default new color
    control.setValue(newColors)
    renderInputs()
    recreateInstance()
  })
  wrapperEl.append(addBtn)

  control.resetFn = () => {
    renderInputs()
  }

  return wrapperEl
}
