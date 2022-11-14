const startButton = document.querySelector('.startButton');
const restart = document.querySelector('.restart');
const boardEl = document.querySelector('.game');
const addPlayer = document.querySelector('.addPlayer');
const playerComp = document.querySelector('.playerComp');
const normal = document.querySelector('.normal');
const impossible = document.querySelector('.impossible');
const currentName = document.getElementById("currentName");
const playerName = document.getElementById('playerName').value;
const player2Name = document.getElementById('player2').value;
let stopClicker = 0;
let computer = 2;
let move = 9;
let turnPlayer = 0;

// const game = {
//     xState: [],
//     oState: [], //loop through winning states, for each state check if player state includes the first array of win condition. If so continue until it either true or false; if true, return winner, if false continue each win condition until a winner is determined.
//     winningStates: [
//         // Rows
//         [['0','0'], ['0','1'], ['0','2']],
//         [['1','0'], ['1','1'], ['1','2']],
//         [['2','0'], ['2','1'], ['2','2']],

//         // Columns
//         [['0','0'], ['1','0'], ['2','0']],
//         [['0','1'], ['1','1'], ['2','1']],
//         [['0','2'], ['1','2'], ['2','2']],

//         // Diagonal
//         [['0','0'], ['1','1'], ['2','2']],
//         [['0','2'], ['1','1'], ['2','0']],
//     ]
// }

const state = {
    board:[
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ],
    players: ['X', 'O'],
    currentPlayer: 0
}

function createCell(rowIndex, columnIndex){
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.row = rowIndex;
    cell.dataset.column = columnIndex;
    cell.textContent = state.board[rowIndex][columnIndex];          
    boardEl.appendChild(cell);
}

function renderGame(){
    boardEl.innerHTML = '';
    state.board.forEach((row, rowIndex) => {
        for(let i=0; i<row.length; i++){
            createCell(rowIndex, i);
        }
    })
}
renderGame();

boardEl.addEventListener('click', function(event){
    if (stopClicker >0){
        stopPropation();
    }
    if(event.target.matches('.cell')){
        const row = event.target.dataset.row;
        const column = event.target.dataset.column;
        if(computer === 0){
            if(state.board[row][column]){
                alert("already used");
            }
            else{
                state.board[row][column]=state.players[state.currentPlayer];
                move--;
                if (turnPlayer === 0){
                    turnPlayer++;
                    currentName.innerText = `${playerName}'s Turn`;
                }
                else if (turnPlayer === 1){
                    turnPlayer--;
                    currentName.innerText = `${player2Name}'s Turn`;
                }
                changePlayerTurn();
            }
        }
        else if (computer === 2){
            computerPlayer(state);
            changePlayerTurn();
        }
    }
    event.target.classList.add('disabled');
    renderGame();
    winChecker();
    console.log(state.board);
})

function changePlayerTurn(){
    state.currentPlayer = state.currentPlayer === 0 ? 1 : 0;
}

function winChecker(){
    for (i=0; i<3; i++){
        let xPlayerRow = 0;
        let oPlayerRow = 0;
        let xPlayerCol = 0;
        let oPlayerCol = 0;
        for (j=0; j<3; j++){
            if (state.board[i][j] === 'X'){
                xPlayerRow++;
            }
            else if(state.board[i][j] === 'O'){
                oPlayerRow++;
            }
            if (state.board[j][i] === 'X'){
                xPlayerCol++;
            }
            else if(state.board[j][i] === 'O'){
                oPlayerCol++;
            }
        }
        if (xPlayerRow === 3){
            document.querySelector('.game-over').classList.add('visible')
            document.querySelector('.game-over-text').textContent = 'X has won!';
            stopClicker++;
            break;
        }
        else if (oPlayerRow === 3){
            document.querySelector('.game-over').classList.add('visible')
            document.querySelector('.game-over-text').textContent = 'O has won!';
            stopClicker++;
            break;
        }
        if (xPlayerCol === 3){
            document.querySelector('.game-over').classList.add('visible')
            document.querySelector('.game-over-text').textContent = 'X has won!';
            stopClicker++;
            break;
        }
        else if (oPlayerCol === 3){
            document.querySelector('.game-over').classList.add('visible')
            document.querySelector('.game-over-text').textContent = 'O has won!';
            stopClicker++;
            break;
        }
    }

    if ( state.board[0][0] === 'X' && state.board[1][1] === 'X' && state.board[2][2] === 'X'){
        document.querySelector('.game-over').classList.add('visible')
        document.querySelector('.game-over-text').textContent = 'X has won!';
        stopClicker++;
    }
    else if (state.board[0][0] === 'O' && state.board[1][1] === 'O' && state.board[2][2] === 'O'){
        document.querySelector('.game-over').classList.add('visible')
        document.querySelector('.game-over-text').textContent = 'O has won!';
        stopClicker++;
    }

    if ( state.board[0][2] === 'X' && state.board[1][1] === 'X' && state.board[2][0] === 'X'){
        document.querySelector('.game-over').classList.add('visible')
        document.querySelector('.game-over-text').textContent = 'X has won!';
        stopClicker++;
    }
    else if (state.board[0][2] === 'O' && state.board[1][1] === 'O' && state.board[2][0] === 'O'){
        document.querySelector('.game-over').classList.add('visible')
        document.querySelector('.game-over-text').textContent = 'O has won!';
        stopClicker++;
    }

    if (move === 0){
        document.querySelector('.game-over').classList.add('visible')
        document.querySelector('.game-over-text').textContent = 'Draw!';
    }
}

normal.addEventListener('click', function(){
    normal.classList.toggle('hidden');
    impossible.classList.toggle('hidden');
    currentName.innerText = `${playerName} vs. War Games Computer`
    computer=1;
})
impossible.addEventListener('click', function(){
    normal.classList.toggle('hidden');
    impossible.classList.toggle('hidden');
    currentName.innerText = `${playerName} vs. Normal Computer`
    computer=2;
})

restart.addEventListener('click', function(){
    move = 9;
    stopClicker = 0;
    state.board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]];
    renderGame();
    startButton.classList.toggle('hidden');
    playerCount.classList.toggle('hidden');
    boardEl.classList.toggle('hidden');
    document.querySelector('.game-over').classList.remove('visible');
    if (computer > 0){
        difficulty.classList.toggle('hidden');
    }
})

startButton.addEventListener('click', function(){
    playerCount.classList.toggle('hidden');
    startButton.classList.toggle('hidden');
    boardEl.classList.toggle('hidden');
    if (computer > 0){
        difficulty.classList.toggle('hidden');
    }
    else if(computer === 0){
        turnPlayer = Math.floor(Math.random()*2);
        if(turnPlayer === 0){
            currentName.innerText = `${playerName}'s Turn`;
        }
        else if(turnPlayer === 1){
            currentName.innerText = `${player2Name}'s Turn`;
        }
    }
})

addPlayer.addEventListener('click', function(){
    difficulty.classList.toggle('hidden');
    player2.classList.toggle('hidden');
    addPlayer.classList.toggle('hidden');
    playerComp.classList.toggle('hidden');
    currentName.innerText = `${playerName} vs. ${player2Name}`
    computer=0;
})
playerComp.addEventListener('click', function(){
    difficulty.classList.toggle('hidden');
    player2.classList.toggle('hidden');
    addPlayer.classList.toggle('hidden');
    playerComp.classList.toggle('hidden');
})

function computerPlayer(state) {
    let availablePositions = state.board.filter(null);
    const move = Math.floor(Math.random() * (availablePositions.length - 0));
    availablePositions[move].innerText = 'O';
  }