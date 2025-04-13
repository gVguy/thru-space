import './style.css'
import { createControls, resetControls } from './controls/actions'
import { initOptsWithInstanceDefaults } from './opts'
import { createInstance, instance, recreateInstance } from './instance'

const toggleSpeedButton = document.querySelector('#toggle')
const resetOptsButton = document.querySelector('#reset')
const minifyButton = document.querySelector('#minify')
const expandButton = document.querySelector('#expand')
const appEl = document.querySelector('#app')


createInstance()

initOptsWithInstanceDefaults()

createControls()
resetControls()


toggleSpeedButton!.addEventListener('click', () => {
  console.log('toggleSpeed')
  instance.toggleSpeed()
})

resetOptsButton!.addEventListener('click', () => {
  recreateInstance({ dropOpts: true })
  initOptsWithInstanceDefaults()
  resetControls()
})

minifyButton!.addEventListener('click', () => {
  appEl?.classList.add('minified')
})
expandButton!.addEventListener('click', () => {
  appEl?.classList.remove('minified')
})
