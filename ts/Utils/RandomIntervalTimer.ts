/// <reference path="Timer.ts"/>
class RandomIntervalTimer extends Timer
{
    max: number;
    min: number;

    constructor(startTime, max, min) { super(startTime); this.setMax(max); this.setMin(min);}

    setMax(max) {this.max = max;}
    setMin(min) {this.min = min;}

    getMax() {return this.max;}
    getMin() {return this.min;}



}

