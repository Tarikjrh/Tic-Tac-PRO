var scoreBoard = [0, 0];
var board = [
    "", "", "",
    "", "", "",
    "", "", ""
];
let player = "X";
renderBoard(board)

var boardClick = document.querySelector("#board")
boardClick.addEventListener("click", e => {
    e.preventDefault()

    var btnID = e.target.id;
    if (e.target.parentElement.id == "board" && e.target.tagName == "BUTTON") {


        if (e.target.innerHTML == "") {

            getInput(board, btnID, player)// see where player clicked and save his choice to array

            isWon(board, player)// check the board to see if someone won

            player = nextPlayer(player)// checnge the playing player

            document.querySelector("#turn").innerHTML = ` <h1  class="display-1 "> It's  "${player}" Turn !</h1>`//show whose turn it is

            renderBoard(board)//show changes to the board



            if (checkEmpty(board).length == 0) {// in case the board is filled => we show that its a draw
                document.querySelector("#turn").innerHTML = `<h1  class="display-1 text-danger"> Draw !</h1> `

            }


        }
    }
})