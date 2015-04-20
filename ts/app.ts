/// <reference path="../phaserLib/phaser.d.ts"/>
/// <reference path="States/TitleScreenState.ts"/>
/// <reference path="States/GameScreenState.ts"/>
/// <reference path="States/GameOverScreenState.ts"/>
/// <reference path="States/MenuState.ts"/>

class BugsAndFeatures {
    constructor() {
        this.game = new Phaser.Game(1280, 650, Phaser.AUTO, 'content', {create: this.create, preload: this.preload});
    }

    game:Phaser.Game;

    preload() {

        var line1 = "Loading...";
        var style = {font: "60px Swanky and Moo Moo", fill: "#ff0000"};
        this.game.add.text(this.game.width * 0.40, this.game.height *0.43, line1, style);

        // background & ambience sprites
        this.game.load.image('bg_neu', 'assets/gfx/HG_neu.jpg');
        this.game.load.image('leaves1', 'assets/gfx/leave1.png');
        this.game.load.image('leaves2', 'assets/gfx/leave2.png');
        this.game.load.image('leaves3', 'assets/gfx/leave3.png');
        this.game.load.image('twig', 'assets/gfx/twig.png');

        // loading spritesheets
        this.game.load.atlasJSONHash("BUG1_MOVING", "assets/gfx/final_bugs/goldie_animation.png", "assets/gfx/final_bugs/goldie_animation.json");
        this.game.load.atlasJSONHash("BUG2_MOVING", "assets/gfx/final_bugs/hirschi.png", "assets/gfx/final_bugs/hirischi_moving.json");
        this.game.load.atlasJSONHash("BUG3_MOVING", "assets/gfx/final_bugs/schoeni_animation.png", "assets/gfx/final_bugs/schoeni_animation.json");
        this.game.load.atlasJSONHash("BUG4_MOVING", "assets/gfx/final_bugs/raini.png", "assets/gfx/final_bugs/raini.json");
        this.game.load.atlasJSONHash("TITLE_ANIM", "assets/gfx/title_animation.png", "assets/gfx/title_animation.json");

        //music
        this.game.load.audio("menunew", "assets/sound/bug_menu_loop_new.wav");
        this.game.load.audio("loopwbeat", "assets/sound/bugs_and_features_loop_with_beat.wav");
        this.game.load.audio("loopwdoing", "assets/sound/bugs_and_features_loop_with_doing.wav");
        this.game.load.audio("loopwdoingalowpass", "assets/sound/bugs_and_features_loop_with_doing_and_lowpass.wav");
        this.game.load.audio("loopwdoingaresonance", "assets/sound/bugs_and_features_loop_with_doing_and_resonance.wav");
        this.game.load.audio("end_quiet", "assets/sound/end_quiet.mp3");
        this.game.load.audio("bg_old", "assets/sound/background_old.mp3");

        // sfx
        this.game.load.audio("beep", "assets/sound/sfx/beep.wav");
        this.game.load.audio("end", "assets/sound/sfx/bugs-end-2.wav");
        this.game.load.audio("end_combined", "assets/sound/sfx/bugs-end-combined.wav");
        this.game.load.audio("squeak", "assets/sound/sfx/bugs-squeak.wav");
        this.game.load.audio("squeak2", "assets/sound/sfx/bugs-squeak-2.wav");
        this.game.load.audio("startrace", "assets/sound/sfx/race_start.wav");

        // start physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

    }

    create() {

        // title screen
        this.game.state.add("TitleScreenState", TitleScreenState, true);

        // game screen
        this.game.state.add("GameScreenState", GameScreenState, false);

        // game over screen
        this.game.state.add("GameOverScreenState", GameOverScreenState, false);

        // menu state
        this.game.state.add("MenuState", MenuState, false);

    }

}

window.onload = () => {
    var game = new BugsAndFeatures();
};
