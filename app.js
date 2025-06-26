const cells = document.querySelectorAll('.cell')
const statusMsg = document.querySelector('#status')
const resetButton = document.querySelector('#reset')
const winsX = document.querySelector('#winsX')
const winsO = document.querySelector('#winsO')

let currentPlayer = 'X'
let gameBoard = ['','','',
			 '','','',
			 '','','']

let gameOver = false;

const winningCombos = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal
  [2, 4, 6]  // opposite diagonal
];

function checkWin(player){
	for (let combo of winningCombos){
		if (combo.every(index => gameBoard[index] === player))
			return combo;
	}
	return false
}

function boardFull(){
	return gameBoard.every(cell => cell != '')
}

function changeTurn(player){
	if (player === 'X'){
		statusMsg.innerText = "Player O's turn"
		return player = 'O'
	}
	else {
		statusMsg.innerText = "Player X's turn"
		return player = 'X'
	}
}


for (let cell of cells){
	cell.addEventListener('click', () =>{
		if (gameOver) return;
		if (cell.innerText === "")
			if (currentPlayer === 'X'){
				cell.innerText = "\u00D7";
				cell.classList.add('x')
				gameBoard[cell.dataset.index] = currentPlayer;
				victoryCombo = checkWin(currentPlayer);
				if (victoryCombo){
					statusMsg.innerText = `${currentPlayer} wins!`;
					winsX.innerText = `${parseInt(winsX.innerText) + 1}`
					gameOver = true;

					victoryCombo.forEach((i, delay) => {
					const cell = cells[i];
					setTimeout(() => {
						cell.classList.add('winner-animation');
					}, delay * 300);
				});
				}
				else if (boardFull()){
					statusMsg.innerText = "It's a draw!";
					gameOver = true;
				}
				else{
					currentPlayer = changeTurn(currentPlayer)
				}
			}
			else{
				cell.innerText = 'O'
				cell.classList.add('o')
				gameBoard[cell.dataset.index] = currentPlayer;
				victoryCombo = checkWin(currentPlayer);
				if (victoryCombo){
					statusMsg.innerText = `${currentPlayer} wins!`;
					winsO.innerText = `${parseInt(winsO.innerText) + 1}`
					gameOver = true;

					victoryCombo.forEach((i, delay) => {
					const cell = cells[i];
					setTimeout(() => {
						cell.classList.add('winner-animation');
					}, delay * 300);
				});
				}
				else if (boardFull()){
					statusMsg.innerText = "It's a draw!";
					gameOver = true;
				}
				else{
					currentPlayer = changeTurn(currentPlayer)
				}
			}
		else{
			statusMsg.innerText = "That spot is already taken. Choose another one."
			setTimeout (() => {
				statusMsg.innerText = `Player ${currentPlayer}'s turn`;
			}, 2500)
		}
	})
}


resetButton.addEventListener('click', () =>{
	gameBoard = ['','','',
			 '','','',
			 '','','']
	currentPlayer = 'X'
	for (let cell of cells){
		cell.innerText = ''
		cell.classList.remove('x', 'o', 'winner-animation');
	}
	statusMsg.innerText = "Player X's turn"
	gameOver = false;
})
