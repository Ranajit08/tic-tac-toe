const params = new URLSearchParams(window.location.search);

let ovel = params.get('ovel');
let cross = params.get('cross');
const ovelSide = '◯';
const crossSide = '✕';
let side = ovelSide;

const audio = new Audio('../assets/sounds/mixkit-achievement-bell-600.wav');

document.getElementById('back').addEventListener('click', () => {
    window.history.back();
})

document.getElementById('restart').addEventListener('click', () => {
    document.querySelectorAll(".i").forEach(cell => {
        cell.value = "";
        document.getElementById('w').close();
        document.querySelector('h2').textContent = `${ovel}'s turn`;
        let side = ovelSide;
    });
})

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
        text.textContent = `${ovel} Win`;
        audio.play();
        side  = undefined;
    } else if (u === -1) {
        // lost
        text.textContent = `${cross} Win`;
        audio.play();
        side  = undefined;
    } else if (u === 0) {
        // Tie
        text.textContent = "It's a Tie";
        side  = undefined;
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
            state[pattern[0]] == ovelSide && 
            state[pattern[1]] == ovelSide && 
            state[pattern[2]] == ovelSide
        ) {
            return 1;
        }
        if (
            state[pattern[0]] == crossSide && 
            state[pattern[1]] == crossSide && 
            state[pattern[2]] == crossSide
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

// movement 
document.querySelector('h2').textContent = `${ovel}'s turn`;
document.querySelectorAll(".i").forEach(cell => {
    cell.addEventListener("click", () => {
        if (cell.value == ""){
            cell.value = side;
            rules();
            side = (side === ovelSide) ? crossSide : ovelSide;
        }
        if (side === ovelSide) {
            document.querySelector('h2').textContent = `${ovel}'s turn`;
        } else {
            document.querySelector('h2').textContent = `${cross}'s turn`;
        }
    });
});