/// <reference path="../../phaserLib/phaser.d.ts"/>
class TitleScreenState extends Phaser.State
{
    game: Phaser.Game;

    START_BUTTON: Phaser.Key;

    create()
    {
        var line1 = "Bugs and Features";
        var style = { font: "48px Arial", fill: "#ff0000", textAlign: "center"};
        this.game.add.text(10, 10, line1, style);

        this.START_BUTTON = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.START_BUTTON.onDown.add(TitleScreenState.prototype.buttonPressed, this);

    }

    buttonPressed()
    {
        this.game.state.start("MenuState");
    }

}