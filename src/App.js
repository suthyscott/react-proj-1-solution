import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Square from "./Square";

function App() {
  const [squares, setSquares] = useState(["", "", "", "", "", "", "", "", ""]);
  // if player is true, the current player is X. If player is false, the current player is O. 
  const [player, setPlayer] = useState(true);
  
  const handleClick = () => {
    // if the reset button is clicked it will trigger this event and reset all the squares to empty strings, and the player back to it's inital value
    setSquares(["", "", "", "", "", "", "", "", ""])
    setPlayer(true)
  }

  // Remember that this function runs whenever the page rerenders, including whenever a player adds an X or an O
  function calculateWinner(squares) {
    console.log('hit calculateWinner', squares)
    // this array contains sub arrays with all the possible winning combinations. 
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
      // Here we loop over the array of winning combos, and we'll access each one individually with 'lines[i]'. We'll then destructure the 3 indeces in the winning combo and save them to distinct variables (a, b and c)
      const [a, b, c] = lines[i];
      if (
        // Now we check to make sure that the first of the 3 indeces in the winning combo has a value of either X or O. If it's falsy we know that it hasn't been clicked and is still an empty string, and no one has won with this combo. 
        squares[a] &&
        // then we check that the second and third indeces in the winning combo match whatever value was in the first index (X or O)
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        // if the above condition passes we know someone hit a winning combo and we can use the value from one of the three indeces to update who the winner is. 
        return `${squares[a]} won!`;
      }
    }
    return "Who will win?";
  }


  return (
    <div className="App">
      {/* Notice how calculateWinner below is being invoked, but it's not wrapped in an arrow function. This means that it will run as soon as the page loads and any time a 'set' method triggers a rerender. */}
        <span>{calculateWinner(squares)}</span>
      <div className="container">
        {/* 
        'squares' is an array of strings. Initially all the strings will be empty, and as the game progresses they'll be replaced with 'X' or 'O'
        
        Below we are mapping over the array of squares, and for each element or string in the array we are returning the Square component (9 times in total).
        */}
        {squares.map((val, index) => {
          // console.log(val, index)
          return (
            // Square gets returned once for each string in the 'squares' array. Each time it's rendered it is also passed 6 props.
            <Square
            // setSquares is the set method we can use to update the 'squares' state array. 
              setSquares={setSquares}
              // index is passed as a parameter into the arrow function that we're passing into .map. This is how we'll keep track of which string we're at in the 'squares' array.
              index={index}
              // squareValue is the name of the prop, and val is it's value. val is coming from .map's callback function just like index. This will be whatever value the current element of 'squares' is. In this particular case it could be an empty string "", an "X", or an "O". 
              squareValue={val}
              // 'squares' is the entire array of strings that we're using to keep track of the 9 grid squares of the board game. 
              squares={squares}
              // player is our state value that keeps track of whose turn it is. If 'player' is true than it is the X player's turn. If 'player' is false it is the O player's turn. 
              player={player}
              // setPlayer is the set method we can use to update which player we're on. 
              setPlayer={setPlayer}
            />
          );
        })}
      </div>
      <button onClick={handleClick}>Reset</button>
    </div>
  );
}

export default App;
