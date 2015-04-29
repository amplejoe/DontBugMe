/// <reference path="Timer.ts"/>
class IntervalTimer extends Timer
{
    intervalCheckPoint: number; // last checkpoint for interval
    interval: number; // secs

    constructor(game: Phaser.Game, interval: number)
    {
        super(game);
        this.setInterval(interval);
        this.setIntervalCheckPoint(this.game.time.time);
    }

    setInterval(interval: number){this.interval = interval;}

    getInterval(): number {return this.interval;}

    setIntervalCheckPoint(checkPoint: number)
    {
        this.intervalCheckPoint = checkPoint;
    }

    checkInterval(): boolean
    {
        var elapsed: number =  this.getCurrentTimeSeconds();

        if (elapsed >= this.interval)
        {
            this.setIntervalCheckPoint(this.game.time.time);

            return true;
        }

        return false;

    }

}
