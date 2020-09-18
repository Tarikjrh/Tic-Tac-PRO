players = ["X", "O"]

function renderBoard(ar) {
    const btns = document.querySelectorAll(".xo")
    for (i = 0; i < btns.length; i++) {
        btns[i].innerHTML = (ar)[i]
    }

    document.getElementById("scores").innerHTML = `
    <h1><span  style=" float: left; margin-left: 25%;">X: ${scoreBoard[0]} </span> <span style=" float: right; margin-right: 25%;">O: ${scoreBoard[1]}</span></h1>

    `
}

function getInput(ar, btnID, player) {
    var y = ["a", "b", "c", "d", "e", "f", "g", "h", "i"]
    ar[y.indexOf(btnID)] = player
    renderBoard(board)
}


function isWon(ar, player) {
    var x = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]

    var y = ["a", "b", "c", "d", "e", "f", "g", "h", "i"]
    for (i = 0; i < 8; i++) {

        if (ar[x[i][0]] == player && ar[x[i][1]] == player && ar[x[i][2]] == player) {
            document.getElementById(y[x[i][0]]).style.backgroundColor = "#eeeeee";
            document.getElementById(y[x[i][1]]).style.backgroundColor = "#eeeeee";
            document.getElementById(y[x[i][2]]).style.backgroundColor = "#eeeeee";
            document.querySelector("#turn").innerHTML = ` <h1  class="display-1 text-danger"> "${player}" Won !</h1>`

            //prevent players to keep playing once someone wins
            disableAll()

            //update the score board once someone wins
            scoreBoard[players.indexOf(player)]++
        }
    }



}

function checkEmpty(ar) {

    emptyPlaces = []
    for (i = 0; i < ar.length; i++) {
        if (ar[i] == "") {
            emptyPlaces.push(i)

        }
    }
    return emptyPlaces
}

function nextPlayer(player) {
    if (player == "X") {
        player = "O"
    }
    else {
        player = "X"
    }
    return player
}


//RESET GAME
document.getElementById("reset").addEventListener("click", e => {
    resetGame()
})


function resetGame() {


    player = players[Math.floor(Math.random() * players.length)];

    board =
        [
            "", "", "",
            "", "", "",
            "", "", ""
        ];

    renderBoard(board)
    enableBtnsAll()

    document.querySelector("#turn").innerHTML = ` It's  "${player}" Turn !`






}


//NEW GAME  
document.getElementById("newGame").addEventListener("click", e => {
    newGame()
})
function newGame() {
    scoreBoard = [0, 0];
    resetGame();

}



function disableAll() {

    var disabledBtns = document.querySelectorAll(".xo");
    disabledBtns.forEach(element => {
        element.disabled = true
    });

}


function enableBtnsAll() {

    var disabledBtns = document.querySelectorAll(".xo");
    disabledBtns.forEach(element => {
        element.disabled = false
        element.style.backgroundColor = "#393e46"
    });


}
