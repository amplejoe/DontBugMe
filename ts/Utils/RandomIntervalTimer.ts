/// <reference path="Timer.ts"/>
class RandomIntervalTimer extends Timer
{
    max: number;
    min: number;

    constructor(game: Phaser.Game, max, min) { super(game); this.setMax(max); this.setMin(min);}

    setMax(max) {this.max = max;}
    setMin(min) {this.min = min;}

    getMax() {return this.max;}
    getMin() {return this.min;}



}

