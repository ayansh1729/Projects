//Challange1: Your age in days

function age_in_days(){
    var birthyear=prompt("Enter the year you were born in?: ");
    var result=(2022-birthyear)*365;
    var h=document.createElement('h1');
    var text=document.createTextNode("You're "+ result+" days old!!");
    h.setAttribute('id','age');
    h.appendChild(text);
    document.getElementById("flex-box-result").appendChild(h);
}

function reset(){
    document.getElementById('age').remove();
}

function gencat(){
    var image=document.createElement('img');
    var div=document.getElementById('flex-cat-gen');
    image.src="static/gif/cat.gif";
    div.appendChild(image);
}

//Challange 3: Rock,paper,scissor:

function rpsGame(yourChoice){
    console.log(yourChoice);
    var humanChoice,botChoice;
    humanChoice=yourChoice.id;
    botChoice=randChoice();
    console.log(botChoice);
    var result=Winner(humanChoice,botChoice) //1 if human wins or 0 if bot wins
    console.log(result);
    message=finalMessage(result); //{message:"you won!",color="green"}
    console.log(message);
    rpsfrontend(yourChoice.id,botChoice,message);
}

function randChoice(){
    var list=["rock","paper","scissor"];
    var m=Math.floor(Math.random()*3)
    return list[m] ;
}

function Winner(humanChoice,botChoice){
    let rpsDatabase={
        'rock':{'scissor':1,'rock':0.5,'paper':0},
        'paper':{'rock':1,'paper':0.5,'scissor':0},
        'scissor':{'paper':1,'scissor':0.5,'rock':0}
    }
    var yourScore=rpsDatabase[humanChoice][botChoice];
    //var botScore=rpsDatabase[botChoice][yourChoice];
    return yourScore;
}

function finalMessage(yourScore){
    if(yourScore===1){
        return {'message':"You won!!",'color':"red"};
    }
    else if(yourScore===0.5){
        return {'message':"Game tied!!",'color':"yellow"};
    }
    else{
        return {'message':"Your lost!!",'color':'green'};
    }
}

function rpsfrontend(humanImageChoice,botImageChoice,finalMessage){
    var imageDatabase={
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissor':document.getElementById('scissor').src
    }
    //Remove all images:
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    var humanDiv=document.createElement('div');
    var botDiv=document.createElement('div');
    var MessageDiv=document.createElement('div');
    //very very Important
    botDiv.innerHTML="<img src='"+ imageDatabase[humanImageChoice]+"'height=50px width=50px style='box-shadow:0px 10px 50px red;'>"
    humanDiv.innerHTML="<img src='"+ imageDatabase[botImageChoice]+"'height=50px width=50px style='box-shadow:0px 10px 50px blue;'>"
    MessageDiv.innerHTML="<h1 style='color:"+finalMessage['color']+"; font-size: 60px; padding: 30px; '>"+finalMessage['message']+"</h1>"
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
    document.getElementById('flex-box-rps-div').appendChild(MessageDiv);
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
}

//Challange 4 : change the color of all buttons:

var all_buttons= document.getElementsByTagName('button');
console.log(all_buttons) //returns an array of all buttons

var copyAllButtons=[];
for(let i=0;i<all_buttons.length;i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonsColorChange(buttonThingy){
    if(buttonThingy.value==='red'){
        buttonsRed();
    }
    else if(buttonThingy.value==='blue'){
        buttonsBlue();
    }
    else if(buttonThingy.value==='green'){
        buttonsGreen();
    }
    else if(buttonThingy.value==='yellow'){
        buttonsYellow();
    }
    else if(buttonThingy.value==='random'){
        buttonsRandom();
    }
    else if(buttonThingy.value==='reset'){
        buttonsReset();
    }
}

function buttonsRed(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
    for(let i=0;i<copyAllButtons.length;i++){
        console.log(copyAllButtons[i].classList);
    }
}

function buttonsGreen(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonsYellow(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-warning');
    }
}

function buttonsBlue(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-primary');
    }
}

