/**
 * Player Class handles DOM events and track and update 
 * individual player stats
 */
class Player {
    constructor(playerNum) {
        this.playerNum = playerNum;
        this.name = document.querySelector(`#${this.playerNum}>.name`);
        this.wins = document.querySelector(`#${this.playerNum}>p>.wins`);
        this.losses = document.querySelector(`#${this.playerNum}>p>.losses`);
        this.draws = document.querySelector(`#${this.playerNum}>p>.draws`);
    }

    setWins = num => this.wins.innerText = `W: ${num}`;

    setLosses = num => this.losses.innerText = `L: ${num}`;

    setDraws = num => this.draws.innerText = `D: ${num}`;

    getWins = () => this.wins.innerText;

    getLosses = () => this.losses.innerText;

    getDraws = () => this.draws.innerText;
}