/// <reference path="../../phaserLib/phaser.d.ts"/>
/// <reference path="../GameObjects/Bug.ts"/>
/// <reference path="../Utils/GameSettings.ts"/>
module States
{
    export class GameOverScreenState extends Phaser.State
    {
        game: Phaser.Game;

        timePlayed: string = "00:00:00";

        bg: Phaser.TileSprite;

        enter: Phaser.Sprite;

        winnerBug: Sprites.Bug;

        winnerId: number;
        winnerString: string;
        winnerRank: number;

        START_BUTTON1:Phaser.Key;
        START_BUTTON2:Phaser.Key;

        sEnd: Phaser.Sound;

        setWinner(winnerId:number, winnerString: string)
        {
            this.winnerId = winnerId;
            this.winnerString = winnerString;
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

            // blinking enter
            this.enter = this.game.add.sprite(this.game.width * 0.92, this.game.height * 0.86, "enter");
            this.enter.anchor.setTo(0.5,0.5);
            this.enter.scale.x = 0.40;
            this.enter.scale.y = 0.40;
            this.enter.alpha = 0;
            this.game.add.tween(this.enter).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

            var line1 = "Game Over - The Winner (Rank "+this.winnerRank+"):";

            var style = GameSettings.getTextStyle(GameSettings.TextStyles.STYLE_RED,60);
            this.game.add.text(this.game.width/2- 400, 70, line1, style);

            if (this.winnerString == "")
            {
                var line2 = "Nobody!";
                var style2 = GameSettings.getTextStyle(GameSettings.TextStyles.STYLE_RED,80);
                this.game.add.text(this.game.width/2 - 100, 250, line2, style2);

            }
            else
            {
                this.winnerBug = new Sprites.Bug(this.game, this.winnerId, this.winnerString, this.game.width * 0.5, this.game.height * 0.5);

                this.winnerBug.x -= this.winnerBug.width/2;
                this.winnerBug.y -= this.winnerBug.height/2;
                this.game.add.existing(this.winnerBug);
                this.winnerBug.animate();
            }

            var line3 = "Time played: "+this.timePlayed;
            this.game.add.text(this.game.width/2 - 100, this.game.height * 0.80, line3, style);
        }

        update()
        {

        }

        setRank(rank: number): void
        {
            this.winnerRank = rank;
        }

        buttonPressed()
        {
            this.sound.stopAll();
            this.game.tweens.removeFrom(this.enter); // remove enter tween
            this.game.state.start("TitleScreenState");
        }

        toInt(value) { return ~~value; }

    }
}