let rounds =0;
let scores = [0,0];
let ar = ["","","","","","","","",""];
let player = "X";
let IsWon=false;
var canplay =true;
var connected = 0;

const game = {
    now: ar,
    scores: scores,
    player: player,
    rounds: rounds,
    connected : connected,
};

let gameId =""

document.getElementById("HostModalbtn").click()
const hostForm =document.querySelector("HostModal");

//create game OK
db.collection('games').add(game).then( e => {
    console.log(e.id)
    gameId=e.id

    document.getElementById("hostGameID").value = gameId;
    hostForm.addEventListener("submit", e =>{
        e.preventDefault();
        gameId = document.getElementById("hostGameID").value;
    })
    console.log("added ok")

}).catch(err=>{
    console.log(err);
});
//____________________________________________________-MODAL_________________________

var count =0;
// get data
db.collection("games").onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
        if(change.doc.id==gameId){

                if (change.type === "added") {

                    rounds = change.doc.data().rounds;
                    scores = [change.doc.data().scores[0] , change.doc.data().scores[1]];
                    ar = change.doc.data().now;
                    player = change.doc.data().player;
                    console.log(rounds,scores,ar,player,"change.type=>",change.type)
                }

                if (change.type === "modified") {

                    rounds = change.doc.data().rounds;
                    scores = [change.doc.data().scores[0] , change.doc.data().scores[1]];
                    ar = change.doc.data().now;
                    player = change.doc.data().player;
                    connected = change.doc.data().connected;
                    console.log(rounds,scores,ar,player,"change.type=>",change.type)
                    if(connected==1 && count ==0){

                        console.log("player has connected")
                        document.getElementById("HostModalbtn").click()
                        document.getElementById("getIdForm").innerHTML=`
                        <h3 class="text-center">Player Has Connected</h3>
                        <small id="idHelp" class="form-text text-muted pl-1 text-center">Game ID: ${gameId}</small>
                        `
                        count++
                    }
                    updateUI(ar);
                    checkscores2(ar);
                    disableSelected(ar);
                    if(rounds==0){
                        resetGame()
                    }
                }
            }

    });
});
//display the inputs from server (BASED ON ARRAY) + show player +score
function updateUI(ar){          
    if (rounds !=9){
        document.getElementById("a").innerHTML=ar[0]
        document.getElementById("b").innerHTML=ar[1]
        document.getElementById("c").innerHTML=ar[2]
        document.getElementById("d").innerHTML=ar[3]
        document.getElementById("e").innerHTML=ar[4]
        document.getElementById("f").innerHTML=ar[5]
        document.getElementById("g").innerHTML=ar[6]
        document.getElementById("h").innerHTML=ar[7]
        document.getElementById("i").innerHTML=ar[8]
        document.getElementById("turn").innerHTML= `It's "${player}" Turn`    
        document.getElementById("scores").innerHTML = `        <h1><span  style=" float: left; margin-left: 25%;">X: ${scores[0]} </span> <span style=" float: right; margin-right: 25%;">O: ${scores[1]}</span></h1>
        ` 
    }
    if(rounds==9 && IsWon==false){
        document.querySelector("#turn").innerHTML=`  <h1  class="display-1 text-danger"> Draw !</h1> `
        // nextplayer()
      }
}
function disableSelected(ar){
    if(ar[0]!=""){
        document.getElementById("a").disabled = 'true'
    }
    if(ar[1]!=""){
        document.getElementById("b").disabled = 'true'
    }
    if(ar[2]!=""){
        document.getElementById("c").disabled = 'true'
    }
    if(ar[3]!=""){
        document.getElementById("d").disabled = 'true'
    }
    if(ar[4]!=""){
        document.getElementById("e").disabled = 'true'
    }
    if(ar[5]!=""){
        document.getElementById("f").disabled = 'true'
    }
    if(ar[6]!=""){
        document.getElementById("g").disabled = 'true'
    }
    if(ar[7]!=""){
        document.getElementById("h").disabled = 'true'
    }
    if(ar[8]!=""){
        document.getElementById("i").disabled = 'true'
    }

   ;
}

