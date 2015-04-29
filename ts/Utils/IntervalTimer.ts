/// <reference path="Timer.ts"/>
class IntervalTimer extends Timer
{
    interval: number; // secs

    constructor(startTime: number, interval: number) {console.log(startTime); super(startTime); this.setInterval(interval);}

    setInterval(interval){this.interval = interval;}

    getInterval(){return this.interval;}
}
