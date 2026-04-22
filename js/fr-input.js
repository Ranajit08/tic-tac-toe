document.getElementById('rules').addEventListener('click', () => {
    window.history.back();
})
let ovel;
let cross;

document.getElementById('ovel').addEventListener('input', () => {
    ovel = document.getElementById('ovel').value;
})
document.getElementById('cross').addEventListener('input', () => {
    cross = document.getElementById('cross').value;
})

document.getElementById('play').addEventListener('click', () => {
    if (ovel == undefined) {
        return;
    }
    if (ovel == undefined) {
        return;
    }
    window.location.href = `fr-board.html?ovel=${ovel}&cross=${cross}`;
})