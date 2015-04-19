/// <reference path="../../phaserLib/phaser.d.ts"/>
class TitleScreenState extends Phaser.State {
    game:Phaser.Game;

    START_BUTTON:Phaser.Key;

    title: Phaser.TileSprite;
    bg: Phaser.TileSprite;

    s1:Phaser.Sound;

    squeaks: Array<Phaser.Sound>;

    create() {
        /*
        var line1 = "Bugs and Features";
        var style = {font: "48px Arial", fill: "#ff0000", textAlign: "center"};
        this.game.add.text(10, 10, line1, style);
        */



        this.bg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "bg");

        this.title = this.game.add.tileSprite(this.game.width/2 -(613/2), this.game.height/2 - (545/2), 613, 545, "title");
        this.START_BUTTON = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.START_BUTTON.onDown.add(TitleScreenState.prototype.buttonPressed, this);

        this.s1 = this.game.add.audio('title_loop');
        this.s1.play(null, null, 1, true);

        this.squeaks = [
            this.game.add.audio('squeak'),
            this.game.add.audio('squeak2')
        ];

    }

    buttonPressed() {
        this.s1.stop();
        this.squeaks[Math.floor(Math.random()* 2)].play(null, null, 1 , false);
        this.game.state.start("MenuState");
    }

}