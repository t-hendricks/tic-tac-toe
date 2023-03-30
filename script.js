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
        console.log(this.checkWin(currMark));
        this.switchPlayersTurn();
        console.log(emptyTile);
    }

    placeMark = (mark, tile) => {
        tile.innerText = mark;
        tile.classList.add(mark.toLowerCase());
    }

    /**
     * Iterate through the winning conditions 2D array 
     * for a 3x3 board to possibly find at least one match
     * for every mark.id played on a matching tile
     * @param {array} player 
     * @returns {boolean}
     */
    checkWin = (mark) => {
        const conditions = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ]

        return conditions.some(condition => {
            return condition.every(position => {
                // Change NodeList to an array
                const playerMarks = Array.from(document.querySelectorAll(`.${mark.toLowerCase()}`));
                return playerMarks.some(tile => tile.id == position);
            })
        })
    }

    switchPlayersTurn = () => {
        this.playerTwoTurn = !this.playerTwoTurn;
    }
}

const tikTakToe = new Game();