const params = new URLSearchParams(window.location.search);

function restart (){
    window.history.back();
}

let mode = params.get("mode");
let side = params.get("side");
let botSide;
let userSide;

if (side == 'cross') {
    botSide = '◯';
    userSide = '✕';
} else {
    botSide = '✕';
    userSide = '◯';
};

// this function get board data and put that in array.
function getBoard (){
    return Array.from(document.querySelectorAll(".i"), c => c.value);
};

function rules() {
    const modal = document.querySelector('dialog');
    const text = document.querySelector('#h');
    let b = getBoard();
    let u = utility(b);

    if (u === null) return;

    modal.showModal();

    if (u === 1) {
        // win
        text.textContent = "You Win";
    } else if (u === -1) {
        // lost
        text.textContent = "You lose";
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

// movement 
document.querySelectorAll(".i").forEach(cell => {
    cell.addEventListener("click", function () {
        if (cell.value === ""){
            cell.value = userSide;
            let board = getBoard();
            if (isTerminal(board)) {
                rules();
                return;
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



