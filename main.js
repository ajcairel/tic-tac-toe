// const dog = document.im 
// `img src="imgs/o.jpeg" alt="dog"`;
// const cat = `img src="imgs/x.jpeg.jpg" alt="cat"`;

// const dog = document.createElement("img");
// dog.src = "imgs/o.jpeg";
// const cat = document.createElement("img");
// cat.src = "imgs/x.jpeg";



// constants 
const lookup = {
    '1': 'cyan',
    '-1': 'magenta',
    'null': 'gray'
  };
  
  const winningCombos = [
    [0, 1, 2],
    [6, 7, 8],
    [0, 3, 6],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
    [1, 4, 7],
    [3, 4, 5]
];
  
// state variables
  let board; 
  let turn; 
  let winner;
//   playAgainBtn.style.visibility = 'hidden';
  
  
// cached elements 
//   const squares = document.querySelectorAll('td div');
const squares = document.querySelectorAll('div');
const message = document.querySelector('h1');
const playAgainBtn = document.getElementById('play-again-btn');
  
// event listeners
//   document.querySelector('table').addEventListener('click', handleMove);
//new new  document.querySelector('table').addEventListener('click', handleMove);
document.querySelector('section').addEventListener('click', handleMove);
  document.querySelector('button').addEventListener('click', init);

  
// functions
  
  init();
  
  function handleMove(evt) {
    // Note: Be sure to look at how the pointer-events: none;
    //       is being used in the CSS to make the div ignore clicks
  
    // obtain index of square
    const idx = parseInt(evt.target.id.replace('sq', ''));
    console.log('id: ' + idx);
    // check if square is available and return if not
    if (board[idx] || winner) return;
    // update state (board, turn, winner)
    board[idx] = turn;
    turn *= -1;
    winner = getWinner();
    render();
  }
  
  function getWinner() {
    // if it equals 3, then it is a winning row
    for (let i = 0; i < winningCombos.length; i++) {
      if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]]) === 3) {
        playAgainBtn.style.visibility = 'visible';
        return board[winningCombos[i][0]];
        }
    }
    if (board.includes(null)) return null;
    playAgainBtn.style.visibility = 'visible'
    return 'T';
  }
  
  function render() {
    board.forEach(function(sq, idx) {
      squares[idx].style.background = lookup[sq];
    //   squares[idx].innerText = lookup[sq];
      
    });
    // console.log(board);
    //console.log(squares);
    if (winner === 'T') {
      message.innerHTML = 'Tie Game!';
    } else if (winner) {
      message.innerHTML = `Congrats ${lookup[winner].toUpperCase()}!`;
    } else {
      message.innerHTML = `${lookup[turn].toUpperCase()}'s Turn`;
    }
  }

  
  function init() {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = null;
    playAgainBtn.style.visibility = 'hidden';
    render();

  }