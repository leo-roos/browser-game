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
        
        this.bottomBound = window.innerHeight;
        this.rightBound = window.innerWidth;

        this.mouseX = 0;
        this.mouseY = 0;
        this.#init();

        this.player = new Player(targetEl, this.input, this.bottomBound, this.rightBound);
        this.enemyManager = new EnemyManager(targetEl, this.player, this.bottomBound, this.rightBound);
        this.collisionManager = new CollisionManager(targetEl, this.player, this.enemyManager, this.bottomBound, this.rightBound)
        this.updateBound(this.bottomBound, this.rightBound);
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

    updateBound(bottomBound, rightBound) {
        this.bottomBound = bottomBound;
        this.rightBound = rightBound;

        this.enemyManager.updateBound(this.bottomBound, this.rightBound)
        this.collisionManager.updateBound(this.bottomBound, this.rightBound)
        this.player.updateBound(this.bottomBound, this.rightBound)
    }

    updateMouse(x, y) {
        this.mouseX = x;
        this.mouseY = y;
        this.player.updateMouse(this.mouseX, this.mouseY)
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

