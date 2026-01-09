/* global Game */ "use strict";
const game = new Game();
function renderBoard() {}
function renderScore() {
    const scoreElement = document.querySelector(".game-score");
    if (scoreElement) scoreElement.textContent = game.getScore();
}
function renderStatus() {
    const loseMessage = document.querySelector(".message.message-lose");
    const winMessage = document.querySelector(".message.message-win");
    if (game.getStatus() === "lose") loseMessage.classList.remove("hidden");
    else loseMessage.classList.add("hidden");
    if (game.getStatus() === "win") winMessage.classList.remove("hidden");
    else winMessage.classList.add("hidden");
}
document.addEventListener("keydown", (e)=>{
    if (game.getStatus() !== "playing") return;
    switch(e.key){
        case "ArrowLeft":
            game.moveLeft();
            break;
        case "ArrowRight":
            game.moveRight();
            break;
        case "ArrowUp":
            game.moveUp();
            break;
        case "ArrowDown":
            game.moveDown();
            break;
        default:
            return;
    }
    renderBoard();
    renderScore();
    renderStatus();
});
const startButton = document.querySelector(".button.start");
if (startButton) startButton.addEventListener("click", ()=>{
    game.restart();
    game.start();
    renderBoard();
    renderScore();
    renderStatus();
});
const restartButton = document.querySelector(".button.restart");
if (restartButton) restartButton.addEventListener("click", ()=>{
    game.restart();
    renderBoard();
    renderScore();
    renderStatus();
});

//# sourceMappingURL=index.f75de5e1.js.map
