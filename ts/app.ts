/// <reference path="../phaserLib/phaser.d.ts"/>
/// <reference path="States/TitleScreenState.ts"/>
/// <reference path="States/GameScreenState.ts"/>
/// <reference path="States/GameOverScreenState.ts"/>
/// <reference path="States/TestState.ts"/>
/// <reference path="States/MenuState.ts"/>

class BugsAndFeatures {
    constructor() {
        this.game = new Phaser.Game(1280, 650, Phaser.AUTO, 'content', {create: this.create, preload: this.preload});
    }

    game:Phaser.Game;

    preload() {

        // background
        this.game.load.image('bg', 'assets/gfx/hg.jpg');

        // loading spritesheets
        this.game.load.atlasJSONHash("BUG1_MOVING", "assets/gfx/final_bugs/goldie_animation.png", "assets/gfx/final_bugs/goldie_animation.json");
        this.game.load.atlasJSONHash("BUG2_MOVING", "assets/gfx/final_bugs/hirschi.png", "assets/gfx/final_bugs/hirischi_moving.json");
        this.game.load.atlasJSONHash("BUG3_MOVING", "assets/gfx/final_bugs/schoeni_animation.png", "assets/gfx/final_bugs/schoeni_animation.json");
        this.game.load.atlasJSONHash("BUG4_MOVING", "assets/gfx/final_bugs/raini.png", "assets/gfx/final_bugs/raini.json");
        //sounds
        this.game.load.audio("menunew", "assets/sound/bug_menu_loop_new.wav");
        this.game.load.audio("loopwbeat", "assets/sound/bugs_and_features_loop_with_beat.wav");
        this.game.load.audio("loopwdoing", "assets/sound/bugs_and_features_loop_with_doing.wav");
        this.game.load.audio("loopwdoingalowpass", "assets/sound/bugs_and_features_loop_with_doing_and_lowpass.wav");
        this.game.load.audio("loopwdoingaresonance", "assets/sound/bugs_and_features_loop_with_doing_and_resonance.wav");
        this.game.load.audio("end", "assets/sound/bugs-end-2.wav");
        this.game.load.audio("squeak", "assets/sound/bugs-squeak.wav");
        this.game.load.audio("squeak2", "assets/sound/bugs-squeak-2.wav");
        this.game.load.audio("changeofkey", "assets/sound/change_of_key.wav");
        this.game.load.audio("startrace", "assets/sound/race_start.wav");
        this.game.load.audio("tusch", "assets/sound/tusch-bugs-end.wav");


    }

    create() {
        // show title screen
        this.game.state.add("TitleScreenState", TitleScreenState, true);


        // game screen
        this.game.state.add("GameScreenState", GameScreenState, false);


        // game over screen
        this.game.state.add("GameOverScreenState", GameOverScreenState, false);

        // test state
        this.game.state.add("TestState", TestState, false);

        // menu state
        this.game.state.add("MenuState", MenuState, false);

        //sounds
        var menunew = this.game.add.audio('menunew');
        var loopwbeat = this.game.add.audio('loopwbeat');
        var loopwdoing = this.game.add.audio('loopwdoing');
        var loopwdoingalowpass = this.game.add.audio('loopwdoingalowpass');
        var loopwdoingaresonance = this.game.add.audio('loopwdoingaresonance');
        var end = this.game.add.audio('end');
        var squeak = this.game.add.audio('squeak');
        var squeak2 = this.game.add.audio('squeak2');
        var changeofkey = this.game.add.audio('changeofkey');
        var startrace = this.game.add.audio('startrace');
        var tusch = this.game.add.audio('tusch');

    }

}

window.onload = () => {
    var game = new BugsAndFeatures();
};
