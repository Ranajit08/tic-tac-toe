const ovel = document.getElementById('ovel');
const cross = document.getElementById('cross');
const params = new URLSearchParams(window.location.search);
let mode = params.get('mode');
let userSide;

cross.addEventListener('click', () => {
    cross.style.backgroundColor = 'black';
    cross.style.color = 'white';
    ovel.style.backgroundColor = 'white';
    ovel.style.color = 'black';
    userSide = '✕';
});
ovel.addEventListener('click', () => {
    cross.style.backgroundColor = 'white';
    cross.style.color = 'black';
    ovel.style.backgroundColor = 'black';
    ovel.style.color = 'white';
    userSide = '◯';
});

document.getElementById('play').addEventListener('click', () => {
    if (userSide == undefined) {
        return;
    }
    window.location.href = `bot-board.html?mode=${mode}&side=${userSide}`; 
})

document.getElementById('rules').addEventListener('click', () => {
    window.history.back();
})