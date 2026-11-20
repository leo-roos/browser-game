import { Bullet } from "./bullet.js";

export class Weapon{
    constructor(targetEl, player) {
        this.targetEl = targetEl;
        this.player = player;
        this.bullets = [];

        this.width = 25;
        this.height = 25;
        this.x = this.player.x;
        this.y = this.player.y;

        this.shootCooldown = 0.3;
        this.shootTimer = 0;
        this.topBound = 0;

        this.recoil = 400;

        this.el = this.#init();
    }

    updateBound(bottomBound, rightBound) {
        this.bottomBound = bottomBound - this.height;
        this.rightBound = rightBound - this.width;
    }

    #init() {
        let el = document.createElement("div");
        el.setAttribute("id", "weapon");
        el.style.left = this.player.x + "px";
        el.style.top = this.player.y + "px";
        el.style.width = this.width + "px";
        el.style.height = this.height + "px";
        this.targetEl.append(el);
        return el;
    }

    shoot(xAngle, yAngle) {
        if (this.shootTimer > this.shootCooldown) {
            let b = new Bullet(this.targetEl, this.player, this, xAngle, yAngle);
            this.bullets.push(b);
            this.shootTimer = 0;
        }
    }

    update(deltaTime) {
        this.shootTimer += deltaTime;
        this.x = this.player.x;
        // this.y = this.player.y - 75;
        this.y = this.player.y - (this.player.height/2);
        this.bullets.forEach(bullet => {
            bullet.update(deltaTime);
        });
    }

    draw() {
        this.el.style.left = this.x + "px";
        this.el.style.top = this.y + "px";
        for (let x = this.bullets.length - 1; x >= 0; x--) {
            this.bullets[x].draw();
            if (this.bullets[x].x > (this.rightBound - this.bullets[x].width) || this.bullets[x].y < this.topBound) {
                this.bullets[x].delete();
                this.bullets.splice(x, 1);
                return;
            }
        }
    }
}