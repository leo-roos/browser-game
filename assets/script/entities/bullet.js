export class Bullet {
    constructor(targetEl, player, weapon, xRad, yRad) {
        this.targetEl = targetEl;
        this.player = player;
        this.weapon = weapon;

        this.width = 3;
        this.height = 50;
        this.x = this.weapon.x + this.weapon.width / 2;
        this.y = this.weapon.y;
        this.speed = 750;

        this.xRad = xRad,
        this.yRad = yRad,

        this.el = this.#init();
    }

    #init() {
        let el = document.createElement("div");
        el.classList.add("bullet");
        el.style.left = this.x + "px";
        el.style.top = this.y + "px";
        el.style.width = this.width + "px";
        el.style.height = this.height + "px";

        const moveAngleRad = Math.atan2(this.yRad, this.xRad);
        const weaponAngleRad = moveAngleRad + Math.PI / 2;
        const weaponAngleDeg = weaponAngleRad * (180 / Math.PI);

        el.style.transform = `rotate(${-weaponAngleDeg}deg)`;
        this.targetEl.append(el);
        return el;
    }

    delete() {
        this.el.remove();
    }

    update(deltaTime) {
        this.y -= deltaTime * this.speed * (this.yRad);
        this.x += deltaTime * this.speed * (this.xRad);
    }

    draw() {
        this.el.style.top = this.y + "px";
        this.el.style.left = this.x + "px";
    }
}