//variables 
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

//winning combinations array
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//selects class "cell" - individual cells of the games
const cells = document.querySelectorAll(".cell");

//player makes move by clicking a cell. confirm cell is blank and game is active.  Adds class to indicate players move
function makeMove(cellIndex) {
  if (gameState[cellIndex] === "" && gameActive) {
    gameState[cellIndex] = currentPlayer;
    cells[cellIndex].textContent = currentPlayer;
    cells[cellIndex].classList.add(currentPlayer);

    //Check if player as won and returns false to reset game
    if (checkWin()) {
      announceWinner();
      gameActive = false;
      return;
    }
//check if play is drawn and return false to reset game
    if (checkDraw()) {
      announceDraw();
      gameActive = false;
      return;
    }
//Switches current player to O
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}
//check all winning combos.  loops to find combo, If winning combo is found, returns true otherise false to reset game
function checkWin() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      gameState[a] !== "" &&
      gameState[a] === gameState[b] &&
      gameState[b] === gameState[c]
    ) {
      return true;
    }
  }
  return false;
}
//checks if game is a drawn.  Uses every() to check if every cell is not empty.  if empty false, otherwise true (draw)
function checkDraw() {
  return gameState.every((cell) => cell !== "");
}
//sets alert to announce game winner
function announceWinner() {
  alert("Player " + currentPlayer + " wins!");
}
//sets alert to announce game draw
function announceDraw() {
  alert("It's a draw!");
}
//resets current player to X and clears content in cells on board.  Resets game
function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });
}
