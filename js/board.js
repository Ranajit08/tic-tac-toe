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
function GetBoard (){
    return Array.from(document.querySelectorAll(".i"), c => c.value);
};

// Tie checker
function TieChecker () {
    let Board = GetBoard();

    if (!Board.includes("")) {
        document.querySelector("dialog").showModal();
        document.getElementById("h").textContent = "You Tie!";
    }
}

// Rules for this game
function Rules (){
    let board = GetBoard();

    // 0 1 2
    if (board[0] === botSide) {
        if (board[1] === botSide) {
            if (board[2] === botSide) {
                document.querySelector("dialog").showModal();
                document.getElementById("h").textContent = "You loose!";
            }
        }
    } 
    
    if (board[0] === userSide) {
        if (board[1] === userSide) {
            if (board[2] === userSide) {
                document.querySelector("dialog").showModal();
                document.getElementById("h").textContent = "You Won!";
            }
        }
    }

    // 0 3 6
    if (board[0] === botSide) {
        if (board[3] === botSide) {
            if (board[6] === botSide) {
                document.querySelector("dialog").showModal();
                document.getElementById("h").textContent = "You loose!";
            }
        }
    } 
    
    if (board[0] === userSide) {
        if (board[3] === userSide) {
            if (board[6] === userSide) {
                document.querySelector("dialog").showModal();
                document.getElementById("h").textContent = "You Won!";
            }
        }
    }

    // 0 4 8 
    if (board[0] === botSide) {
        if (board[4] === botSide) {
            if (board[8] === botSide) {
                document.querySelector("dialog").showModal();
                document.getElementById("h").textContent = "You loose!";
            }
        }
    } 
    
    if (board[0] === userSide) {
        if (board[4] === userSide) {
            if (board[8] === userSide) {
                document.querySelector("dialog").showModal();
                document.getElementById("h").textContent = "You Won!";
            }
        }
    }

    // 2 5 8 
    if (board[2] === botSide) {
        if (board[5] === botSide) {
            if (board[8] === botSide) {
                document.querySelector("dialog").showModal();
                document.getElementById("h").textContent = "You loose!";
            }
        }
    } 
    
    if (board[2] === userSide) {
        if (board[5] === userSide) {
            if (board[8] === userSide) {
                document.querySelector("dialog").showModal();
                document.getElementById("h").textContent = "You Won!";
            }
        }
    }

    // 2 4 6 
    if (board[2] === botSide) {
        if (board[4] === botSide) {
            if (board[6] === botSide) {
                document.querySelector("dialog").showModal();
                document.getElementById("h").textContent = "You loose!";
            }
        }
    } 
    
    if (board[2] === userSide) {
        if (board[4] === userSide) {
            if (board[6] === userSide) {
                document.querySelector("dialog").showModal();
                document.getElementById("h").textContent = "You Won!";
            }
        }
    }

    // 6 7 8 
    if (board[6] === botSide) {
        if (board[7] === botSide) {
            if (board[8] === botSide) {
                document.querySelector("dialog").showModal();
                document.getElementById("h").textContent = "You loose!";
            }
        }
    } 
    
    if (board[6] === userSide) {
        if (board[7] === userSide) {
            if (board[8] === userSide) {
                document.querySelector("dialog").showModal();
                document.getElementById("h").textContent = "You Won!";
            }
        }
    }

    // 1 4 7 
    if (board[1] === botSide) {
        if (board[4] === botSide) {
            if (board[7] === botSide) {
                document.querySelector("dialog").showModal();
                document.getElementById("h").textContent = "You loose!";
            }
        }
    } 
    
    if (board[1] === userSide) {
        if (board[4] === userSide) {
            if (board[7] === userSide) {
                document.querySelector("dialog").showModal();
                document.getElementById("h").textContent = "You Won!";
            }
        }
    }

    // 3 4 5 
    if (board[3] === botSide) {
        if (board[4] === botSide) {
            if (board[5] === botSide) {
                document.querySelector("dialog").showModal();
                document.getElementById("h").textContent = "You loose!";
            }
        }
    } 
    
    if (board[3] === userSide) {
        if (board[4] === userSide) {
            if (board[5] === userSide) {
                document.querySelector("dialog").showModal();
                document.getElementById("h").textContent = "You Won!";
            }
        }
    }
    TieChecker();
};

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
    return cells;
}

// movement 
document.querySelectorAll(".i").forEach(cell => {
    cell.addEventListener("click", function () {
        if (cell.value === ""){
            cell.value = userSide;
            let board = GetBoard();
            if (mode == "simple") {
                simple(board, botSide);
                Rules();
            } 
        }
    });
});