//check if someone won
function checkscores2(ar){
    console.log("Checking scores")
    if( (ar[0]=="X"&& ar[1]=="X"&& ar[2]=="X") || (ar[0]=="O"&& ar[1]=="O"&& ar[2]=="O") ){
        document.getElementById("a").style.backgroundColor = "#eeeeee";
        document.getElementById("b").style.backgroundColor = "#eeeeee";
        document.getElementById("c").style.backgroundColor = "#eeeeee";
    IsWon=true 
    version=1
    }
    if( (ar[3]=="X"&& ar[4]=="X"&& ar[5]=="X") || (ar[3]=="O"&& ar[4]=="O"&& ar[5]=="O") ){
        document.getElementById("d").style.backgroundColor = "#eeeeee";
        document.getElementById("e").style.backgroundColor = "#eeeeee";
        document.getElementById("f").style.backgroundColor = "#eeeeee";
    IsWon=true 
    version=2
    }
    if( (ar[6]=="X"&& ar[7]=="X"&& ar[8]=="X") || (ar[6]=="O"&& ar[7]=="O"&& ar[8]=="O") ){
        document.getElementById("g").style.backgroundColor = "#eeeeee";
        document.getElementById("h").style.backgroundColor = "#eeeeee";
        document.getElementById("i").style.backgroundColor = "#eeeeee";
    IsWon=true 
    version=3
    }
    if( (ar[0]=="X"&& ar[3]=="X"&& ar[6]=="X") || (ar[0]=="O"&& ar[3]=="O"&& ar[6]=="O") ){
        document.getElementById("a").style.backgroundColor = "#eeeeee";
        document.getElementById("d").style.backgroundColor = "#eeeeee";
        document.getElementById("g").style.backgroundColor = "#eeeeee";
    IsWon=true 
    version=4
    }
    if( (ar[1]=="X"&& ar[4]=="X"&& ar[7]=="X") || (ar[1]=="O"&& ar[4]=="O"&& ar[7]=="O") ){
        document.getElementById("b").style.backgroundColor = "#eeeeee";
        document.getElementById("e").style.backgroundColor = "#eeeeee";
        document.getElementById("h").style.backgroundColor = "#eeeeee";
    IsWon=true 
    version=5
    }
    if( (ar[2]=="X"&& ar[5]=="X"&& ar[8]=="X") || (ar[2]=="O"&& ar[5]=="O"&& ar[8]=="O") ){
        document.getElementById("c").style.backgroundColor = "#eeeeee";
        document.getElementById("f").style.backgroundColor = "#eeeeee";
        document.getElementById("i").style.backgroundColor = "#eeeeee";
    IsWon=true 
    version=6
    }
    
    if( (ar[0]=="X"&& ar[4]=="X"&& ar[8]=="X") || (ar[0]=="O"&& ar[4]=="O"&& ar[8]=="O") ){
        document.getElementById("a").style.backgroundColor = "#eeeeee";
        document.getElementById("e").style.backgroundColor = "#eeeeee";
        document.getElementById("i").style.backgroundColor = "#eeeeee";
    IsWon=true 
    version=7
    }
    if( (ar[2]=="X"&& ar[6]=="X"&& ar[4]=="X") || (ar[2]=="O"&& ar[6]=="O"&& ar[4]=="O") ){
        document.getElementById("c").style.backgroundColor = "#eeeeee";
        document.getElementById("e").style.backgroundColor = "#eeeeee";
        document.getElementById("g").style.backgroundColor = "#eeeeee";
    IsWon=true 
    version=8
    }
  
    if(IsWon==true){
        document.querySelector("#turn").innerHTML=`  <h1  class="display-1 text-danger"> "${player}" Won !</h1> `
        console.log(version);
        disableAll(); //check
        // nextplayer()
    }     
    
        } 

