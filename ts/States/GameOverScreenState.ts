/// <reference path="../../phaserLib/phaser.d.ts"/>
/// <reference path="../GameObjects/Bug.ts"/>
class GameOverScreenState extends Phaser.State
{
    game: Phaser.Game;
    START_BUTTON: Phaser.Key;

    score: string = "00:00:00";

    bg: Phaser.TileSprite;

    gameOverTime: number;

    waitTime: number = 5;

    winnerbug: Bug;

    winner: string;

   setWinner(winner: string)
   {
        this.winner = winner;
   }

    create()
    {

        this.bg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "bg");

        var line1 = "Game Over - The Winner:";

        var style = { font: "48px Arial", fill: "#ff0000", textAlign: "center"};
        this.game.add.text(this.game.width/2- 300, 70, line1, style);

        if (this.winner == "")
        {
            var line2 = "Nobody!";
            this.game.add.text(this.game.width/2 - 100, 250, line2, style);

        }
        else
        {
            this.winnerbug = new Bug(this.game, this.winner, this.game.width/2, 350);

            this.game.add.existing(this.winnerbug);
            this.winnerbug.Animate();
        }

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