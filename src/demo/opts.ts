import { Opts } from '../main'
import { MaybeRandom, RandomOpts } from '../random'
import { EasingFns } from './easingFns'
import { instance } from './instance'

export const demoOpts = {
  starsPerPx: 0,
  starSize: {
    min: 0,
    max: 0,
    easingFn: EasingFns.linear.fn
  },
  speedNormal: 0,
  speedLight: 0,
  transitionSpeed: 0,
  lightSpeedTailLength: 0,
  starColor: {
    base: [0,0,0],
    additional: [[0,0,0]],
    mix: {
      min: 0,
      max: 0,
      easingFn: EasingFns.linear.fn
    }
  }
} satisfies Omit<Opts, 'isInitialLightSpeed'>

export type DemoOpts = typeof demoOpts

export function initOptsWithInstanceDefaults() {
  demoOpts.starsPerPx = instance['starsPerPx']
  demoOpts.starSize = parseMaybeRandom(instance['starSize'])
  demoOpts.speedNormal = instance['speedNormal']
  demoOpts.speedLight = instance['speedLight']
  demoOpts.transitionSpeed = instance['transitionSpeed']
  demoOpts.lightSpeedTailLength = instance['lightSpeedTailLength']
  demoOpts.starColor = {
    base: instance['colorBase'],
    additional: instance['additionalColors'],
    mix: parseMaybeRandom(instance['colorMix'])
  }
}

export const parseMaybeRandom = (maybeRandom: MaybeRandom): Required<RandomOpts> => {
  if (typeof maybeRandom == 'number') {
    return {
      min: maybeRandom,
      max: maybeRandom,
      easingFn: EasingFns.linear.fn
    }
  }
  return {
    ...maybeRandom,
    easingFn: maybeRandom.easingFn || EasingFns.linear.fn
  }
}
