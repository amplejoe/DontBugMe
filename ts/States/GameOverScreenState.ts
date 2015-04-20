/// <reference path="../../phaserLib/phaser.d.ts"/>
/// <reference path="../GameObjects/Bug.ts"/>
class GameOverScreenState extends Phaser.State
{
    game: Phaser.Game;

    timePlayed: string = "00:00:00";

    bg: Phaser.TileSprite;

    winnerBug: Bug;

    winner: string;

    START_BUTTON1:Phaser.Key;
    START_BUTTON2:Phaser.Key;

    sEnd: Phaser.Sound;

   setWinner(winner: string)
   {
        this.winner = winner;
   }

    setTimePlayed(time: string)
    {
        this.timePlayed = time;
    }

    create()
    {

        this.sEnd = this.game.add.audio('end_quiet', 1, true);
        //this.sEnd.play();
        this.sEnd.fadeIn(6000, true); // fadein sound 6s

        this.START_BUTTON1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.START_BUTTON1.onDown.add(GameOverScreenState.prototype.buttonPressed, this);
        this.START_BUTTON2 = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.START_BUTTON2.onDown.add(GameOverScreenState.prototype.buttonPressed, this);

        this.bg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "bg_neu");

        var line1 = "Game Over - The Winner:";

        var style = { font: "60px Swanky and Moo Moo", fill: "#ff0000", textAlign: "center"};
        this.game.add.text(this.game.width/2- 450, 70, line1, style);

        if (this.winner == "")
        {
            var line2 = "Nobody!";
            var style2 = { font: "80px Swanky and Moo Moo", fill: "#ff0000", textAlign: "center"};
            this.game.add.text(this.game.width/2 - 100, 250, line2, style2);

        }
        else
        {
            this.winnerBug = new Bug(this.game, this.winner, this.game.width * 0.5, this.game.height * 0.5);

            this.winnerBug.x -= this.winnerBug.width/2;
            this.winnerBug.y -= this.winnerBug.height/2;
            this.game.add.existing(this.winnerBug);
            this.winnerBug.Animate();
        }

        var line3 = "Time played: "+this.timePlayed;
        this.game.add.text(this.game.width/2 - 100, this.game.height * 0.80, line3, style);
    }

    update()
    {

    }

    buttonPressed()
    {
        this.sound.stopAll();
        this.game.state.start("TitleScreenState");
    }

    toInt(value) { return ~~value; }

}