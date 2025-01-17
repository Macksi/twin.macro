import { addPxTo0 } from './../utils'

export default ({
  pieces: { negative, important, className },
  errors: { errorSuggestions },
  theme,
  match,
}) => {
  const classNameValue =
    match(/(?<=(space)-(x|y)-)([^]*)/) ||
    match(/^space-x$/) ||
    match(/^space-y$/)

  const spaces = theme('space')
  const configValue = spaces[classNameValue || 'default']
  !configValue && errorSuggestions({ config: ['space'] })

  const value = `${negative}${addPxTo0(configValue)}`
  const isSpaceX = className.startsWith('space-x-') // 🚀
  const cssVariableKey = isSpaceX
    ? '--tw-space-x-reverse'
    : '--tw-space-y-reverse'

  const marginFirst = `calc(${value} * var(${cssVariableKey}))${important}`
  const marginSecond = `calc(${value} * calc(1 - var(${cssVariableKey})))${important}`

  const styleKey = isSpaceX
    ? { marginRight: marginFirst, marginLeft: marginSecond }
    : { marginTop: marginSecond, marginBottom: marginFirst }

  const innerStyles = { [cssVariableKey]: 0, ...styleKey }

  return { '> :not([hidden]) ~ :not([hidden])': innerStyles }
}
