export class Bullet {
    constructor(targetEl, player, weapon) {
        this.targetEl = targetEl;
        this.player = player;
        this.weapon = weapon;

        this.width = 3;
        this.height = 50;
        this.x = this.weapon.x + this.weapon.width / 2;
        this.y = this.weapon.y;
        this.speed = 750;

        this.el = this.#init();
    }

    #init() {
        let el = document.createElement("div");
        el.classList.add("bullet");
        el.style.left = this.x + "px";
        el.style.top = this.y + "px";
        el.style.width = this.width + "px";
        el.style.height = this.height + "px";
        this.targetEl.append(el);
        return el;
    }

    delete() {
        this.el.remove();
    }

    update(deltaTime) {
        this.y -= deltaTime * this.speed;
    }

    draw() {
        this.el.style.top = this.y + "px";
    }
}