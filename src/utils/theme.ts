import { THEMES } from './constants'

export const getNextTheme = (currentTheme) => {
  const currentIndex = THEMES.findIndex(theme => theme.name === currentTheme.name)
  return THEMES[(currentIndex + 1) % THEMES.length]
}