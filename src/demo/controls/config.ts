import { demoOpts } from '../opts'
import { EasingFns, getEasingFnByName, getEasingFnName } from '../easingFns'
import { hexToRgb, rgbToHex } from './color-utils'
import { RangeControl } from './creators/range'
import { SelectControl } from './creators/select'
import { ColorControl } from './creators/color'
import { ColorArrayControl } from './creators/color-array'


type BaseControl<GetValue = number|string> = {
  name: string
  getValue: () => GetValue
  valueDisplayEl?: HTMLElement // added once created
}
export type Control<
  T,
  GetValue = number|string,
  SetValue = string
> = BaseControl<GetValue> & {
  setValue: (value: SetValue) => void
  inputEl?: HTMLElement // added once created
  resetFn?: () => void // optionally added for custom reset logic
} & T
export type AnyControl =
  RangeControl|
  SelectControl|
  ColorControl|
  ColorArrayControl
export type ControlGroup = BaseControl & {
  type: 'group'
  controls: AnyControl[]
}
export type Controls = (AnyControl|ControlGroup)[]
export const controls: Controls = [
  {
    name: 'Stars / px',
    type: 'range',
    getValue: () => demoOpts.starsPerPx,
    setValue: (value) => demoOpts.starsPerPx = Number(value),
    min: 0.0001,
    max: 0.003,
    step: 0.0001
  },
  {
    name: 'Normal speed',
    type: 'range',
    getValue: () => demoOpts.speedNormal,
    setValue: (value) => demoOpts.speedNormal = Number(value),
    min: 0,
    max: 20,
    step: 0.1
  },
  {
    name: 'Light speed',
    type: 'range',
    getValue: () => demoOpts.speedLight,
    setValue: (value) => demoOpts.speedLight = Number(value),
    min: 0,
    max: 30,
    step: 0.1
  },
  {
    name: 'Star size',
    type: 'group',
    getValue: () => `${demoOpts.starSize.min}-${demoOpts.starSize.max}`,
    controls: [
      {
        name: 'Star size (Min)',
        type: 'range',
        getValue: () => demoOpts.starSize.min,
        setValue: (value) => demoOpts.starSize.min = Number(value),
        min: 0.5,
        max: 10,
        step: 0.5
      },
      {
        name: 'Star size (Max)',
        type: 'range',
        getValue: () => demoOpts.starSize.max,
        setValue: (value) => demoOpts.starSize.max = Number(value),
        min: 0.5,
        max: 10,
        step: 0.5
      },
      {
        name: 'Star size random curve',
        type: 'select',
        getValue: () => getEasingFnName(demoOpts.starSize.easingFn),
        setValue: (value) => demoOpts.starSize.easingFn = getEasingFnByName(value),
        options: [
          { value: EasingFns.linear.name },
          { value: EasingFns.easeInQuart.name },
          { value: EasingFns.easeOutQuart.name },
        ]
      }
    ]
  },
  {
    name: 'Transition speed',
    type: 'range',
    getValue: () => demoOpts.transitionSpeed,
    setValue: (value) => demoOpts.transitionSpeed = Number(value),
    min: 0.01,
    max: 1,
    step: 0.01
  },
  {
    name: 'Light speed tail length',
    type: 'range',
    getValue: () => demoOpts.lightSpeedTailLength,
    setValue: (value) => demoOpts.lightSpeedTailLength = Number(value),
    min: 0,
    max: 0.7,
    step: 0.05
  },
  {
    name: 'Star color',
    type: 'group',
    getValue: () => `${demoOpts.starColor.additional.length} color${demoOpts.starColor.additional.length == 1 ? '' : 's'}, mix: ${demoOpts.starColor.mix.min}-${demoOpts.starColor.mix.max}`,
    controls: [
      {
        name: 'Base color',
        type: 'color',
        getValue: () => rgbToHex(demoOpts.starColor.base),
        setValue: (value) => demoOpts.starColor.base = hexToRgb(value),
      },
      {
        name: 'Additional colors',
        type: 'color-array',
        getValue: () => demoOpts.starColor.additional.map(rgbToHex),
        setValue: (value) => demoOpts.starColor.additional = value.map(hexToRgb)
      },
      {
        name: 'Color mix (Min)',
        type: 'range',
        getValue: () => demoOpts.starColor.mix.min,
        setValue: (value) => demoOpts.starColor.mix.min = Number(value),
        min: 0,
        max: 1,
        step: 0.05
      },
      {
        name: 'Color mix (Max)',
        type: 'range',
        getValue: () => demoOpts.starColor.mix.max,
        setValue: (value) => demoOpts.starColor.mix.max = Number(value),
        min: 0,
        max: 1,
        step: 0.05
      },
      {
        name: 'Color mix random curve',
        type: 'select',
        getValue: () => getEasingFnName(demoOpts.starColor.mix.easingFn),
        setValue: (value) => demoOpts.starColor.mix.easingFn = getEasingFnByName(value),
        options: [
          { value: EasingFns.linear.name },
          { value: EasingFns.easeInQuart.name },
          { value: EasingFns.easeOutQuart.name },
        ]
      }
    ]
  }
]
