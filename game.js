const startButton = document.querySelector('.startButton');
const restart = document.querySelector('.restart');
const boardEl = document.querySelector('.game');
const addPlayer = document.querySelector('.addPlayer');
const playerComp = document.querySelector('.playerComp');
const currentName = document.getElementById("currentName");
let stopClicker = 0;
let computer = 1;
let move = 9;
let turnPlayer = 0;
let compWin = 0;

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
    if (stopClicker > 0){
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
            event.target.classList.add('disabled');
            renderGame();
            winChecker();
        }
        else {
            if(state.board[row][column]){
                alert("already used");
            }
            else{
                state.board[row][column]=state.players[state.currentPlayer];
                move--;
                if (move > 0){
                    computerPlayer();
                    renderGame();
                }
                event.target.classList.add('disabled');
                renderGame();
                winChecker();
            }
        }
    }
    console.log(state.board);
    console.log(move);
});

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

    if (move === 0 && stopClicker === 0){
        document.querySelector('.game-over').classList.add('visible')
        document.querySelector('.game-over-text').textContent = 'Draw!';
    }
}

playerComp.addEventListener('click', function(){
    playerComp.classList.toggle('hidden');
    currentName.innerText = `Player vs. Computer`
})

restart.addEventListener('click', function(){
    move = 9;
    stopClicker = 0;
    compWin = 0;
    state.board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]];
    renderGame();
    startButton.classList.toggle('hidden');
    boardEl.classList.toggle('hidden');
    document.querySelector('.game-over').classList.remove('visible');
    if (computer === 0){
        playerCount.classList.toggle('hidden');
        currentName.innerText = `Player 1 vs. Player 2`
    }
    else if(computer === 1){
        playerCount.classList.toggle('hidden');
        currentName.innerText = `Player vs. Computer`
    }
})

startButton.addEventListener('click', function(){
    playerCount.classList.toggle('hidden');
    startButton.classList.toggle('hidden');
    boardEl.classList.toggle('hidden');
    playerName = document.getElementById('playerName').value;
    player2Name = document.getElementById('player2').value;
    turnPlayer = Math.floor(Math.random()*2);
    if(turnPlayer === 0){
        currentName.innerText = `${playerName}'s Turn`;
        turnPlayer++;
    }
    else if(turnPlayer === 1){
        currentName.innerText = `${player2Name}'s Turn`;
        turnPlayer--;
    }
})

addPlayer.addEventListener('click', function(){
    player2.classList.toggle('hidden');
    addPlayer.classList.toggle('hidden');
    playerComp.classList.toggle('hidden');
    currentName.innerText = `Player 1 vs. Player 2`
    computer = 0;
})

playerComp.addEventListener('click', function(){
    player2.classList.toggle('hidden');
    addPlayer.classList.toggle('hidden');
    currentName.innerText = `Player vs. Computer`
    computer = 1;
})

function computerPlayer() {
    if (move === 8 && state.board[1][1] != 'X'){
        state.board[1][1] = 'O';
        move--;
    }
    else if (move === 8){
        tile = Math.floor(Math.random()*8);
        if(tile <= 2){
            tile = Math.floor(Math.random()*3);
            if(tile === 1){
                state.board[0][0] = 'O';
            }
            else if(tile === 2){
                state.board[1][0] = 'O';
            }
            else {
                state.board[2][0] = 'O';
            }
        }
        else if (tile === 4){
            state.board[0][0] = 'O';
        }
        else if (tile === 5){
            state.board[0][2] = 'O';
        }
        else if (tile > 5){
            tile = Math.floor(Math.random()*3);
            if(tile === 1){
                state.board[0][2] = 'O';
            }
            else if(tile === 2){
                state.board[1][2] = 'O';
            }
            else {
                state.board[2][2] = 'O';
            }
        }
        move--;
    }
    else if (move <= 6){
        smartmove();
        if (move === 6){
            tile = Math.floor(Math.random()*6);
            for(i=0; i<3; i++){
                for (j=0; j<3; j++){
                    if (state.board[i][j] != 'X' && state.board[i][j] != 'O'){
                        if (tile === 0){
                            state.board[i][j] = 'O';
                            renderGame();
                            break;
                        }
                        else{
                            tile--;
                        }
                    }
                }
                if (tile === 0){
                    break;
                }
            }
            move--;
        }
    }
    else if (move <= 4){
        smartmove();
        if (move === 4){
            tile = Math.floor(Math.random()*4);
            for(i=0; i<3; i++){
                for (j=0; j<3; j++){
                    if (state.board[i][j] != 'X' && state.board[i][j] != 'O'){
                        if (tile === 0){
                            state.board[i][j] = 'O';
                            renderGame();
                            break;
                        }
                        else{
                            tile--;
                        }
                    }
                }
                if (tile === 0){
                    break;
                }
            }
            move--;
        }
    }
    else if (move <= 2){
        smartmove();
        if (move === 2){
            tile = Math.floor(Math.random()*2);
            for(i=0; i<3; i++){
                for (j=0; j<3; j++){
                    if (state.board[i][j] != 'X' && state.board[i][j] != 'O'){
                        if (tile === 0){
                            state.board[i][j] = 'O';
                            renderGame();
                            break;
                        }
                        else{
                            tile--;
                        }
                    }
                }
                if (tile === 0){
                    break;
                }
            }
            move--;
        }
    }
}

