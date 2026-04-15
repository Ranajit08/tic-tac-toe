const simple = document.getElementById("simple");
const medium = document.getElementById("medium");
const hard = document.getElementById("hard");
const play = document.getElementById("play");
const cross = document.getElementById("cross");
const ovel = document.getElementById("ovel");
let side;
let mode;


simple.addEventListener('click', function (){
    simple.style.backgroundColor = 'black';
    medium.style.backgroundColor = 'white';
    hard.style.backgroundColor = 'white';
    medium.style.color = 'black';
    hard.style.color = 'black';
    simple.style.color = 'white';
    mode = 'simple';
});

medium.addEventListener('click', function (){
    medium.style.backgroundColor = 'black';
    simple.style.backgroundColor = 'white';
    hard.style.backgroundColor = 'white';
    simple.style.color = 'black';
    hard.style.color = 'black';
    medium.style.color = 'white';
    mode = 'medium';
});

hard.addEventListener('click', function (){
    hard.style.backgroundColor = 'black';
    medium.style.backgroundColor = 'white';
    simple.style.backgroundColor = 'white';
    medium.style.color = 'black';
    simple.style.color = 'black';
    hard.style.color = 'white';
    mode = 'hard';
});

cross.addEventListener('click', function (){
    cross.style.backgroundColor = 'black';
    cross.style.color = 'white';
    ovel.style.backgroundColor = 'white';
    ovel.style.color = 'black';
    side = 'cross';
});

ovel.addEventListener('click', function (){
    ovel.style.backgroundColor = 'black';
    ovel.style.color = 'white';
    cross.style.backgroundColor = 'white';
    cross.style.color = 'black';
    side = 'ovel';
});

play.addEventListener('click', function (){
    if (mode == undefined){
        alert("Choose mode to play game.");
    } else if (side == undefined) {
        alert("Choose side to play game.")
    } else {
        window.location.href = `board.html?mode=${mode}&side=${side}`; 
    };
});