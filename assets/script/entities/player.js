import { Weapon } from "./weapon.js";

export class Player {
    constructor(targetEl, input, bottomBound, rightBound) {
        this.targetEl = targetEl;
        this.input = input;
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight - 200;
        this.width = 25;
        this.height = 25;
        this.leftBound = 0;
        this.rightBound = rightBound - this.width;
        this.topBound = 0;
        this.bottomBound = bottomBound;

        this.mouseX = 0;
        this.mouseY = 0;

        this.speed = 500;
        this.verticalSpeed = 0.75;
        this.el = this.#init();
        this.alive = true;
        this.weapon = new Weapon(targetEl, this);
    }

    updateBound(bottomBound, rightBound) {
        this.bottomBound = bottomBound - this.height;
        this.rightBound = rightBound - this.width;
        this.weapon.updateBound(bottomBound, rightBound)
    }

    updateMouse(x, y) {
        this.mouseX = x;
        this.mouseY = y;
    }

    #init() {
        let el = document.createElement("div");
        el.setAttribute("id", "player");
        el.style.top = this.y + "px";
        el.style.left = this.x + "px";
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

    die() {
        this.alive = false;
        this.el.setAttribute("id", "dead");
    }

    update(deltaTime) {
        if (!this.alive) return;
        if (this.input.keys.ArrowLeft || this.input.keys.a) {
            this.x -= deltaTime * this.speed;
        }
        if (this.input.keys.ArrowRight || this.input.keys.d) {
            this.x += deltaTime * this.speed;
        }
        if (this.input.keys.ArrowUp || this.input.keys.w) {
            this.y -= deltaTime * this.speed * this.verticalSpeed;
        }
        if (this.input.keys.ArrowDown || this.input.keys.s) {
            this.y += deltaTime * this.speed * this.verticalSpeed;
        }
        if (this.input.keys[" "] && this.weapon.shootTimer > this.weapon.shootCooldown) {
            const dX = this.mouseX - this.weapon.x;
            const dY = -(this.mouseY - this.weapon.y);
            const dZ = Math.sqrt(dX ** 2 + dY ** 2);

            const xRad = dX / dZ;
            const yRad = dY / dZ;

            this.weapon.shoot(xRad, yRad);
            this.x -= deltaTime * this.weapon.recoil * (xRad);
            this.y += deltaTime * this.weapon.recoil * (yRad);
        }

        if (this.x >= this.rightBound) {
            this.x = this.rightBound;
        } else if (this.x <= this.leftBound) {
            this.x = this.leftBound;
        }
        if (this.y >= this.bottomBound) {
            this.y = this.bottomBound;
        } else if (this.y <= this.topBound) {
            this.y = this.topBound;
        }
        this.weapon.update(deltaTime);
    }

    draw() {
        this.el.style.top = this.y + "px";
        this.el.style.left = this.x + "px";
        this.weapon.draw();
    }
}