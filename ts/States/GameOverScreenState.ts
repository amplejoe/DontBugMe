/// <reference path="../../phaserLib/phaser.d.ts"/>
class GameOverScreenState extends Phaser.State
{
    game: Phaser.Game;
    START_BUTTON: Phaser.Key;

    score: string = "00:00:00";

    gameOverTime: number;

    waitTime: number = 5;

    winner: string;

   setWinner(winner: string)
   {
        this.winner = winner;
   }

    create()
    {

        var line1 = "Game Over - The Winner is:";
        var line2 = this.winner;
        var style = { font: "48px Arial", fill: "#ff0000", textAlign: "center"};
        this.game.add.text(10, 10, line1, style);
        this.game.add.text(10, 150, line2, style);

        /*
        this.gameOverTime = this.game.time.time;
        */
    }

    update()
    {
        var elapsedSeconds = this.toInt(this.game.time.elapsedSecondsSince(this.gameOverTime));

        if (elapsedSeconds >= this.waitTime)
        {
            this.START_BUTTON = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
            this.START_BUTTON.onDown.add(GameOverScreenState.prototype.buttonPressed, this);
        }
    }

    buttonPressed()
    {
        this.game.state.start("GameScreenState");
    }

    toInt(value) { return ~~value; }

}