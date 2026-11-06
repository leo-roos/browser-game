import { Enemy } from "../entities/enemy.js";

export class EnemyManager {
    constructor(targetEl, player) {
        this.targetEl = targetEl;
        this.player = player;
        this.enemies = [];
        this.spawnTimer = 0.40;
        this.spawnCounter = 0;
        this.bottomBound = window.innerHeight - 50;
    }

    spawnEnemy() {
        let e = new Enemy(this.targetEl);
        this.enemies.push(e);
    }

    update(deltaTime) {
        if (!this.player.alive) return;
        this.spawnCounter += deltaTime;
        if (this.spawnCounter > this.spawnTimer) {
            this.spawnEnemy();
            this.spawnCounter = 0;
        }
        for (let x = this.enemies.length - 1; x >= 0; x--) {
            this.enemies[x].update(deltaTime);
        }
    }

    draw() {
        for (let x = this.enemies.length - 1; x >= 0; x--) {
            this.enemies[x].draw();
        }
    }
}