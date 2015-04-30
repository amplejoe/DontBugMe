/// <reference path="Timer.ts"/>
module Utils
{
    export class CountdownTimer extends Timer
    {
        countdown: number;

        constructor(game: Phaser.Game, countdown) { super(game); this.setCountdown(countdown);}

        setCountdown(countdown) {this.countdown = countdown;}

        getCountdown():number {return this.countdown;}

    }
}

