const ovel = document.getElementById('ovel');
const cross = document.getElementById('cross');
const params = new URLSearchParams(window.location.search);
let mode = params.get('mode');
let userSide;

cross.addEventListener('click', () => {
    cross.style.backgroundColor = 'rgb(25, 0, 255)';
    ovel.style.backgroundColor = 'rgb(10, 0, 99)';
    userSide = '✕';
});
ovel.addEventListener('click', () => {
    cross.style.backgroundColor = 'rgb(10, 0, 99)';
    ovel.style.backgroundColor = 'rgb(25, 0, 255)';
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