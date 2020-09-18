function playOnline(playerWanted) {


    var boardClick = document.querySelector("#board")
    boardClick.addEventListener("click", e => {
        e.preventDefault()

        var btnID = e.target.id;
        if (e.target.parentElement.id == "board" && e.target.tagName == "BUTTON") {

            if (e.target.innerText == "") {

                if (player == playerWanted) {

                    getInput(board, btnID, player)// see where player clicked and save his choice to array

                    isWon(board, player)// check the board to see if someone won


                    player = nextPlayer(player)// checnge the playing player

                    document.querySelector("#turn").innerHTML = ` <h1  class="display-1 "> It's  "${player}" Turn !</h1>`//show whose turn it is

                    renderBoard(board)//show changes to the board




                    // update



                    console.log(scoreBoard, board, player, "globally")
                    db.collection('games').doc(gameId).update({

                        board: board,
                        scoreBoard: scoreBoard,
                        player: player,
                        connected: connected,

                    }).then(() => {

                        console.log("added ok")
                    }).catch(err => {
                        console.log(err);
                    });
                }

                if (checkEmpty(board).length == 0) {// in case the board is filled => we show that its a draw
                    document.querySelector("#turn").innerHTML = `<h1  class="display-1 text-danger"> Draw !</h1> `

                }


            }
        }
    })



}


// RESET GAME
document.getElementById("resetOnline").addEventListener("click", e => {
    resetGameOnline()
})
function resetGameOnline() {

    resetGame();


    db.collection('games').doc(gameId).update({

        board: board,
        scoreBoard: scoreBoard,
        player: player,
        connected: connected,
        reset: true

    }).then(() => {

        console.log("added ok")
    }).catch(err => {
        console.log(err);
    });

}