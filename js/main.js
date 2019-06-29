//just tie and board clear left
/*----- constants -----*/
const COLORS = {
  'null': 'white',
  '1': 'dodgerblue',
  '-1':'#FD5A1E'
};
const PLAYERS = {
  '1': 'blue',
  '-1':'orange'
}

/*----- app's state (variables) -----*/
let moves, turn, winner, boardSize, gameArray;

/*----- cached element references -----*/
const msg = document.getElementById('message');
const squares = document.querySelectorAll('td');
/*----- event listeners -----*/
document.querySelector('table').addEventListener('click', onMove);
document.querySelector('button').addEventListener('click', initialize);

/*----- functions -----*/
initialize();

function onMove(evt){
  if (moves <= 8){
    //store location of click, column and row
    let square = evt.target;
    let clickLocation = square.id.split('');
    let clickX = clickLocation[0];
    let clickY = clickLocation[1];
    //exit if winner or the square is taken
    if (winner || gameArray[clickX][clickY]) return;
    //update game state
    gameArray[clickX][clickY] = turn;
    square.style.backgroundColor = COLORS[turn];
    checkVert(clickX);
    checkHorz(clickY);
    if (gameArray[1][1]) checkDiag();
    render(square);
    moves++
  } else if (moves === 8){
    message.textContent = "Tie"
  } else return;
  }



function render(sqr){
  sqr.style.background = COLORS[sqr];
  if (!winner) {
    message.textContent = PLAYERS[turn];
    turn *= -1;
  } else message.textContent = `${PLAYERS[turn]} has won`

}

function initialize(){
  gameArray = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  turn = 1;
  moves = 1;
  message.textContent = 'Blue goes first';
  boardSize = gameArray.length;
  winner = null;
  squares.forEach(square => square.style.background = 'white');
}

function checkVert(x){
  let score = 0;
  for (var i = 0; i < boardSize; i++){
    score += gameArray[x][i];
  }
  if (Math.abs(score) === boardSize) winner = PLAYERS[turn];
  }

function checkHorz(y){
  let score = 0;
  for (var i =  0; i < boardSize; i++){
    score += gameArray[i][y];
  }
  if (Math.abs(score) === boardSize) winner = PLAYERS[turn];
}
  function checkDiag(){
    if ((gameArray[1][1] === gameArray[0][0]) && (gameArray[1][1] === gameArray[2][2])) winner = turn;
    if ((gameArray[1][1] === gameArray[2][0]) && (gameArray[1][1] === gameArray[0][2])) winner = turn;
  }
