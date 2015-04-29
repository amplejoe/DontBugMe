/// <reference path="Timer.ts"/>
class CountdownTimer extends Timer
{
    countdown: number;

    constructor(game: Phaser.Game, countdown) { super(game); this.setCountdown(countdown);}

    setCountdown(countdown) {this.countdown = countdown;}

    getCountdown() {return this.countdown;}

}
