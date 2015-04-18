/// <reference path="../../phaserLib/phaser.d.ts"/>
/// <reference path="../GameObjects/Bug.ts"/>

class MenuState extends Phaser.State
{
    game: Phaser.Game;

    START_BUTTON: Phaser.Key;


    bugs: Array<Bug>;

    create()
    {
        var line1 = "MENU";
        var style = { font: "48px Arial", fill: "#ff0000", textAlign: "center"};
        this.game.add.text(10, 10, line1, style);

        this.START_BUTTON = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.START_BUTTON.onDown.add(MenuState.prototype.buttonPressed, this);

        this.bugs = [

            new Bug(this.game,"BUG1_MOVING", 0, this.game.height - this.game.height/2),
            new Bug(this.game,"BUG2_MOVING", 400, this.game.height - this.game.height/2),
            new Bug(this.game,"BUG3_MOVING", 800, this.game.height - this.game.height/2)

        ];
        
    }

    buttonPressed()
    {
        this.game.state.start("GameScreenState");
    }

}