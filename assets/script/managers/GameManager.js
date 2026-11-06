import { Player } from "../entities/player.js";
import { InputManager } from "../input.js";
import { CollisionManager } from "./CollisionManager.js";
import { EnemyManager } from "./EnemyManager.js";
export class GameManager {
    constructor(targetEl) {
        this.input = new InputManager();
        this.targetEl = targetEl;
        this.deltaTime = 0;
        this.lastTime = 0;
        this.isRunning = true;
        this.frameRequest = null;
        this.#init();

        this.player = new Player(targetEl, this.input);
        this.enemyManager = new EnemyManager(targetEl, this.player);
        this.collisionManager = new CollisionManager(targetEl, this.player, this.enemyManager)
        this.loop;
    }

    #init() {
        this.start();
    }

    start() {
        this.loop = requestAnimationFrame((t) => this.#gameLoop(t));
    }

    #gameLoop(currentTime) {
        if (!this.isRunning) return;
        this.deltaTime = (currentTime - this.lastTime) / 1000;
        this.update(this.deltaTime);
        this.draw();

        this.lastTime = currentTime;
        this.loop = requestAnimationFrame((t) => this.#gameLoop(t));
    }


    update(deltaTime) {
        this.player.update(deltaTime);
        this.enemyManager.update(deltaTime);
        this.collisionManager.checkCollision();
    }

    draw() {
        this.player.draw();
        this.enemyManager.draw();
    }


}

