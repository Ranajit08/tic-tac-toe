const params = new URLSearchParams(window.location.search);
const bWin = new Audio("../assets/sounds/mixkit-instant-win-2021.wav");
const bLse = new Audio("../assets/sounds/mixkit-losing-bleeps-2026.wav");
let mode = params.get("mode");

const back = document.getElementById("back");
back.addEventListener('click', function() {
    window.history.back();
})

const ovel = document.getElementById('ovel');
const cross = document.getElementById('cross');
let userSide;
let botSide;

cross.addEventListener('click', () => {
    cross.style.backgroundColor = 'black';
    cross.style.color = 'white';
    ovel.style.backgroundColor = 'white';
    ovel.style.color = 'black';
    userSide = '✕';
    botSide = '◯';
});
ovel.addEventListener('click', () => {
    cross.style.backgroundColor = 'white';
    cross.style.color = 'black';
    ovel.style.backgroundColor = 'black';
    ovel.style.color = 'white';
    userSide = '◯';
    botSide = '✕';
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('side').showModal();
    const play = document.getElementById('play');
    play.addEventListener('click', () => {
        if (userSide == undefined) {
            alert('dgkdj');
            return;
        };
        document.getElementById('side').close();
    });
    const r = document.getElementById('r');
    r.addEventListener('click', () => {
        window.history.back();
    });
});

// this function get board data and put that in array.
function getBoard (){
    return Array.from(document.querySelectorAll(".i"), c => c.value);
};

function rules() {
    const modal = document.querySelector('#w');
    const text = document.querySelector('#h');
    let b = getBoard();
    let u = utility(b);

    if (u === null) return;

    modal.showModal();

    if (u === 1) {
        // win
        text.textContent = "You Win";
        bWin.play();
    } else if (u === -1) {
        // lost
        text.textContent = "You lose";
        bLse.play();
    } else if (u === 0) {
        // Tie
        text.textContent = "It's a Tie";
    }
};

// 1 -- win, 0 -- Tie, -1 -- Lost
function utility(state) {
    const winPattern = [
                        [0,1,2], [0,4,8], 
                        [0,3,6], [8,7,6], 
                        [2,5,8], [2,4,6], 
                        [1,4,7], [3,4,5]
                    ];
    for (let pattern of winPattern) {
        if (
            state[pattern[0]] == userSide && 
            state[pattern[1]] == userSide && 
            state[pattern[2]] == userSide
        ) {
            return 1;
        }
        if (
            state[pattern[0]] == botSide && 
            state[pattern[1]] == botSide && 
            state[pattern[2]] == botSide
        ) {
            return -1;
        }
    }
    if (!state.includes("")) {
        return 0;
    }
    return null;
};

function isTerminal(state) {
    return utility(state) !== null;
};

function depth() {
    let b = getBoard();
    let depth = 0;
    b.forEach(val => {
        if (val === "") {
            depth++;
        }
    });
    return depth;
};

function actions(state) {
    let b = [];
    state.forEach((val, index) => {
        if (val === "") {
            b.push(index);
        }
    });
    return b;
};

function result(state, action, player) {
    let newstate = [...state];
    newstate[action] = player;
    return newstate;
};

// minimax
function miniMax(state, depth, maximizing_player) {
    if (isTerminal(state)) {
        return -utility(state);
    };

    if (depth === 0) {
        return 0;
    };

    if (maximizing_player) {
        let max_eval = -Infinity;
        for (let action of actions(state)) {
            let e = miniMax(result(state, action, botSide), depth - 1, false);
            max_eval = Math.max(max_eval, e);
        };
        return max_eval;
    } else {
        let min_eval = Infinity;
        for (let action of actions(state)) {
            let e = miniMax(result(state, action, userSide), depth - 1, true);
            min_eval = Math.min(min_eval, e);
        };
        return min_eval;
    };
};

function getBestMove(state) {
    let bestScore = -Infinity;
    let bestMove = null;
    let d = depth();

    for (let action of actions(state)) {
        let newState = result(state, action, botSide);

        let score = miniMax(newState, d - 1, false);

        if (score > bestScore) {
            bestScore = score;
            bestMove = action;
        }
    }
    return bestMove;
}

// Simple mode
function simple(board, side) {
    let cells = document.querySelectorAll(".i");
    let emptyIndexes = [];

    board.forEach((val, index) => {
        if (val === "") {
            emptyIndexes.push(index);
        }
    });

    if (emptyIndexes.length === 0) return;

    let randIndex = Math.floor(Math.random() * emptyIndexes.length);
    let move = emptyIndexes[randIndex];

    cells[move].value = side;
    return;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const overlay = document.getElementById('overlay');

function freeze() {
    overlay.style.display = "block";
}

function unfreeze() {
    overlay.style.display = "none";
}

document.getElementById('restart').addEventListener('click', () => {
    document.querySelectorAll(".i").forEach(cell => {
        cell.value = "";
        document.getElementById('w').close();
    });
})

// movement 
async function movement() {
    document.querySelectorAll(".i").forEach(cell => {
        cell.addEventListener("click", async () => {
            if (cell.value == ""){
                cell.value = userSide;
                freeze();
                await sleep(500);
                unfreeze();
                let board = getBoard();
                if (isTerminal(board)) {
                    rules();
                    return;
                    console.log('hello');
                }
                if (mode == "simple") {
                    simple(board, botSide);
                    rules();
                } 
                if (mode == "hard") {
                    let move = getBestMove(board, botSide);
                    let cell = document.querySelectorAll(".i");
                    cell[move].value = botSide;
                    rules();
                }
            }
        });
    });
};
movement();