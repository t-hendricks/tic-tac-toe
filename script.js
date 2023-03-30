/**
 * Game Class handles DOM events, maintain state
 * of game, and implement required methods for rules
 */
class Game {
    constructor() {
        this.playerTwoTurn = false;
        this.tileEls = document.querySelectorAll(".tile");

        // Invoke only once for each empty tile
        this.tileEls.forEach(tile => tile.addEventListener("click", this.handleClick, {once: true}));
    }

    /**
     * Check win conditions and player turns after 
     * clicking an empty tile and placing a token
     * @param {"click"} event 
     */
    handleClick = event => {
        const emptyTile = event.target;
        const currMark = this.playerTwoTurn ? "O" : "X";
        this.placeMark(currMark, emptyTile);
        this.switchPlayersTurn();
        console.log(emptyTile);
    }

    placeMark = (mark, tile) => {
        tile.innerText = mark;
    }

    switchPlayersTurn = () => {
        this.playerTwoTurn = !this.playerTwoTurn;
    }
}

const tikTakToe = new Game();