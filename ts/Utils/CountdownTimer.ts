/// <reference path="Timer.ts"/>
class CountdownTimer extends Timer
{
    countdown: number;

    constructor(startTime, countdown) { super(startTime); this.setCountdown(countdown);}

    setCountdown(countdown) {this.countdown = countdown;}

    getCountdown() {return this.countdown;}

}
