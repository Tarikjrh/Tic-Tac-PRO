
let scoreBoard = [0, 0];
let board = [
    "X", "O", "",
    "X", "O", "",
    "", "", ""
];
let player = "X";
var canplay = true;
var connected = 0;
var reset = false

const game = {
    board: board,
    scoreBoard: scoreBoard,
    player: player,
    connected: connected,
    reset: reset
};

let gameId = ""

document.getElementById("HostModalbtn").click()

const hostForm = document.querySelector("#HostModal");

//create game 
db.collection('games')
    .add(game)
    .then(e => {
        console.log(e.id)
        gameId = e.id

        document.getElementById("hostGameID").value = gameId;
        hostForm.addEventListener("submit", e => {
            e.preventDefault();
            gameId = document.getElementById("hostGameID").value;
        })
        console.log("added ok")

    }).catch(err => {
        console.log(err.message);
    });























var count = 0;
// get data
db.collection("games").onSnapshot(function (snapshot) {
    snapshot.docChanges().forEach(function (change) {
        if (change.doc.id == gameId) {
            // console.log("X", isWon(board, "X"))
            // if (isWon(board, "X")) {
            //     document.querySelector("#turn").innerHTML = ` <h1  class="display-1 text-danger"> "$" Won !</h1>`

            // }
            // if (isWon(board, "O")) {
            //     document.querySelector("#turn").innerHTML = ` <h1  class="display-1 text-danger"> "$" Won !</h1>`

            // }
            // console.log("O", isWon(board, "O"))


            if (change.type === "modified" || change.type === "added") {

                isWon(board, "X")
                isWon(board, "O")

                scoreBoard = [change.doc.data().scoreBoard[0], change.doc.data().scoreBoard[1]];
                board = change.doc.data().board;
                renderBoard(board)
                console.log(isWon(board, player))

                player = change.doc.data().player;
                document.querySelector("#turn").innerHTML = ` <h1  class="display-1 "> It's  "${player}" Turn !</h1>`//show whose turn it is

                connected = change.doc.data().connected;
                reset = change.doc.data().reset;





                if (reset == true) {
                    resetGame()
                    db.collection('games').doc(gameId).update({

                        reset: false

                    }).then(() => {

                        console.log("added ok")
                    }).catch(err => {
                        console.log(err);
                    });
                }





                if (connected == 1 && count == 0) {

                    console.log("player has connected")
                    document.getElementById("HostModalbtn").click()
                    document.getElementById("getIdForm").innerHTML = `
                            <h3 class="text-center">Player Has Connected</h3>
                            <small id="idHelp" class="form-text text-muted pl-1 text-center">Game ID: ${gameId}</small>
                            `
                    count++
                }



            }
        }

    });
});




//gets input and does everything else => found in onlineHelper
playOnline("X")