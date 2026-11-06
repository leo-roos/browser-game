export class InputManager {
    constructor() {
        this.keys = {};
        this.#init();
    }

    #init() {
        window.addEventListener("keydown", function (e) {
            this.keys[e.key] = true;
        }.bind(this));

        window.addEventListener("keyup", (e) => {
            this.keys[e.key] = false;
        });
    }


}