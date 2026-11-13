export class CollisionManager {
    constructor(targetEl, player, enemyManager) {
        this.targetEl = targetEl;
        this.player = player;
        this.enemyManager = enemyManager;
    }

    checkCollision() {
        for (let x = this.enemyManager.enemies.length - 1; x >= 0; x--) {
            const xDistance = (this.player.x + this.player.width) - this.enemyManager.enemies[x].x;
            const yDistance = this.player.y - this.enemyManager.enemies[x].y;
            if (
                xDistance > 0 && xDistance <= (this.enemyManager.enemies[x].width + this.player.width) &&
                (yDistance > 0 && yDistance <= this.enemyManager.enemies[x].height || yDistance < 0 && yDistance >= -this.player.height)
            ) {
                this.player.die();
            }
            if (this.enemyManager.enemies[x].y > this.enemyManager.bottomBound) {
                this.enemyManager.enemies[x].kill();
                this.enemyManager.enemies.splice(x, 1);
                continue;
            }
            for (let y = this.player.weapon.bullets.length - 1; y >= 0; y--) {
                if (!this.enemyManager.enemies[x]) return;
                if (
                    Math.abs(this.enemyManager.enemies[x].x - this.player.weapon.bullets[y].x) < this.enemyManager.enemies[x].width &&
                    Math.abs(this.enemyManager.enemies[x].y - this.player.weapon.bullets[y].y) < this.enemyManager.enemies[x].height
                ) {
                    this.enemyManager.enemies[x].kill();
                    this.enemyManager.enemies.splice(x, 1);
                    this.player.weapon.bullets[y].delete();
                    this.player.weapon.bullets.splice(y, 1);
                    continue;
                }
            }
        }
    }
}