function smartmove(){
    for (i=0; i<3; i++){
        let playerRow = 0;
        let compRow = 0;
        let playerCol = 0;
        let compCol = 0;
        let blank = 0;
        for (j=0; j<3; j++){
            if (state.board[i][j] != 'O' && state.board[i][j] != 'X'){
                blank++;
            }

            if (state.board[i][j] === 'O'){
                compRow++;
                if (compRow === 2 && blank === 1){
                    rowWin(i);
                    compWin++;
                }
            }
            else if(state.board[i][j] === 'X'){
                playerRow++;
                if (playerRow === 2 && blank === 1){
                    rowWin(i);
                    move--;
                }
            }

            if (state.board[j][i] === 'O'){
                compCol++;
                if (compCol === 2 && blank === 1){
                    colWin(j);
                    compWin++;
                }
            }
            else if(state.board[j][i] === 'X'){
                playerCol++;
                if (playerCol === 2 && blank === 1){
                    colWin(j);
                    move--;
                }
            }
        }
    }
    if (compWin === 0){
        for (i=0; i<3; i++){
            let oDiagonal = 0;
            let xDiagonal = 0;
            let blank=0;
            if (state.board[i][i] != 'X' && state.board[i][i] != 'O'){
                blank++;
            }
            if (state.board[i][i] === 'O'){
                oDiagonal++;
                if(oDiagonal === 2 && blank === 0){
                    diagWin();
                    compWin++;
                }
            }
            else if (state.board[i][i] === 'X'){
                xDiagonal++;
                if(xDiagonal === 2 && blank === 0){
                    diagWin();
                    move--;
                }
            }
        }
    }
    if (compWin === 0){
        if (state.board[1][1] === 'O'){
            if(state.board[0][2] === 'O' && state.board[2][0] != 'X'&& state.board[2][0] != 'O'){
                state.board[2][0] = 'O';
            }
            else if(state.board[2][0] === 'O' && state.board[0][2] != 'X' && state.board[0][2] != 'O'){ 
                state.board[0][2] = 'O';
            }
        }
        else if(state.board[1][1] === 'X'){
            if(state.board[0][2] === 'X' && state.board[2][0] != 'O' && state.board[2][0] != 'X'){
                state.board[2][0] = 'O';
                move--;
            }
            else if(state.board[2][0] === 'X' && state.board[0][2] != 'O' &&  state.board[0][2] != 'X'){ 
                state.board[0][2] = 'O';
                move--;
            }
        }
    }
}

function rowWin(integer){
    let winningRow = integer;
    for (w = 0; w<3; w++){
        if (state.board[winningRow],[w] != 'X' && state.board[winningRow],[w] != 'O'){
            state.board[winningRow],[w] = 'O';
            break;
        }
    }
}

function colWin(integer){
    let winningCol = integer;
    for (w = 0; w<3; w++){
        if (state.board[w],[winningCol] != 'X' && state.board[w],[winningCol] != 'O'){
            state.board[w],[winningCol] = 'O';
            break;
        }
    }
}

function colWin(){
    for (i = 0; i<3; i++){
        if (state.board[i],[i] != 'X' && state.board[i],[i] != 'O'){
            state.board[i],[i] = 'O';
            compWin++;
            break;
        }
    }
}