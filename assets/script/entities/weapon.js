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

        this.shootCooldown = 0.2;
        this.shootTimer = 0;
        this.topBound = 0;

        this.mouseX = 0;
        this.mouseY = 0;

        this.recoil = 100;

        this.el = this.#init();
    }

    updateMouse(x, y) {
        this.mouseX = x;
        this.mouseY = y;
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

    #getAngleDegrees(x1, y1, x2, y2) {
        const radians = Math.atan2(y2 - y1, x2 - x1);
        let degrees = radians * (180 / Math.PI);
        
        return degrees;
    }

    shoot() {
        if (this.shootTimer > this.shootCooldown) {
            let angle = this.#getAngleDegrees(this.mouseX, this.mouseY, this.x, this.y) - 90;
            if (angle < -60 || angle > 60) {
                angle = 0;
            }
            let b = new Bullet(this.targetEl, this.player, this, angle);
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
            if (this.bullets[x].y < this.topBound) {
                this.bullets[x].delete();
                this.bullets.splice(x, 1);
                return;
            }
        }
    }
}