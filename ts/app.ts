/// <reference path="../phaserLib/phaser.d.ts"/>
/// <reference path="States/TitleScreenState.ts"/>
/// <reference path="States/GameScreenState.ts"/>
/// <reference path="States/GameOverScreenState.ts"/>
/// <reference path="States/TestState.ts"/>
class BugsAndFeatures
{
    constructor()
    {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {create: this.create, preload: this.preload });
    }
    game: Phaser.Game;

    preload()
    {

        // background
        this.game.load.image('bg', 'assets/gfx/hg.jpg');

        // loading spritesheets
        //this.game.load.atlasJSONHash("BIRD_FLYING", spritePath+"bird.png", spritePath+"bird_flying.json");
    }

    create()
    {
        // show title screen
        this.game.state.add("TitleScreenState", TitleScreenState, true);


        // game screen
        this.game.state.add("GameScreenState", GameScreenState, false);


        // game over screen
        this.game.state.add("GameOverScreenState", GameOverScreenState, false);

        // game over screen
        this.game.state.add("TestState", TestState, false);

    }

}

window.onload = () =>
{
    var game = new BugsAndFeatures();
};
