function checkEmpty(ar) {

    emptyPlaces = []
    for (i = 0; i < ar.length; i++) {
        if (ar[i] == "") {
            emptyPlaces.push(i)

        }
    }
    return emptyPlaces
}




// function isGameOver(ar) {

//     var x = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [6, 4, 2]
//     ]

//     //IF THERE ARE EMPTY SPACES => CHECK IF SOMEONE WON
//     if (checkEmpty(ar).length != 0) {

//         for (i = 0; i < x.length; i++) {
//             // console.log(arx[x[i][0]], arx[x[i][1]], arx[x[i][2]])

//             if (ar[x[i][0]] == "X" && ar[x[i][1]] == "X" && ar[x[i][2]] == "X") {
//                 return "X"
//             }
//             else if (ar[x[i][0]] == "O" && ar[x[i][1]] == "O" && ar[x[i][2]] == "O") {

//                 return "O"
//             }
//             else {
//             }

//         }

//         return null
//     }
//     else {
//         return "tie"
//     }

// }

function isGameOver(ar) {

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

    //IF THERE ARE EMPTY SPACES => CHECK IF SOMEONE WON
    if (checkEmpty(ar).length != 0) {

        for (i = 0; i < x.length; i++) {

            if (ar[x[i][0]] == "X" && ar[x[i][1]] == "X" && ar[x[i][2]] == "X") {

                return { player: "X", formation: i }
            }
            else if (ar[x[i][0]] == "O" && ar[x[i][1]] == "O" && ar[x[i][2]] == "O") {

                return { player: "O", formation: i }
            }


        }
        return { player: null, formation: null }

    }
    else {
        //ACCOUNT FOR FINAL MOVE WHEN BOARD IS FULL
        for (i = 0; i < x.length; i++) {
            if (ar[x[i][0]] == "X" && ar[x[i][1]] == "X" && ar[x[i][2]] == "X") {
                return { player: "X", formation: i }
            }

            else if (ar[x[i][0]] == "O" && ar[x[i][1]] == "O" && ar[x[i][2]] == "O") {
                return { player: "O", formation: i }
            }
        }

        return { player: "tie", formation: null }
    }

}



function displayWinner(board) {
    var y = ["a", "b", "c", "d", "e", "f", "g", "h", "i"]
    var c = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]
    x = isGameOver(board)
    if (x.player == "X") {
        document.querySelector("#turn").innerHTML = ` <h1  class="display-1 text-danger"> "X" Won !</h1>`
        scoreBoard[0]++
        disableAll()
        document.getElementById(y[c[x.formation][0]]).style.backgroundColor = "#eeeeee";
        document.getElementById(y[c[x.formation][1]]).style.backgroundColor = "#eeeeee";
        document.getElementById(y[c[x.formation][2]]).style.backgroundColor = "#eeeeee";

    }
    else if (x.player == "O") {
        document.querySelector("#turn").innerHTML = ` <h1  class="display-1 text-danger"> "O" Won !</h1>`
        scoreBoard[1]++
        disableAll()
        document.getElementById(y[c[x.formation][0]]).style.backgroundColor = "#eeeeee";
        document.getElementById(y[c[x.formation][1]]).style.backgroundColor = "#eeeeee";
        document.getElementById(y[c[x.formation][2]]).style.backgroundColor = "#eeeeee";

    }
    else if (x.player == "tie") {
        document.querySelector("#turn").innerHTML = `<h1  class="display-1 text-danger"> Draw !</h1> `
    }
    else {
        document.querySelector("#turn").innerHTML = ` It's  "${player}" Turn !`
    }
}



function renderBoard(ar) {
    const btns = document.querySelectorAll(".xo")
    for (i = 0; i < btns.length; i++) {
        btns[i].innerHTML = (ar)[i]
    }

    document.getElementById("scores").innerHTML = `
    <h1><span  style=" float: left; margin-left: 25%;">X: ${scoreBoard[0]} </span> <span style=" float: right; margin-right: 25%;">O: ${scoreBoard[1]}</span></h1>

    `
}


function getInput(ar, btnID) {
    var y = ["a", "b", "c", "d", "e", "f", "g", "h", "i"]
    ar[y.indexOf(btnID)] = "O"
    renderBoard(board)
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




//RESET GAME
document.getElementById("reset").addEventListener("click", e => {
    resetGame()
})


function resetGame() {
    players = ["X", "O"]
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




    if (player == "X") {
        AIMove()
        renderBoard(board)
    }

}


//NEW GAME  
document.getElementById("newGame").addEventListener("click", e => {
    newGame()
})
function newGame() {
    scoreBoard = [0, 0];
    resetGame();

}