/**
 * Game Class handles DOM events to maintain state of game, 
 * initiate with two players and board tiles, turn set up, 
 * and methods for game rules and actions
 */
class Game {
    constructor() {
        this.playerTwoTurn = false;
        this.playerOne = new Player("first-player");
        this.playerTwo = new Player("second-player");
        this.tileEls = document.querySelectorAll(".tile");
        this.messageEl = document.querySelector("#end-game-message");
        this.resetBtnEl = document.querySelector("#reset-board");
        this.clearBtnEl = document.querySelector("#clear-score");

        this.tileEls.forEach(tile => tile.addEventListener("click", this.handleClick, {once: true})); // Invokes only once for each empty tile
        this.resetBtnEl.addEventListener("click", this.resetBoard);
        this.clearBtnEl.addEventListener("click", this.clearScores);
        this.playerOne.getNameDOM().style.textDecoration = "underline"; // Invoke player's DOM element w/ class .name, underline the text
    }


    /**
     * Check win conditions or player turns after 
     * clicking an empty tile and placing a mark
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
            new Audio("./audio/winner.wav").play();
        } else if (this.checkDraw(mark)) {
            this.updateStats(currPlayer, otherPlayer, true);
            this.endGame("Draw!");
            new Audio("./audio/draw.wav").play();
        } else {
            this.switchPlayersTurn(mark);
        }
    }


    placeMark = (mark, tile) => {
        tile.innerText = mark;
        tile.classList.add(mark.toLowerCase());
        new Audio("./audio/tile-click.wav").play();
    }


    /**
     * Iterate through the winning conditions 2D array 
     * for a 3x3 board to possibly find at least one condition
     * to have every element match each mark.id on a played tile
     * @param {array} player 
     * @returns {boolean}
     */
    checkWin = mark => {
        const conditions = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ]

        return conditions.some(condition => {   // Return true if found at least one match
            return condition.every(position => {    // Return true if every element in condition exist in array
                const playerMarks = Array.from(document.querySelectorAll(`.${mark.toLowerCase()}`)); // Change NodeList to an array
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

    
    // Replace each changed tile back to original state
    resetBoard = event => {
        new Audio("./audio/reset.wav").play();
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

    // Reset players scores to 0
    clearScores = event => {
        new Audio("./audio/clear-scores.wav").play();
        this.playerOne.setWins(0);
        this.playerOne.setLosses(0);
        this.playerOne.setDraws(0);

        this.playerTwo.setWins(0);
        this.playerTwo.setLosses(0);
        this.playerTwo.setDraws(0);
    }
}

const tikTakToe = new Game();