function buttonsReset(){
    for(let i=0;i<copyAllButtons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function buttonsRandom(){
    var choices=["btn-primary","btn-danger","btn-success","btn-warning"];
    for(let i=0;i<copyAllButtons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        var random_number=Math.floor(Math.random()*4);
        all_buttons[i].classList.add(choices[random_number]);
    }
}

//Challange 5: Blackjack--->

let blackjackGame={
    'you':{'scorespan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scorespan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','Q','J','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'Q':10,'J':10,'A':[1,11]},
    'wins':0,
    'loses':0,
    'draws':0,
    'isStand':false,
    'turnOver':false,
};
const YOU=blackjackGame['you'];
const DEALER=blackjackGame['dealer'];

const hitSound=new Audio('static/gif/sounds/swish.m4a');
const winSound=new Audio('static/gif/sounds/cash.mp3');
const loseSound=new Audio('static/gif/sounds/aww.mp3');

document.querySelector('#hit').addEventListener('click',blackJackHit);
document.querySelector('#deal').addEventListener('click',blackJackDeal);
document.querySelector('#stand').addEventListener('click',dealerLogic);

function blackJackHit(){
    if(blackjackGame['isStand']===false){
        let cards=RandomCard();
        showCard(cards,YOU);
        updateScore(cards,YOU);
        console.log(YOU['score']);
        showScore(YOU);
    }
}

function showCard(card,activePlayer){
    if(activePlayer['score']<=21){
        let cardImage= document.createElement('img');
        cardImage.src=`static/gif/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackJackDeal(){
    // showResult(computeWinner());
    if(blackjackGame['turnOver']===true){
        blackjackGame['isStand']=false;
        let YourImages=document.querySelector('#your-box').querySelectorAll('img');
        let DealerImages=document.querySelector('#dealer-box').querySelectorAll('img');
        // console.log(YourImages);
        for(let i=0;i<YourImages.length;i++){
            YourImages[i].remove();
        }
        for(let i=0;i<DealerImages.length;i++){
            DealerImages[i].remove();
        }
        YOU['score'] =0;
        DEALER['score']=0;
        document.querySelector('#your-blackjack-result').textContent=0;
        document.querySelector('#dealer-blackjack-result').textContent=0;

        document.querySelector('#your-blackjack-result').style.color='white';
        document.querySelector('#dealer-blackjack-result').style.color='white';

        document.querySelector('#Blackjack-result').textContent="Let's play";
        document.querySelector('#Blackjack-result').style.color='black'; 
        blackjackGame['turnOver']=false;
    }
}

function RandomCard(){
    let randomIndex=Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function updateScore(card,activePlayer){
    //If adding 11 keeps me below 21,add 11 else add 1
    if(card==='A'){
        console.log(activePlayer['score']+blackjackGame['cardsMap'][card]);
        if(activePlayer['score']+blackjackGame['cardsMap'][card][1]<=21){
            activePlayer['score'] += 11 ;
        }
        else{
            activePlayer['score'] += 1;
        }
    }
    else{
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scorespan']).textContent='BUST!!!';
        document.querySelector(activePlayer['scorespan']).style.color="red";
    }
    else{
        document.querySelector(activePlayer['scorespan']).textContent=activePlayer['score'];
    }
}

function dealerLogic(){
    blackjackGame['isStand']=true;
    let card=RandomCard();
    showCard(card,DEALER);
    updateScore(card,DEALER);
    showScore(DEALER);
    if(DEALER['score']>15){
        blackjackGame['turnOver']=true;
        showResult(computeWinner()); 
    }
}

//Compute winner and return who just won:
//Update wins,draws and losses:
function computeWinner(){
    let winner;
    if(YOU['score']<=21){
        //condition 1: Higher score than dealer or when dealer bust;
        if(YOU['score']>DEALER['score'] || (DEALER['score']>21)){
            blackjackGame['wins']++;
            winner=YOU;
        }
        else if(YOU['score']< DEALER['score']){
            blackjackGame['loses']++;
            winner=DEALER;
        }
        else if(YOU['score']=== DEALER['score']){
            blackjackGame['draws']++;
        }
    }
    //Condition when you bust but dealer doesn't:
    else if(YOU['score']>21 && DEALER['score']<=21){
        blackjackGame['loses']++;
        winner=DEALER;
    }
    //Condition when you both bust:
    else if(YOU['score']>21 && DEALER['score']>21){
        blackjackGame['draws']++;
    }
    return winner;
}

function showResult(winner){
    let message,messageColor;
    if(blackjackGame['turnOver']===true){
        if(winner===YOU){
            document.querySelector('#wins').textContent=blackjackGame['wins'];
            message='YOU WON!!!';
            messageColor='green';
            winSound.play();
        }
        else if(winner===DEALER){
            document.querySelector('#losses').textContent=blackjackGame['loses'];
            message='YOU LOST!!!';
            messageColor='red';
            loseSound.play();
        }
        else{
            document.querySelector('#draws').textContent=blackjackGame['draws'];
            message='GAME TIED!!!';
            messageColor='black';
        }
        document.querySelector("#Blackjack-result").textContent=message;
        document.querySelector('#Blackjack-result').style.color=messageColor;
    }
}

