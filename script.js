/** @format */

let currentPlayer = "X";
let arr = Array(9).fill(null);

const winnerMessage = document.getElementById("winnerMessage");

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
    if (currentPlayer === "X") {
      winnerMessage.style.color = "orange";
    } else if (currentPlayer === "O") {
      winnerMessage.style.color = "purple";
    }
    disableBoard();
    return;
  }

  if (!arr.some((e) => e === null)) {
    winnerMessage.innerHTML = `This Match is Draw!`;
    winnerMessage.style.color = "Green"; // Optional: Color for draw
  }
}

function handleClick(el) {
  const id = Number(el.id);
  if (arr[id] !== null) {
    return;
  }
  // arr[id] = currentPlayer;
  // el.innerText = currentPlayer;
  arr[id] = currentPlayer;
  el.innerText = currentPlayer;
  el.classList.add(currentPlayer.toLowerCase());
  el.style.fontWeight = "bold";

  // Ensure consistent color for X and O
  if (currentPlayer === "X") {
    el.style.color = "orange";
  } else if (currentPlayer === "O") {
    el.style.color = "purple";
  }

  checkWinner();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", function () {
  arr.fill(null);
  currentPlayer = "X";
  winnerMessage.innerHTML = "";
  winnerMessage.style.color = "black";
  const cells = document.querySelectorAll(".col");
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.style.color = ""; // Clear color to prevent conflicts
    cell.style.pointerEvents = "auto";
  });
});

function disableBoard() {
  const cells = document.querySelectorAll(".col");
  cells.forEach((cell) => {
    cell.style.pointerEvents = "none";
  });
}
