/**
 * Game Class handles DOM events, maintain state
 * of game, and implement required methods for rules
 */
class Game {
    constructor() {
        this.playerTwoTurn = false;
        this.playerOne = new Player("first-player");
        this.playerTwo = new Player("second-player");
        this.tileEls = document.querySelectorAll(".tile");
        this.messageEl = document.querySelector("#end-game-message");
        this.resetBtnEl = document.querySelector("#reset-board");

        // Invoke only once for each empty tile
        this.tileEls.forEach(tile => tile.addEventListener("click", this.handleClick, {once: true}));
        this.resetBtnEl.addEventListener("click", this.resetBoard);
        this.playerOne.getNameDOM().style.textDecoration = "underline";
    }


    /**
     * Check win conditions and player turns after 
     * clicking an empty tile and placing a token
     * @param {"click"} event 
     */
    handleClick = event => {
        const emptyTile = event.target;
        const currPlayer = this.playerTwoTurn ? this.playerTwo : this.playerOne;
        const otherPlayer = !this.playerTwoTurn ? this.playerTwo : this.playerOne;
        const mark = currPlayer.getNameDOM().innerText;

        this.placeMark(mark, emptyTile);

        if (this.checkWin(mark)) {
            this.updateStats(currPlayer, otherPlayer, false);
            this.endGame(`${mark} Wins!`);
        } else if (this.checkDraw(mark)) {
            this.updateStats(currPlayer, otherPlayer, true);
            this.endGame("Draw!");
        } else {
            this.switchPlayersTurn(mark);
        }
        
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
    checkWin = mark => {
        const conditions = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ]

        return conditions.some(condition => {
            return condition.every(position => {
                // Changes NodeList to an array
                const playerMarks = Array.from(document.querySelectorAll(`.${mark.toLowerCase()}`));
                return playerMarks.some(tile => tile.id == position);
            })
        })
    }


    checkDraw = mark => {
        return document.querySelectorAll(`.${mark.toLowerCase()}`).length === 5;
    }


    switchPlayersTurn = mark => {
        this.playerOne.getNameDOM().style.textDecoration = mark === "X" ? "none" : "underline";
        this.playerTwo.getNameDOM().style.textDecoration = mark === "O" ? "none" : "underline";
        this.playerTwoTurn = !this.playerTwoTurn;
    }


    updateStats = (currPlayer, otherPlayer, draw) => {
        if (draw) {
            let currDrawCnt = parseInt(currPlayer.getDraws());
            let otherDrawCnt = parseInt(otherPlayer.getDraws());
            currPlayer.setDraws(++currDrawCnt);
            otherPlayer.setDraws(++otherDrawCnt);
        } else {
            let currWinCnt = parseInt(currPlayer.getWins());
            let otherLoseCnt = parseInt(otherPlayer.getLosses());
            currPlayer.setWins(++currWinCnt);
            otherPlayer.setLosses(++otherLoseCnt)
        }
    }


    endGame = message => {
        this.messageEl.innerText = message;
        this.tileEls.forEach(tile => tile.removeEventListener("click", this.handleClick));
    }

    
    // Replace each changed element back to original state
    resetBoard = event => {
        this.messageEl.innerText = "";
        this.playerTwoTurn = false;
        this.playerOne.getNameDOM().style.textDecoration = "underline";
        this.playerTwo.getNameDOM().style.textDecoration = "none";
        this.tileEls.forEach(tile => {
            tile.classList.remove("x");
            tile.classList.remove("o");
            tile.innerText = "";
            tile.addEventListener("click", this.handleClick, {once: true});
        })
    }
}

const tikTakToe = new Game();