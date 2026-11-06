import { GameManager } from "./managers/GameManager.js";


document.addEventListener("DOMContentLoaded", function () {
    let gameDiv = document.getElementById("game");
    let game = new GameManager(gameDiv);
});