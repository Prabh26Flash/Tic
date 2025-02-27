/** @format */

let currentPlayer = "X";
let arr = Array(9).fill(null);
// console.log(arr);

function checkWinner() {
  if (
    (arr[0] !== null && arr[0] === arr[1] && arr[1] === arr[2]) ||
    (arr[3] !== null && arr[3] === arr[4] && arr[4] === arr[5]) ||
    (arr[6] !== null && arr[6] === arr[7] && arr[7] === arr[8]) ||
    (arr[0] !== null && arr[0] === arr[3] && arr[3] === arr[6]) ||
    (arr[1] !== null && arr[1] === arr[4] && arr[4] === arr[7]) ||
    (arr[2] !== null && arr[2] === arr[5] && arr[5] === arr[8]) ||
    (arr[0] !== null && arr[0] === arr[4] && arr[4] === arr[8]) ||
    (arr[2] !== null && arr[2] === arr[4] && arr[4] === arr[6])
  ) {
    winnerMessage.innerHTML = `Winner is ${currentPlayer} !`;
    disableBoard();
    return;
  }

  if (!arr.some((e) => e === null)) {
    winnerMessage.innerHTML = `This Match is Draw!`;

    return;
  }
}

function handleClick(el) {
  const id = Number(el.id);
  if (arr[id] !== null) {
    return;
  }
  arr[id] = currentPlayer;
  el.innerText = currentPlayer;
  // currentPlayer = currentPlayer === "X" ? "O" : "X";
  checkWinner();
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  //   console.log(arr);
}
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", function () {
  //reset the page to reset all values
  arr.fill(null);
  currentPlayer = "X";
  winnerMessage.innerHTML = "";
  const cells = document.querySelectorAll(".col");
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.style.pointerEvents = "auto";
  });
});
function disableBoard() {
  const cells = document.querySelectorAll(".col");
  cells.forEach((cell) => {
    cell.style.pointerEvents = "none";
  });
}
