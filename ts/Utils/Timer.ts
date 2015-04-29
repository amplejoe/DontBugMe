/// <reference path="../../phaserLib/phaser.d.ts"/>
class Timer
{
    game:Phaser.Game;

    startTime: number;

    constructor(time) {this.setStartTime(time);}

    setStartTime(time: number) {this.startTime = time;}

    getStartTime() {return this.startTime;}

    getCurrentTimeIntSeconds()
    {
        return this.toInt(this.game.time.elapsedSecondsSince(this.startTime));
    }

    getCurrentTimeSeconds()
    {
        return this.game.time.elapsedSecondsSince(this.startTime);
    }

    getCurrentTimeMS()
    {
        return this.game.time.elapsedSince(this.startTime);
    }

    getFormattedTime()
    {
        var elapsedSeconds = this.getCurrentTimeIntSeconds();

        var elapsedHours = this.toInt(elapsedSeconds / (60 * 60));
        if (elapsedHours > 0)
        {
            elapsedSeconds -= elapsedHours * 60 * 60;
        }
        var elapsedMinutes =  this.toInt(elapsedSeconds / 60);
        if (elapsedMinutes > 0)
        {
            elapsedSeconds -= elapsedMinutes * 60;
        }

        // add 0s for non double digit values
        var retTime = (elapsedHours > 9? "" : "0") + elapsedHours + ":" +
            (elapsedMinutes > 9? "" : "0") + elapsedMinutes + ":" +
            (elapsedSeconds > 9? "" : "0") + elapsedSeconds;

        return retTime;
    }

    toInt(value) { return ~~value; }

}