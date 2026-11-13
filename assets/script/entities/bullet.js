export class Bullet {
    constructor(targetEl, player, weapon, angle) {
        this.targetEl = targetEl;
        this.player = player;
        this.weapon = weapon;

        this.width = 3;
        this.height = 50;
        this.x = this.weapon.x + this.weapon.width / 2;
        this.y = this.weapon.y;
        this.speed = 750;

        this.angle = angle;

        this.el = this.#init();
    }

    #init() {
        let el = document.createElement("div");
        el.classList.add("bullet");
        el.style.left = this.x + "px";
        el.style.top = this.y + "px";
        el.style.width = this.width + "px";
        el.style.height = this.height + "px";
        el.style.rotate = this.angle + "deg";
        this.targetEl.append(el);
        return el;
    }

    delete() {
        this.el.remove();
    }

    update(deltaTime) {
        this.y -= deltaTime * this.speed;
        this.x += deltaTime * this.speed * (this.angle / 57.6);
    }

    draw() {
        this.el.style.top = this.y + "px";
        this.el.style.left = this.x + "px";
    }
}