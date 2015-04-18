/// <reference path="../phaserLib/phaser.d.ts"/>
/// <reference path="States/TitleScreenState.ts"/>
/// <reference path="States/GameScreenState.ts"/>
/// <reference path="States/GameOverScreenState.ts"/>
/// <reference path="States/TestState.ts"/>
class BugsAndFeatures
{
    constructor()
    {
        this.game = new Phaser.Game(1280, 600, Phaser.AUTO, 'content', {create: this.create, preload: this.preload });
    }
    game: Phaser.Game;

    preload()
    {

        // background
        this.game.load.image('bg', 'assets/gfx/hg.jpg');

        // loading spritesheets
        this.game.load.atlasJSONHash("BUG1_MOVING", "assets/gfx/final_bugs/goldie_animation.png", "assets/gfx/final_bugs/goldie_animation.json");
        this.game.load.atlasJSONHash("BUG2_MOVING", "assets/gfx/final_bugs/hirschi.png", "assets/gfx/final_bugs/hirischi_moving.json");
        this.game.load.atlasJSONHash("BUG3_MOVING", "assets/gfx/final_bugs/schoeni_animation.png", "assets/gfx/final_bugs/schoeni_animation.json");

    }

    create()
    {
        // show title screen
        this.game.state.add("TitleScreenState", TitleScreenState, true);


        // game screen
        this.game.state.add("GameScreenState", GameScreenState, false);


        // game over screen
        this.game.state.add("GameOverScreenState", GameOverScreenState, false);

        // test state
        this.game.state.add("TestState", TestState, false);

    }

}

window.onload = () =>
{
    var game = new BugsAndFeatures();
};
