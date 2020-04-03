import React from 'react';
import ReactDOM from 'react-dom';

class Page extends React.Component {
  
  render() {
    // can defend xss attack
    const text = '<script>alert(\'XSS\')</script>'
    // list render
    const arr = [1, 2, 3]
    const compArr = arr.map(val => <div>{val}</div>)

    let el = (
      <div>
        <div id="test">{text}</div>
        <Comp type="comp1"></Comp>
        <Comp type="comp2"></Comp>
        {compArr}
      </div>
    );
    return el;
  }
}

const compList = {
  comp1: Comp1,
  comp2: Comp2
};

function Comp(props) {
  // how to choose component by props
  const ConcreteComp = compList[props.type];
  return <ConcreteComp/>;
}

function Comp1(props) {
  return (
    <div>comp-1</div>
  )
}

function Comp2(props) {
  return (
    <div>comp-2</div>
  )
}

// ========================================

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
