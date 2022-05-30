"use strict";
(function () {
  const rows = 6, cols = 7;

  const players = [
    { name: "Player1", color: "#ba143f" },
    { name: "Player2", color: "#1471d5"}
  ];

  const boardState = [];
  const circles = [];
  let isRunning = null;
  let player = Math.round(Math.random());

  const board = document.querySelector("#board");
  const turn = document.querySelector('#turn');
  init();

  function clear() {
    circles.forEach(row => row.forEach(circle => circle.style.backgroundColor = '#874790'));
    boardState.forEach(row => row.fill(null));
    player = Math.round(Math.random());

    turn.textContent = `${players[player].name}'s turn`;
    turn.style.color = players[player].color;
  }

  function insert(col) {
    for (let i = rows - 1; i >= 0; i--) {
      if (boardState[i][col] === null) {
        boardState[i][col] = player;
        circles[i][col].style.backgroundColor = players[player].color;

        areFourConnected();
        checkDraw();
        player = player === 0 ? 1 : 0;
        if (isRunning == true) {
          turn.textContent = `${players[player].name}'s turn`;
          turn.style.color = players[player].color;
        }
        return;
      }
    }

    const columnFullToast = new bootstrap.Toast(document.querySelector("#column-full-toast"),{delay:1000});
    columnFullToast.show();
  }
  function checkDraw() {
    for (let i = 0; i < cols; i++) {
      if (boardState[0][i] == null) {
        return;
      }
    }
    const drawModal = new bootstrap.Modal(document.querySelector("#draw-modal"));
    drawModal.show();
    isRunning = false;
  }
  function areFourConnected() {
    // Check horizontally
    for (let i = rows - 1; i >= 0; i--) {
      for (let j = 0; j < cols - 3; j++) {
        if (boardState[i][j] == player && boardState[i][j + 1] == player && boardState[i][j + 2] == player && boardState[i][j + 3] == player) {
          isRunning = false;
        }
      }
    }

    // Check vertically
    for (let i = rows - 1; i >= 3; i--) {
      for (let j = 0; j < cols; j++) {

        if (boardState[i][j] == player && boardState[i - 1][j] == player && boardState[i - 2][j] == player && boardState[i - 3][j] == player) {
          isRunning = false;
        }
      }

    }

    // ascendingDiagonalCheck 
    for (let i = 3; i < rows; i++) {
      for (let j = 0; j < cols - 3; j++) {
        if (boardState[i][j] == player && boardState[i - 1][j + 1] == player && boardState[i - 2][j + 2] == player && boardState[i - 3][j + 3] == player)
          isRunning = false;
      }
    }
    // descendingDiagonalCheck
    for (let i = 3; i < rows; i++) {
      for (let j = 3; j < cols; j++) {
        if (boardState[i][j] == player && boardState[i - 1][j - 1] == player && boardState[i - 2][j - 2] == player && boardState[i - 3][j - 3] == player)
          isRunning = false;
      }
    }

    //game ended
    if(isRunning==false){
      document.querySelector("#turn").textContent = `${players[player].name} Won!`;
      document.querySelector("#winner-name").textContent = players[player].name;
      const winnerModal = new bootstrap.Modal(document.querySelector("#winner-modal"));
      winnerModal.show();
    }
  }

  function init() {
    document.querySelector('#playButton').addEventListener('click', ()=>{
      /** @type {HTMLInputElement}  */
      let player1 = document.querySelector("#player1");

       /** @type {HTMLInputElement}  */
       let player2 = document.querySelector("#player2");

       players[0].name = player1.value?.trim() || "Player1";
       players[1].name = player2.value?.trim() || "Player2";

       isRunning = true;
       clear();
       console.log(players)
    });

    document.querySelector('#play-again').addEventListener('click',()=>{
      clear();
      isRunning = true;
    });

    for (let i = 0; i < rows; i++) {
      const boardRow = [];
      const circleRow = [];
      for (let j = 0; j < cols; j++) {
        const circle = document.createElement('div');
        circle.classList.add("circle");
        circle.addEventListener('click', function () {
          if (isRunning===null) {
            return;
          }else if(isRunning===true){
            insert(j);
          }
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