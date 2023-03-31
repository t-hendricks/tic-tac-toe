/**
 * Player Class handles DOM events and track and update 
 * individual player stats
 */
class Player {
    constructor(playerNum) {
        this.playerNum = playerNum;
        this.wins = document.querySelector(`#${this.playerNum}>wins`);
        this.losses = document.querySelector(`#${this.playerNum}>losses`);
        this.wins = document.querySelector(`#${this.playerNum}>draws`);
    }


}