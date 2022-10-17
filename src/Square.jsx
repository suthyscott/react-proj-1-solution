import React from "react";

const Square = (props) => {
  const handleClick = () => {
    // When a player clicks a square, we first need to make sure the square is empty. we do this by checking that the squareValue is falsy (if it's truthy that means this square has already been updated and shouldn't be altered):
    if (!props.squareValue) {
      // As long as the square does not have a value, then we'll check which player is clicking:
      if (props.player) {
        // if props.player is true we're on player X, so we want to splice out the empty string (default value) at that position, and replace it with the letter 'X':
        props.squares.splice(props.index, 1, "X");
        // Once we've updated the squares array on props with our splice(which doesn't change the value of 'squares' in the parent component), we want to use the setSquares function on props to change the squares array to have the new value. 
        props.setSquares(props.squares);
        // then we can set the player to be the opposite of what it currently is, which in this place should always change it from true to false. 
        props.setPlayer(!props.player);
      } else {
        // Same process as outlined above, except this is for when props.player is false so everything is for the O player. 
        props.squares.splice(props.index, 1, "O");
        props.setSquares(props.squares);
        props.setPlayer(!props.player);
      }
    }
  };
  return (
    <div className="square" onClick={() => handleClick()}>
      {/* 
      we are using a ternary to determine what will be rendered in each square. 
      
      If props.squareValue is an 'O', we'll render and image with the DevMountain logo. If props.squareValue is not an 'O', we'll render whatever it's value is (which will be an 'X' or an empty string. )     
      
      */}
      {props.squareValue === "O" ? <img src="https://cdn.discordapp.com/attachments/830137099042816080/984895322184634448/devcircle_1.png" /> : props.squareValue}
      {/* {props.squareValue} */}
    </div>
  );
};

export default Square;
