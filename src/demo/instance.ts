import ThruSpace, { Opts } from '../main'
import { demoOpts } from './opts'

const canvas = document.querySelector('#canvas') as HTMLCanvasElement

export let instance: ThruSpace

export function createInstance(createOpts?: Partial<Opts>) {
  const thruSpace = new ThruSpace(canvas, createOpts).start()
  ;(window as any).thruSpace = thruSpace
  instance = thruSpace
}

export function recreateInstance(opts?: { dropOpts?: boolean }) {
  const { dropOpts } = (opts || {})
  instance.destroy()
  const createOpts = dropOpts ? {} : demoOpts
  createInstance({
    ...createOpts,
    isInitialLightSpeed: instance.isLightSpeed
  })
}
