export class Enemy {
    constructor(targetEl, player, bottomBound, rightBound) {
        this.targetEl = targetEl;
        this.player = player;
        this.x = Math.random() * window.innerWidth;
        this.y = 0;
        this.width = 50;
        this.height = 50;
        this.speed = 150; 

        this.margin = 50 + Math.floor(Math.random() * 50);

        console.log(bottomBound, rightBound)

        this.bottomBound = bottomBound;
        this.rightBound = rightBound;

        this.directionCooldown = 2,
        this.directionTimer = 0;
        this.direction = 0;

        this.el = this.#init();
    }

    updateBound(bottomBound, rightBound) {
        this.bottomBound = bottomBound - this.height;
        this.rightBound = rightBound - this.width;
    }

    #init() {
        this.spawnPosition = Math.floor(Math.random()*4);
        if(this.spawnPosition == 0) {
            this.x = 0;
            this.y = Math.random() * this.bottomBound;
        } else if (this.spawnPosition == 1) {
            this.x = Math.random() * this.rightBound;
            this.y = this.bottomBound - this.height;
        } else if (this.spawnPosition == 2) {
            this.x = this.rightBound;
            this.y = Math.random() * this.bottomBound;
        } else if (this.spawnPosition == 3) {
            this.x = Math.random() * this.rightBound;
            this.y = 0;
        }

        let el = document.createElement("div");
        el.id = "enemy";
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
        const distancePlayer = Math.hypot(this.x - this.player.x, this.y - this.player.y);
        if (distancePlayer < 100) {
            this.el.classList = "close";
        } else if (distancePlayer < 250) {
            this.el.classList = "nearby";
        } else {
            this.el.classList = "";
        }

        if(this.x > this.player.x) {
            this.x -= deltaTime * this.speed;
        } else {
            this.x += deltaTime * this.speed;
        }

        if(this.y > this.player.y) {
            this.y -= deltaTime * this.speed;
        } else {
            this.y += deltaTime * this.speed;
        }
    }

    draw() {
        this.el.style.top = this.y + "px";
        this.el.style.left = this.x + "px";
    }
}