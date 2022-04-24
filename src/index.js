"use strict";
(function () {
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

  const board = document.querySelector("#board");
  const turn = document.querySelector('#turn');
  init();
  
  function clear() {
    circles.forEach(row => row.forEach(circle => circle.style.backgroundColor='white'));
    boardState.forEach(row => row.fill(null));
    player = 0;
    finished = false;
    turn.textContent = `${colors[player]}'s turn`;
    turn.style.color = colors[player];
  }

  function insert(col) {
    for (let i = rows - 1; i >= 0; i--) {
      if (boardState[i][col] === null) {
        boardState[i][col] = player;
        circles[i][col].style.backgroundColor = colors[player];

        areFourConnected();
        checkDraw();
        player = player === 0 ? 1 : 0;
        if (!finished) {
          turn.textContent = `${colors[player]}'s turn`;
          turn.style.color = colors[player];
        }
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
        if (boardState[i][j] == player && boardState[i][j + 1] == player && boardState[i][j + 2] == player && boardState[i][j + 3] == player) {
          finished = true;
        }
      }
    }

    // Check vertically
    for (let i = rows - 1; i >= 3; i--) {
      for (let j = 0; j < cols; j++) {

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
      .alert(colors[player] + " Won! Click on board to reset");
    turn.textContent = `${colors[player]} won!`
  }

  function init() {
    turn.textContent = `${colors[player]}'s turn`;
    turn.style.color = colors[player];
    for (let i = 0; i < rows; i++) {
      const boardRow = [];
      const circleRow = [];
      for (let j = 0; j < cols; j++) {
        const circle = document.createElement('div');
        circle.classList.add("circle");
        circle.addEventListener('click',   function(event) {
          if (finished) {
            clear();
            return;
          }
          insert(j);
        });
        boardRow.push(null);
        circleRow.push(circle);
        board.appendChild(circle);
      }
      boardState.push(boardRow);
      circles.push(circleRow);
    }
  }
})();