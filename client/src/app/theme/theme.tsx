/* eslint-disable @typescript-eslint/no-empty-interface */
import { createContext, FC, useEffect, useMemo } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import { useBoolState } from 'shared/hooks'

import commonTheme from './common'
import darkTheme from './dark'
import lightTheme from './light'

declare module '@mui/material/styles' {
  interface Theme {}
  // allow configuration using `createTheme`
  interface ThemeOptions {}
}

const toggleThemeContext = createContext<any>(() => {})

const AppThemeProvider: FC = ({ children }) => {
  const [isDefaultTheme, , , toggleTheme] = useBoolState(false)
  const theme = useMemo(
    () => createTheme(isDefaultTheme ? lightTheme : darkTheme, commonTheme),
    [isDefaultTheme]
  )

  useEffect(() => {
    const prevTheme = localStorage.getItem('theme.isDefault')
    if (typeof prevTheme === 'string' && prevTheme !== String(isDefaultTheme)) {
      toggleTheme()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default
    localStorage.setItem('theme.isDefault', String(isDefaultTheme))
  }, [isDefaultTheme, theme.palette.background.default])

  return (
    <toggleThemeContext.Provider value={{ toggleTheme, isDefaultTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </toggleThemeContext.Provider>
  )
}

export { toggleThemeContext }

export default AppThemeProvider
