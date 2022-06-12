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