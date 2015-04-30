/// <reference path="Timer.ts"/>
module Utils
{
    export class RandomIntervalTimer extends Timer
    {
        max: number;
        min: number;

        constructor(game: Phaser.Game, max, min) { super(game); this.setMax(max); this.setMin(min);}

        setMax(max) {this.max = max;}
        setMin(min) {this.min = min;}

        getMax(): number {return this.max;}
        getMin(): number {return this.min;}
    }
}


