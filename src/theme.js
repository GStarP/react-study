
import React from 'react'

export const theme = {
  light: 'skyblue',
  dark: 'grey'
}

export const ThemeContext = React.createContext({
  color: theme.light,
  toggleTheme: () => {}
})
