/** @format */

let currentPlayer = "X";
let arr = Array(9).fill(null);

const winnerMessage = document.getElementById("winnerMessage");

function checkWinner() {
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

  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (arr[a] !== null && arr[a] === arr[b] && arr[b] === arr[c]) {
      winnerMessage.innerHTML = `Winner is ${currentPlayer} !`;

      // Color for the winner
      const color = currentPlayer === "X" ? "orange" : "purple";
      winnerMessage.style.color = color;

      // Draw line through the winning combination
      drawLine(combo, color);

      // Make the grid invisible
      // makeGridInvisible();
      disableBoard();
      return; // Stop further checks after a win
    }
  }

  // Check for Draw
  if (!arr.some((e) => e === null)) {
    winnerMessage.innerHTML = `Match Draw!`;
    winnerMessage.style.color = "green";

    // Make the grid invisible on Draw
    // makeGridInvisible();
  }
}

function drawLine(combo, color) {
  // Remove any existing line first
  const existingLine = document.querySelector(".win-line");
  if (existingLine) {
    existingLine.remove();
  }

  // Get the first and last cell of the winning combo
  const startCell = document.getElementById(combo[0]);
  const endCell = document.getElementById(combo[2]);

  // Get positions
  const startRect = startCell.getBoundingClientRect();
  const endRect = endCell.getBoundingClientRect();

  // Calculate start and end points
  const startX = startRect.left + startRect.width / 2;
  const startY = startRect.top + startRect.height / 2;
  const endX = endRect.left + endRect.width / 2;
  const endY = endRect.top + endRect.height / 2;

  // Create a line
  const line = document.createElement("div");
  line.classList.add("win-line");
  line.style.position = "absolute";
  line.style.backgroundColor = color;
  line.style.height = "5px";
  line.style.borderRadius = "5px";
  line.style.transformOrigin = "0 0";
  line.style.transform = `rotate(${Math.atan2(
    endY - startY,
    endX - startX
  )}rad)`;
  line.style.width = `${Math.sqrt(
    Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
  )}px`;
  line.style.left = `${startX}px`;
  line.style.top = `${startY}px`;
  line.style.pointerEvents = "none"; // Allow clicks through the line
  line.style.zIndex = "1";

  // Add to body
  document.body.appendChild(line);
}

function handleClick(el) {
  const id = Number(el.id);
  if (arr[id] !== null) {
    return;
  }

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

  // // Restore the grid on reset
  // restoreGrid();

  const cells = document.querySelectorAll(".col");
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.style.color = "";
    cell.style.pointerEvents = "auto";
  });

  // Remove the line on reset
  const existingLine = document.querySelector(".win-line");
  if (existingLine) {
    existingLine.remove();
  }
});

function disableBoard() {
  const cells = document.querySelectorAll(".col");
  cells.forEach((cell) => {
    cell.style.pointerEvents = "none";
  });
}

// // Function to make the grid invisible
// function makeGridInvisible() {
//   const cells = document.querySelectorAll(".col");
//   cells.forEach((cell) => {
//     cell.style.border = "none"; // Hides all grid borders
//   });
// }

// // Function to restore the grid on reset
// function restoreGrid() {
//   const rows = document.querySelectorAll(".col");
//   rows.forEach((row) => {
//     row.style.border = "2px solid black"; // Adjust to your original grid color
//   });
// }

// Add event listeners to all cells
const cells = document.querySelectorAll(".col");
cells.forEach((cell) => {
  cell.addEventListener("click", function () {
    handleClick(cell);
  });
});
