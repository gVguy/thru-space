export type RandomOpts = {
  min: number
  max: number
  easingFn?: EasingFunction
}
export type EasingFunction = (t: number) => number

export function getRandom({
  min,
  max,
  easingFn
}: RandomOpts): number {
  let rand = Math.random()
  if (easingFn) {
    rand = easingFn(rand)
  }
  return min + (max - min) * rand
}

export type MaybeRandom = number | RandomOpts

export function resolveMaybeRandom(value: MaybeRandom): number {
  if (typeof value == 'number') {
    return value
  }
  if (value.min == value.max) {
    return value.min
  }
  return getRandom(value)
}
