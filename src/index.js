import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(x,y) {
    return (
      <Square
        value={this.props.squares[x][y]}
        onClick={() => this.props.onClick(y)}
      />
    );
  }

  render() {
    const board = [];
    for (let r = 0; r < 6; r++) {
      let row = [];
      for (let c = 0; c < 7; c++) { 
        row.push(this.renderSquare(r,c)) 
      }
      board.push(<div className = "board-row" key={r}>{row}</div>);
    }
    
    return board;
}
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(42).fill('white')
        }
      ],
      stepNumber: 0,
      redIsNext: true
    };
  }

  handleClick(col) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
  for (let z = squares.length-1; z >= 0; z--) {
    if(squares[z][col] === 'white') {
      squares[z][col] = this.state.redIsNext ? 'red' : 'blue';
      this.setState({
        history: history.concat([{
          squares: squares
        }]),
        stepNumber: history.length,
        redIsNext: !this.state.redIsNext,
      });
      return true;
    }
  }
  return false;
}

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[0];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
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
  function calculateWinner(squares) {
    //vertical
      for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 5; col++) {
          if (squares[row][col]) {
            if (squares[row][col] === squares[row][col + 1] && 
                squares[row][col] === squares[row][col + 2] &&
                squares[row][col] === squares[row][col + 3]) {
                  return squares;
            }
          }
        }
      }
      //horizontal
      for (let row = 3; row < 7; row++) {
        for (let col = 0; col < 7; col++) {
          if (squares[row][col]) {
            if (squares[row][col] === squares[row - 1][col] &&
                squares[row][col] === squares[row - 2][col] &&
                squares[row][col] === squares[row - 3][col]) {
                  return squares;
            }
          }
        }
      }
      //left diagonal
      for (let row = 3; row < 7; row++) {
        for (let c = 0; c < 6; c++) {
          if (squares[row][c]) {
            if (squares[row][c] === squares[row - 1][c + 1] &&
                squares[row][c] === squares[row - 2][c + 2] &&
                squares[row][c] === squares[row - 3][c + 3]) {
                  return squares;
            }
          }
        }
      }
      //right diagonal
      for (let row = 3; row < 7; row++) {
        for (let col = 3; col < 7; col++) {
          if (squares[row][col]) {
            if (squares[row][col] === squares[row - 1][col - 1] &&
                squares[row][col] === squares[row - 2][col - 2] &&
                squares[row][col] === squares[row - 3][col - 3]) {
                  return squares;
            }
          }
        }
      } 
      //draw
      for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 6; col++) {
          if (squares[row][col] === 0) {
            return null;
          }
        }
      }
      this.setState({ winner: 'Sorry, no winner. Its a draw', gameOver: true }); 
    }
  
  // ========================================
  
  ReactDOM.render(<Game />, document.getElementById("root"));
  

