const params = new URLSearchParams(window.location.search);

let mode = params.get("mode");
let side = params.get("side");
console.log(mode, side);