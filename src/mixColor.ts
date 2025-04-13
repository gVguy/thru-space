import { MaybeRandom, resolveMaybeRandom } from './random'

export type RGB = [number, number, number]

export function mixColor(
  base: RGB,
  additionalOptions: RGB[],
  mix: MaybeRandom
): RGB {
  if (additionalOptions.length == 0) {
    return base
  }

  const mixRatio = resolveMaybeRandom(mix)
  const clampedMix = Math.max(0, Math.min(1, mixRatio))

  // pick a random additional color
  const additional =
    additionalOptions[Math.floor(Math.random() * additionalOptions.length)]

  // mix each channel
  const mixed: RGB = [
    Math.round(base[0] * (1 - clampedMix) + additional[0] * clampedMix),
    Math.round(base[1] * (1 - clampedMix) + additional[1] * clampedMix),
    Math.round(base[2] * (1 - clampedMix) + additional[2] * clampedMix),
  ]

  return mixed
}
