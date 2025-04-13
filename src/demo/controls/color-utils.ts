import { RGB } from '../../mixColor'

export function rgbToHex([r, g, b]: RGB) {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      })
      .join('')
  )
}

export function hexToRgb(hex: string): RGB {
  hex = hex.replace(/^#/, '')
  
  if (hex.length == 3) {
    hex = hex.split('').map((c) => c + c).join('')
  }

  const bigint = parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return [r, g, b]
}
