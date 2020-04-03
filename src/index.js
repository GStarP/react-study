import React from 'react'
import ReactDOM from 'react-dom'

// function Simple(props) {
//   return <div>you'd better not use ref in function component</div>
// }

// foward ref: pass ref to child element
const ImageBtn = React.forwardRef((props, ref) => (
  <button ref={ref} onClick={() => props.onClick()}>
    {props.children}
  </button>
))

class Page extends React.Component {

  constructor(props) {
    super(props)
    // we cant control file input, so we let the DOM node manage its own value
    this.fileInput = React.createRef()
    this.simple = React.createRef()
    this.imgBtn = React.createRef()
    // controllable input
    this.state = {
      val1: '',
      val2: 'hxwnb'
    }
  }

  inputChangeHandler(e) {
    this.setState({
      val1: e.target.value
    })
  }

  show(e) {
    e.preventDefault()
    // this.refName.current => DOM Node
    alert(this.fileInput.current.files[0].name)
  }

  showRef() {
    alert(this.imgBtn.current.tagName)
  }

  render() {
    return (
      <div>
        <input type="file" ref={this.fileInput}/>
        <button onClick={(e) => this.show(e)}>SHOW</button>
        <br/>
        {/* <Simple ref={this.simple}/> */}
        <ImageBtn
          ref={this.imgBtn}
          onClick={() => this.showRef()}
        >my ref point to button element</ImageBtn>
        <br/>
        <input value={this.state.val1} onChange={(e) => this.inputChangeHandler(e)}/>
        <span> you can change value in this input</span>
        <br/>
        <input value={this.state.val2}/>
        <span> this input will not change whatever you input</span>
      </div>
    )
  }

}

// ========================================

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
