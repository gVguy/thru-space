import { EasingFunction } from '../random'

export const EasingFns = {
  easeInQuart: {
    name: 'Ease in (Quart)',
    fn: (t: number) => t*t*t*t
  },
  easeOutQuart: {
    name: 'Ease out (Quart)',
    fn: (t: number) => 1-(--t)*t*t*t
  },
  linear: {
    name: 'Linear',
    fn: (t: number) => t
  }
}

export const getEasingFnName = (fn: EasingFunction|undefined): string => (
  Object.values(EasingFns).find(easing => (
    easing.fn == fn
  ))?.name ?? EasingFns.linear.name
)

export const getEasingFnByName = (name: string): EasingFunction => (
  Object.values(EasingFns).find(easing => (
    easing.name == name
  ))?.fn ?? EasingFns.linear.fn
)
