//reference to game ID
gameId = "";


let scoreBoard;
let board;
let player;
let connected;
let reset

//Open modal on load
document.getElementById("openModal").click();

let userForm = document.getElementById("getIdForm")

//get the gameID from enter
userForm.addEventListener("submit", e => {
    e.preventDefault();
    gameId = userForm["getgameID"].value;
    //close modal when submit is complete
    userForm.onsubmit = function () {
        document.getElementById("clodeModalBtn").click();
        initialGet()


        userForm.reset();
    };
})

// get the gameID from "save" btn
document.querySelector("#saveIdBtn").addEventListener("click", e => {
    gameId = userForm["getgameID"].value;
    document.getElementById("clodeModalBtn").click();
    initialGet();


    // userForm.reset();
})


//function to get any changes once the app is loaded
function initialGet() {
    db.collection("games")
        .doc(gameId)
        .get()
        .then(function (doc) {
            if (doc.exists) {


                scoreBoard = [doc.data().scoreBoard[0], doc.data().scoreBoard[1]];
                board = doc.data().board;
                player = doc.data().player;
                connected = doc.data().connected;

                renderBoard(board)
                isWon(board, player)


            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).then(() => {
            connected++;
            db.collection('games')
                .doc(gameId)
                .update({
                    connected: connected

                }).then(() => {

                    console.log("connected")
                }).catch(err => {
                    console.log(err);
                })

        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    connected++;
}


















// get data
db.collection("games").onSnapshot(function (snapshot) {
    snapshot.docChanges().forEach(function (change) {
        if (change.doc.id == gameId) {


            if (change.type === "modified" || change.type === "added") {



                scoreBoard = [change.doc.data().scoreBoard[0], change.doc.data().scoreBoard[1]];
                board = change.doc.data().board;
                renderBoard(board)
                console.log(isWon(board, player))

                player = change.doc.data().player;
                // document.querySelector("#turn").innerHTML = ` <h1  class="display-1 "> It's  "${player}" Turn !</h1>`//show whose turn it is

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



            }
        }

    });
});


//gets input and does everything else => found in onlineHelper
playOnline("O")