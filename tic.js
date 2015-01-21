//js functions 

var board = [1, 2, 3, 4, 5, 6, 7, 8, 9]

//a function that takes a player ("X" or "Y"), opponent ("X" or "Y"), and the current board (array) 
//and returns either false or the next winning move for that player
function nextMoveWin (player, opponent, board){
	var winCombo = [
            [board[0], board[1], board[2]],
            [board[3], board[4], board[5]],
            [board[6], board[7], board[8]],
            [board[0], board[3], board[6]],
            [board[1], board[4], board[7]],
            [board[2], board[5], board[8]],
            [board[0], board[4], board[8]],
            [board[2], board[4], board[6]]
            ]
    for (var i = 0; i < winCombo.length; i++) {
		var count = 0; //counter for the player (Xs or Os) in the current winCombo subarray         
 		for (var j = 0; j < 3; j++) {
			if (winCombo[i][j] == player) {
				count++
			} else {
				var holdNextMove = winCombo[i][j]
			}
		}
        if (count > 1 && holdNextMove != opponent) {
           	//player could win with next move
            //subtract one as the indicies and values of the board array are off
          	nextMove = holdNextMove-1
          	return nextMove  	  
      	}
      	
   }
   //player can not win with next move
   return false     
}

//checks to see if player is a winner 
function isWinner(player, board){
	var winCombo = [
            [board[0], board[1], board[2]],
            [board[3], board[4], board[5]],
            [board[6], board[7], board[8]],
            [board[0], board[3], board[6]],
            [board[1], board[4], board[7]],
            [board[2], board[5], board[8]],
            [board[0], board[4], board[8]],
            [board[2], board[4], board[6]]
            ]
    for (var i = 0; i < winCombo.length; i++) {
		var count = 0; //counter for the player (Xs or Os) in the current winCombo subarray         
 		for (var j = 0; j < 3; j++) {
			if (winCombo[i][j] == player) {
				count++
			} else {
				var holdNextMove = winCombo[i][j]
			}
		}
        if (count > 2) {
           	return true  	  
      	}
      	
   }
   return false     
}

//dumb strategy function,takes board array 
//loops through numerically until it finds an empty spot
//returns move 

function nextStrat(board){
    var foundMove = false;
	for(i=0;i<board.length;i++){
        if(!foundMove){
       	    if(board[i] != "X" && board[i] != "O"){
      		    var nextMove =i  
                foundMove = true
     	    }    
        }
  	}    
    return nextMove
}
//draws current board to console
function drawBoard(board){
	console.log(board[0]+"|"+board[1]+"|"+board[2])
	console.log(board[3]+"|"+board[4]+"|"+board[5])
	console.log(board[6]+"|"+board[7]+"|"+board[8])
	
}

//Game

console.log("********NEW GAME***************")
var turn = 1;
var gameOver = false
while(turn<5 && !gameOver){
	drawBoard(board)
	var userMove = prompt("Please enter your choice(1-9), player X")
	board[userMove-1] = "X" 
	console.log("You chose: "+userMove)
	drawBoard(board)
	var userWins = isWinner("X", board)
	if(userWins){
		console.log("X WINS!")
		gameOver = true
	}
	else{
		console.log("My turn...")
		var compWinMove = nextMoveWin("O","X",board)
		var compDefMove = nextMoveWin("X","O",board)
		//if computer can not win next move 
		if (!compWinMove){
			if(!compDefMove){
				var nextStratMove = nextStrat(board)
				board[nextStratMove]="O"
				console.log("Strategically, I chose: "+(nextStratMove+1))
			}	
		//make the defensive move to prevent user from win
			else{
				board[compDefMove]="O"
				console.log("Defensively, I chose: "+(compDefMove+1))
			}
		}
		//else make the move to have computer win
		else{
			board[compWinMove]="O"
			console.log("Winningly, I chose: "+(compWinMove+1))
			gameOver = true
		}
		turn++
	}
}
drawBoard(board)
console.log("************GAME OVER**********")



 


