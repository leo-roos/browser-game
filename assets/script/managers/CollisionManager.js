export class CollisionManager {
    constructor(targetEl, player, enemyManager, bottomBound, rightBound) {
        this.targetEl = targetEl;
        this.player = player;
        this.enemyManager = enemyManager;

        this.bottomBound = bottomBound;
        this.leftBound = 0;
        this.rightBound = rightBound;
    }

    updateBound(bottomBound, rightBound) {
        this.bottomBound = bottomBound;
        this.rightBound = rightBound;
    }

    isCollsion(item, target) {
        const xDistance = (item.x + item.width) - target.x;
        const yDistance = item.y - target.y;
        if (
            xDistance > 0 && xDistance <= (target.width + item.width) &&
            (yDistance > 0 && yDistance <= target.height || yDistance < 0 && yDistance >= -item.height)
        ) {
            return true;
        }
        return false;
    }

    checkCollision() {
        for (let x = this.enemyManager.enemies.length - 1; x >= 0; x--) {
            if (this.isCollsion(this.player, this.enemyManager.enemies[x])) {
                this.player.die();
            }
            if ((this.enemyManager.enemies[x].y + this.enemyManager.enemies[x].width) > this.bottomBound) {
                this.enemyManager.enemies[x].kill();
                this.enemyManager.enemies.splice(x, 1);
                continue;
            }
            if ((this.enemyManager.enemies[x].x + this.enemyManager.enemies[x].width) > this.rightBound) {
                this.enemyManager.enemies[x].x = this.rightBound - this.enemyManager.enemies[x].width;
            } else if (this.enemyManager.enemies[x].x < this.leftBound) {
                this.enemyManager.enemies[x].x = this.leftBound;
            }

            for (let y = this.player.weapon.bullets.length - 1; y >= 0; y--) {
                if (!this.enemyManager.enemies[x]) return;
                if (this.isCollsion(this.player.weapon.bullets[y], this.enemyManager.enemies[x])) {
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