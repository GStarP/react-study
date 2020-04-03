
import React from 'react'
import { ThemeContext } from './theme'

class ThemeButton extends React.Component {
  render() {
    let props = this.props
    return (
      <ThemeContext.Consumer>
        {({ color, toggleTheme }) => (
          <button
            {...props}
            style={{backgroundColor: color}}
            onClick={toggleTheme}
          >Toggle Theme</button>
        )}
      </ThemeContext.Consumer>
    )
  }
}

ThemeButton.contextType = ThemeContext

export default ThemeButton
