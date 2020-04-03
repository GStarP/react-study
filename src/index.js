import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// function component
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      next: 'X',
      stepNumber: 0
    };
  }

  calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  clickHandler = (i) => {
    const his = this.state.history.slice(0, this.state.stepNumber + 1);
    const tmp = his[his.length - 1].squares;
    if (this.calculateWinner(tmp) || tmp[i]) {
      return;
    }
    tmp[i] = this.state.next;
    this.setState({
      history: this.state.history.concat([{
        squares: tmp
      }]),
      next: this.state.next === 'X' ? 'O' : 'X',
      stepNumber: this.state.history.length
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      next: (step % 2) === 0 ? 'X' : 'O'
    })
  }

  render() {
    const curSquare = this.state.history[this.state.stepNumber].squares;
    
    const win = this.calculateWinner(curSquare);
    let status;
    if (win) {
      status = `Winner: ${win}`
    } else {
      status = `Next player: ${this.state.next}`;
    }

    const moves = this.state.history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={curSquare}
            onClick={(i) => this.clickHandler(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
