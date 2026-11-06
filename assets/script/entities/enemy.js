export class Enemy {
    constructor(targetEl) {
        this.targetEl = targetEl;
        this.x = Math.random() * window.innerWidth;
        this.y = 0;
        this.width = 50;
        this.height = 50;
        this.speed = 500;
        this.el = this.#init();
    }

    #init() {
        // this.width = Math.random()*100;
        let el = document.createElement("div");
        el.classList.add("enemy");
        el.style.top = this.y + "px";
        el.style.left = this.x + "px";
        el.style.width = this.width + "px";
        el.style.height = this.height + "px";
        this.targetEl.append(el);
        return el;
    }

    kill() {
        this.el.remove();
    }

    update(deltaTime) {
        this.y += this.speed * deltaTime;
    }

    draw() {
        this.el.style.top = this.y + "px";
    }
}