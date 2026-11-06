import { Weapon } from "./weapon.js";

export class Player {
    constructor(targetEl, input) {
        this.targetEl = targetEl;
        this.input = input;
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight - 200;
        this.width = 50;
        this.height = 50;
        this.leftBound = 0;
        this.rightBound = window.innerWidth - this.width;
        this.speed = 500;
        this.el = this.#init();
        this.alive = true;
        this.weapon = new Weapon(targetEl, this);
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

    die() {
        this.alive = false;
        this.el.setAttribute("id", "dead")
    }

    update(deltaTime) {
        if (!this.alive) return;
        if (this.input.keys.ArrowLeft || this.input.keys.a) {
            this.x -= deltaTime * this.speed;
        }
        if (this.input.keys.ArrowRight || this.input.keys.d) {
            this.x += deltaTime * this.speed;
        }
        if (this.input.keys[" "]) {
            this.weapon.shoot();
        }

        if (this.x >= this.rightBound) {
            this.x = this.rightBound;
        } else if (this.x <= this.leftBound) {
            this.x = this.leftBound;
        }
        this.weapon.update(deltaTime);
    }

    draw() {
        this.el.style.left = this.x + "px";
        this.weapon.draw();
    }
}