/**
 * Player Class handles DOM events to track and update 
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


    setWins = num => this.wins.innerText = `${num}`;


    setLosses = num => this.losses.innerText = `${num}`;


    setDraws = num => this.draws.innerText = `${num}`;


    getNameDOM = () => this.name;


    getWins = () => this.wins.innerText;


    getLosses = () => this.losses.innerText;

    
    getDraws = () => this.draws.innerText;
}