var scoreBoard = [0, 0];
var board =
    [
        "", "", "",
        "", "", "",
        "", "", ""
    ];
let player = "X";

let scores = {
    X: 1,
    O: -1,
    tie: 0

}

var boardClick = document.querySelector("#board")
boardClick.addEventListener("click", e => {
    e.preventDefault()

    var btnID = e.target.id;
    if (e.target.parentElement.id == "board" && e.target.tagName == "BUTTON") {
        // console.log(e.target.innerHTML)
        if (e.target.innerHTML == "") {
            if (player == "O") {
                getInput(board, btnID)

                player = "X"
                document.querySelector("#turn").innerHTML = ` <h1  class="display-1 "> It's  "${player}" Turn !</h1>`


                AIMove()
                renderBoard(board)
                displayWinner(board)

            }



        }
        // (isGameOver(board))
    }
})


if (player == "X") {
    AIMove()
    renderBoard(board)
}





function AIMove() {
    // AI to make its turn
    let MaxScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {

        // Is the spot available?
        if (board[i] == '') {
            board[i] = "X";
            let score = minimax(board, 0, false);
            board[i] = '';
            if (score > MaxScore) {
                MaxScore = score;
                move = i
            }
        }

    }
    board[move] = "X";
    player = "O";
    return move
}


function minimax(board, depth, isMaximizing) {

    let result = isGameOver(board);

    if (result.player !== null) {
        return scores[result.player];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {

            if (board[i] == '') {
                board[i] = "X";
                let score = minimax(board, depth + 1, false);//SEE "O"s PLAY 
                board[i] = '';
                bestScore = Math.max(score, bestScore);

            }

        }
        return bestScore;

    }
    else {
        //for the "O"
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {

            if (board[i] == '') {
                board[i] = "O";
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);

            }

        }
        return bestScore;
    }
}

renderBoard(board)