import React from 'react'
import ReactDOM from 'react-dom'
import { theme, ThemeContext } from './theme'
import ThemeButton from './theme-btn'

function Container(props) {
  return (
    <ThemeContext.Consumer>
      {
        ({ color, toggleTheme }) => 
          <div {...props} style={{backgroundColor: color}} onClick={toggleTheme}>{props.children}</div>
      }
    </ThemeContext.Consumer>
  )
}

class Page extends React.Component {

  constructor(props) {
    super(props)
    this.toggleTheme = () => {
      this.setState(state => ({
        color: state.color === theme.light ? theme.dark : theme.light
      }))
    }
    this.state = {
      color: theme.light,
      toggleTheme: this.toggleTheme
    }
  }

  render() {
    // components in differnet layers all rely on ThemeContext.Provider
    // in my opinion, ThemeContext is like an interface
    // the real value still belongs to <Page>
    return (
      <div>
        <ThemeContext.Provider value={this.state}>
          <Container>
            <ThemeButton></ThemeButton>
          </Container>
          <ThemeButton></ThemeButton>
        </ThemeContext.Provider>
      </div>
    )
  }

}

// ========================================

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
