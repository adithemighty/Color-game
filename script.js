window.addEventListener("load", function(event) {
  registerSquareListeners();
  createNewGame(6);
});

const resetButton = document.querySelector(".reset");
const guessingStatus = document.querySelector(".guessingStatus");
const squares = document.querySelectorAll(".square");
const pickedColor = document.querySelector(".pickedColor");
const hOne = document.querySelector("h1");

let winningColor = "";
let difficulty = 6;

function registerSquareListeners() {
  const modes = document.querySelectorAll(".mode");

  resetButton.addEventListener("click", function() {
    reset();
  });

  for (let i = 0; i < modes.length; i++) {
    modes[i].addEventListener("click", function() {
      modes[0].classList.remove("selected");
      modes[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent.toLowerCase() === "easy"
        ? (difficulty = 3)
        : (difficulty = 6);
      reset();
    });
  }

  function makeGuess(chosenTile) {
    const pickedColor = chosenTile.style.backgroundColor;

    if (pickedColor === winningColor) {
      //color all squares into this color
      guessingStatus.textContent = "Correct";
      changeColors();
      hOne.style.backgroundColor = winningColor;
      resetButton.textContent = "Play again?";
    } else {
      //make square disappear
      guessingStatus.textContent = "Try again";
      chosenTile.style.backgroundColor = "#232323";
    }
  }

  function changeColors() {
    for (var i = 0; i < squares.length; i++) {
      squares[i].style.backgroundColor = winningColor;
    }
  }

  for (let i = 0; i < squares.length; i++) {
    squares[i].removeEventListener("click", function() {
      makeGuess(squares[i]);
    });
    squares[i].addEventListener("click", function() {
      makeGuess(squares[i]);
    });
  }
}

function createNewGame(numOfSquares) {
  let randomColors = generateRandomColorsList(numOfSquares);
  //add initial colors to squares
  for (let i = 0; i < squares.length; i++) {
    if (i < numOfSquares) {
      squares[i].classList.remove("hidden");
      squares[i].style.backgroundColor = randomColors[i];
    } else {
      squares[i].classList.add("hidden");
    }
  }

  winningColor = generateWinningColor();

  function generateWinningColor() {
    pickedColor.textContent = randomColors[getRandomInt(randomColors.length)];
    return pickedColor.textContent;
  }

  function generateRandomColorsList(num) {
    //generate random colors
    let colors = [];
    for (let i = 0; i < num; i++) {
      colors.push(generateRandomColor());
    }
    return colors;
  }

  function generateRandomColor() {
    const red = getRandomInt(256);
    const green = getRandomInt(256);
    const blue = getRandomInt(256);
    return `rgb(${red}, ${green}, ${blue})`;
  }

  function getRandomInt(limit) {
    return Math.floor(Math.random() * Math.floor(limit));
  }
}

function reset() {
  resetButton.textContent = "New Colors";
  hOne.style.backgroundColor = "#4878ab";
  guessingStatus.textContent = "";
  createNewGame(difficulty);
}
