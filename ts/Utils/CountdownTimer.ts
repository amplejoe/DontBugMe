/// <reference path="Timer.ts"/>
module Utils
{
    export class CountdownTimer extends Timer
    {
        countdown: number; // secs

        constructor(game: Phaser.Game, countdown: number)
        {
            super(game);
            this.setCountdown(countdown);
        }

        setCountdown(countdown: number) {this.countdown = countdown;}

        getCountdownValue():number
        {
            var elapsed: number = this.getCurrentTimeSeconds();

            return (this.countdown-elapsed);
        }

        getCountdownIntValue():number
        {
            var elapsed: number = this.getCurrentTimeSeconds();


            return  UtilFunctions.toInt(this.countdown-elapsed);
        }

        isRunning(): boolean
        {
            var elapsed: number = this.getCurrentTimeSeconds();

            if (elapsed >= this.countdown)
            {
                return false;
            }
            return true;
        }

    }
}

