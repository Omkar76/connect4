"use strict";

const rows = 6, cols = 7;
const width = 500;
const height = 6 / 7 * width;
const margin = 20;
const radius = width / 7 / 2;
const colors = ["Red", "Blue"];
const boardState = [];
const circles = [];
let finished = false;
let player = 0;

const svg = document.querySelector("#board");
svg.addEventListener("click", clickHandler);

init();
function clear(){
  circles.forEach(row=>row.forEach(circle=>circle.setAttribute('fill','transparent')));
  boardState.forEach(row=>row.fill(null));
}
function clickHandler(event) {
  if(finished){
    clear();
    finished = false;
    return;
  }
  const x = event.x - svg.getBoundingClientRect().left;
  const col = Math.floor(x / (width / cols));
  insert(col);

}

function insert(col) {
  for (let i = rows - 1; i >= 0; i--) {
    if (boardState[i][col] === null) {
      boardState[i][col] = player;
      circles[i][col].setAttribute("fill", colors[player]);

      areFourConnected();
      checkDraw();
      player = player === 0 ? 1 : 0;
      return;
    }
  }

  alertify.alert("Column already full");
}
function checkDraw() {
  for (let i = 0; i < cols; i++) {
    if (boardState[0][i] == null) {
      return;
    }
  }
  alertify.alert("It's a draw!");
  finished = true;
}
function areFourConnected() {
  // Check horizontally
  for (let i = rows - 1; i >= 0; i--) {
    for (let j = 0; j < cols - 3; j++) {
      console.log(i, j)
      if (boardState[i][j] == player && boardState[i][j + 1] == player && boardState[i][j + 2] == player && boardState[i][j + 3] == player) {
        finished = true;
      }
    }
  }

  // Check vertically
  for (let i = rows - 1; i >= 3; i--) {
    for (let j = 0; j < cols; j++) {
      console.log(i, j)
      if (boardState[i][j] == player && boardState[i - 1][j] == player && boardState[i - 2][j] == player && boardState[i - 3][j] == player) {
        finished = true;
      }
    }

  }

  // ascendingDiagonalCheck 
  for (let i = 3; i < rows; i++) {
    for (let j = 0; j < cols - 3; j++) {
      if (boardState[i][j] == player && boardState[i - 1][j + 1] == player && boardState[i - 2][j + 2] == player && boardState[i - 3][j + 3] == player)
        finished = true;
    }
  }
  // descendingDiagonalCheck
  for (let i = 3; i < rows; i++) {
    for (let j = 3; j < cols; j++) {
      if (boardState[i][j] == player && boardState[i - 1][j - 1] == player && boardState[i - 2][j - 2] == player && boardState[i - 3][j - 3] == player)
        finished = true;
    }
  }

  finished && alertify
  .alert(colors[player] + " Won!");
}

function init() {
  board.setAttribute('height', height);
  board.setAttribute('width', width);

  for (let i = 0; i < rows; i++) {
    const boardRow = [];
    const circleRow = [];
    for (let j = 0; j < cols; j++) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

      circle.setAttribute('cy', radius * 2 * i + radius);
      circle.setAttribute('cx', radius * 2 * j + radius);
      circle.setAttribute('r', radius);
      circle.setAttribute('stroke', 'black');

      boardRow.push(null);
      circleRow.push(circle);
      svg.appendChild(circle);
    }
    boardState.push(boardRow);
    circles.push(circleRow);
  }
}
