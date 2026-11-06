export class CollisionManager {
    constructor(targetEl, player, enemyManager) {
        this.targetEl = targetEl;
        this.player = player;
        this.enemyManager = enemyManager;
    }

    checkCollision() {
        for (let x = this.enemyManager.enemies.length - 1; x >= 0; x--) {
            if (
                Math.abs(this.enemyManager.enemies[x].x - this.player.x) < this.enemyManager.enemies[x].width &&
                Math.abs(this.enemyManager.enemies[x].y - this.player.y) < this.enemyManager.enemies[x].height
            ) {
                this.player.die();
            }
            if (this.enemyManager.enemies[x].y > this.enemyManager.bottomBound) {
                this.enemyManager.enemies[x].kill();
                this.enemyManager.enemies.splice(x, 1);
                return;
            }
            for (let y = this.player.weapon.bullets.length - 1; y >= 0; y--) {
                if (!this.enemyManager.enemies[x]) return;
                if (
                    Math.abs(this.enemyManager.enemies[x].x - this.player.weapon.bullets[y].x) < 50 &&
                    Math.abs(this.enemyManager.enemies[x].y - this.player.weapon.bullets[y].y) < 50
                ) {
                    this.enemyManager.enemies[x].kill();
                    this.enemyManager.enemies.splice(x, 1);
                    this.player.weapon.bullets[y].delete();
                    this.player.weapon.bullets.splice(y, 1);
                    return;
                }
            }
        }
    }
}