function resetGame(){
    ar = ["","","","","","","","",""]
    rounds = 0;
    // nextplayer();
    IsWon=false;
    version=0;
    document.querySelector("#turn").innerHTML = ` <h1 class="display-4 text-white mb-5" id="turn"> It's  "${player}" Turn</h1> `

    document.querySelector("#all").innerHTML= `

                  <div class="text-center mt-2 " id="all">
          <h1 class="display-4 text-white mb-2" id="turn"> It's  "${player}" Turn</h1>

                    <button class="input xo" id="a"> </button>
                    <button class="input xo" id="b"> </button>
                    <button class="input xo" id="c"> </button>
                
            
            <br>
            
                    <button class="input xo" id="d"> </button>
                    <button class="input xo" id="e"> </button>
                    <button class="input xo" id="f"> </button>
            <br>
                
                
                    <button class="input xo" id="g"> </button>
                    <button class="input xo" id="h"> </button>
                    <button class="input xo" id="i"> </button>
  




          </div>
  ` 
   
  db.collection('games').doc(gameId).update({
    now: ar,
    scores: scores,
    player: player,
    rounds: rounds,


   }).then( () => {

        console.log("added ok")
    }).catch(err=>{
        console.log(err);
    });

}

//___________________________________ GET STUFF_________________________________________



// offline + update date
var a= document.querySelector("#all")
a.addEventListener("click",e=>{
  e.preventDefault();

if(player =="X" ){
    var btnID = e.target.id ;
    if( e.target.parentElement.id== "all" &&  e.target.tagName== "BUTTON" ){
        e.target.innerHTML=player;
        rounds++;

        
        getInputs(ar,btnID); //check

        // disable btns
        e.target.disabled = 'true';

        checkscores2(ar) //check

        // if someone won
        if(IsWon==true){
            document.querySelector("#turn").innerHTML=`  <h1  class="display-1 text-danger"> "${player}" Won !</h1> `
            disableAll(); //check
            scoreUpdate(player); //check
        }

        else{
         
            nextplayer(); //check
            document.querySelector("#turn").innerHTML = ` <h1 class="display-4 text-white mb-2" id="turn"> It's  "${player}" Turn</h1> `
        }

      }
    //   draw
      if(rounds==9 && IsWon==false){
        document.querySelector("#turn").innerHTML=`  <h1  class="display-1 text-danger"> Draw !</h1> `
      }

// update


        console.log(rounds,scores,ar,player,"globally")
        db.collection('games').doc(gameId).update({
        
            now: ar,
            scores: scores,
            player: player,
            rounds: rounds,
            connected: connected,

        }).then( () => {

                console.log("added ok")
            }).catch(err=>{
                console.log(err);
            });
    }
})

function getInputs(ar,btnID){
    if(btnID=="a" && btnID.innerHTML==null){
       document.getElementById(`${btnID}`).innerHTML=player;
       ar[0]=player
   }
   if(btnID=="b" && btnID.innerHTML==null){
       ar[1]=player
   }
   if(btnID=="c" && btnID.innerHTML==null){
       ar[2]=player
   }
   if(btnID=="d" && btnID.innerHTML==null){
       ar[3]=player
   }
   if(btnID=="e" && btnID.innerHTML==null){
       ar[4]=player
   }
   if(btnID=="f" && btnID.innerHTML==null){
       ar[5]=player
   }
   if(btnID=="g" && btnID.innerHTML==null){
       ar[6]=player
   }
   if(btnID=="h" && btnID.innerHTML==null){
       ar[7]=player
   }
   if(btnID=="i" && btnID.innerHTML==null){
       ar[8]=player
   }
}
function nextplayer(){
            
    if (player =="X"){
      player ="O"
    }
    else{
      player = "X"
    }
}
function newGame(){
        scores = [0,0];
        resetGame();
        document.getElementById("scores").innerHTML=`
        <h1><span  style=" float: left; margin-left: 25%;">X: 0 </span> <span style=" float: right; margin-right: 25%;">O: 0</span></h1>
    
        `
}
function disableAll(){
    
    var disabledBtns = document.querySelectorAll(".xo");
    disabledBtns.forEach(element => {
        element.disabled ="true"
    });
}

function scoreUpdate(player){
    if(player=="X"){
        scores[0]++
    }
    else{
        scores[1]++
    }


}

//__________________RESET BTNS___________________________________________________________
document.getElementById("reset").addEventListener("click",e =>{
    resetGame()
})
document.getElementById("newGame").addEventListener("click",e =>{
    newGame()
})