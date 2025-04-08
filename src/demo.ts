import './style.css'
import { ThruSpace } from './main'

const canvas = document.querySelector('#canvas') as HTMLCanvasElement
const button = document.querySelector('#toggle')

const thruSpace = new ThruSpace(canvas, {
  starsPerPx: 0.4
}).start()

button!.addEventListener('click', () => {
  thruSpace.toggleSpeed()
})
