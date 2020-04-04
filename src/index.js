import React from 'react'
import ReactDOM from 'react-dom'

class ColorDiv extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    // only update when color changes
    if (this.props.color !== nextProps.color) {
      return true
    }
    // count will inc, but not show on DOM
    // you can inc count 2 times and then change color to see the situation
    console.log(nextProps.count)
    return false
  }

  render() {
    return (
      <div style={{backgroundColor: this.props.color}}>{this.props.count}</div>
    )
  }
}

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: 'skyblue',
      count: 1
    }
  }

  changeColor() {
    this.setState((state) => ({
      color: state.color === 'skyblue' ? 'white' : 'skyblue'
    }))
  }

  incCount() {
    this.setState((state) => ({
      count: state.count + 1
    }))
  }

  render() {
    return (
      <div>
        <ColorDiv color={this.state.color} count={this.state.count} />
        <button onClick={() => this.changeColor()}>Change Color</button>
        <button onClick={() => this.incCount()}>Inc Count</button>
      </div>
    )
  }
}

class Page extends React.Component {
  render() {
    return <Container />
  }
}

// ========================================

ReactDOM.render(
  <Page />,
  document.getElementById('root')
)
