const smpl = document.getElementById("easy");
const hard = document.getElementById("hard");
const back = document.getElementById("rules");

smpl.addEventListener('click', function() {
    window.location.href = "bot-board.html?mode=simple"; 
})
hard.addEventListener('click', function() {
    window.location.href = "bot-board.html?mode=hard"; 
})
back.addEventListener('click', function() {
    window.history.back();
})
