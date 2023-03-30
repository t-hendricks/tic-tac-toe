/**
 * Game Class Object handles DOM events, maintain state
 * of game, and implement required methods for rules
 */
class Game {
    constructor() {
        this.tileEls = document.querySelectorAll(".tile");

        this.tileEls.forEach(tile => tile.addEventListener("click", this.handleClick));
    }

    handleClick = event => {
        console.log("Clicked!");
    }
}

const tikTakToe = new Game();