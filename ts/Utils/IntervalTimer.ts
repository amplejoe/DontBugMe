/// <reference path="Timer.ts"/>
module Utils
{
    export class IntervalTimer extends Timer
    {
        intervalCheckPoint: number; // last checkpoint for interval
        interval: number; // secs

        constructor(game: Phaser.Game, interval: number)
        {
            super(game);
            this.setInterval(interval);
            this.setIntervalCheckPoint(this.startTime);
        }

        reInit()
        {
            this.restart();
            this.setIntervalCheckPoint(this.startTime);
        }

        setInterval(interval: number){this.interval = interval;}

        getInterval(): number {return this.interval;}

        setIntervalCheckPoint(checkPoint: number)
        {
            this.intervalCheckPoint = checkPoint;
        }

        getIntervalCheckPoint():number
        {
            return this.intervalCheckPoint;
        }

        checkInterval(): boolean
        {
            var elapsed: number = this.game.time.elapsedSecondsSince(this.intervalCheckPoint);

            if (elapsed >= this.interval)
            {
                this.setIntervalCheckPoint(this.game.time.time);

                return true;
            }

            return false;

        }

    }
}

