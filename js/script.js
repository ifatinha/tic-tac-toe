const boardRegions = document.querySelectorAll(".cursor-pointer");
let vBoar = [];
let turnPlayer = '';

function updateTitle() {
   const playerInput = document.querySelector(`#${turnPlayer}`);
   document.getElementById('turnPlayer').innerText = playerInput.value;
}

function handleBoardClick(event) {
   const span = event.target;
   const rowColumnPair = event.currentTarget.dataset.region.split('.');
   const row = rowColumnPair[0];
   const column = rowColumnPair[1];

   if (turnPlayer === 'player1') {
      span.classList.add('x');
      vBoar[row][column] = 'X';
   } else {
      span.classList.add('o');
      vBoar[row][column] = 'O';
   }
}

function initializeGame() {
   vBoar = [['', '', ''], ['', '', ''], ['', '', '']];
   turnPlayer = 'player1';
   document.querySelector("h2").innerHTML = 'Vez de: <span id="turnPlayer"></span>';
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