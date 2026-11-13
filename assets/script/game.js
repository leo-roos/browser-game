import { GameManager } from "./managers/GameManager.js";


let game;
document.addEventListener("DOMContentLoaded", function () {
    let gameDiv = document.getElementById("game");
    game = new GameManager(gameDiv);
});

window.addEventListener("resize", function() {
    game.updateBound(window.innerHeight, window.innerWidth)
})