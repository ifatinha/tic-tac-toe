const boardRegions = document.querySelectorAll(".cursor-pointer");
const gameBoard = document.querySelector("#gameBoard");
const inputs = document.querySelectorAll("")
let vBoard = [];
let turnPlayer = '';

function updateTitle() {
   const playerInput = document.querySelector(`#${turnPlayer}`);
   document.getElementById('turnPlayer').innerText = playerInput.value;
}

function getWinRegions() {
   const winRegions = [];

   if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
      winRegions.push(("0.0", "0.1", "0.2"));
   if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
      winRegions.push(("1.0", "1.1", "1.2"));
   if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
      winRegions.push(("2.0", "2.1", "2.2"));
   if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
      winRegions.push(("0.0", "1.0", "2.0"));
   if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
      winRegions.push(("0.1", "1.1", "2.1"));
   if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
      winRegions.push(("0.2", "1.2", "2.2"));
   if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
      winRegions.push(("0.0", "1.1", "2.2"));
   if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
      winRegions.push(("0.2", "1.1", "2.0"));

   return winRegions;
}

function restartGame() {
   const restartButton = document.querySelector("[data-restart-button]");

   restartButton.addEventListener('click', () => {
      location.reload();
   })
}

function checkWin() {
   const winRegions = getWinRegions();
   const winningMessage = document.querySelector('[data-winning-message]');
   const winningMessageText = document.querySelector("[data-winning-message-text]");

   if (winRegions.length > 0) {
      winningMessage.classList.add('active');
      winningMessageText.innerHTML = document.querySelector(`#${turnPlayer}`).value + ' Venceu!';
      restartGame();
   } else if (vBoard.flat().includes('')) {
      turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1';
      updateTitle();
   } else {
      winningMessage.classList.add('active');
      winningMessageText.innerHTML = 'Deu Empate!';
      restartGame();
   }
}

function handleBoardClick(event) {
   const span = event.target;
   const rowColumnPair = event.currentTarget.dataset.region.split('.');
   const row = rowColumnPair[0];
   const column = rowColumnPair[1];

   if (turnPlayer === 'player1') {
      span.classList.add('x');
      vBoard[row][column] = 'X';
      gameBoard.classList.remove('x');
      gameBoard.classList.add('o');
   } else {
      span.classList.add('o');
      vBoard[row][column] = 'O';
      gameBoard.classList.remove('o');
      gameBoard.classList.add("x");
   }

   checkWin();

}

function initializeGame() {
   vBoard = [['', '', ''], ['', '', ''], ['', '', '']];
   turnPlayer = 'player1';
   document.querySelector("h2").innerHTML = 'Sua vez <span id="turnPlayer"></span>';
   updateTitle();

   boardRegions.forEach((span) => {
      span.classList.remove('x');
      span.classList.remove('o');
      span.innerText = "";

      span.addEventListener('click', handleBoardClick);
   })
}

(() => {
   document.querySelector("#button-start").addEventListener('click', initializeGame);
})();