/// <reference path="../../phaserLib/phaser.d.ts"/>
class TitleScreenState extends Phaser.State {
    game:Phaser.Game;

    START_BUTTON1:Phaser.Key;
    START_BUTTON2:Phaser.Key;

    title: Phaser.TileSprite;
    bg: Phaser.TileSprite;

    s1:Phaser.Sound;

    titleAni: Phaser.Sprite;

    squeaks: Array<Phaser.Sound>;

    create() {


        this.bg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "bg_neu");

        this.s1 = this.game.add.audio('bg_old');
        this.s1.play(null, null, 1, true);

        this.squeaks = [
            this.game.add.audio('squeak'),
            this.game.add.audio('squeak2')
        ];

        this.START_BUTTON1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.START_BUTTON1.onDown.add(TitleScreenState.prototype.buttonPressed, this);
        this.START_BUTTON2 = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.START_BUTTON2.onDown.add(TitleScreenState.prototype.buttonPressed, this);

        this.titleAni = this.game.add.sprite(this.game.width/2, this.game.height/2, 'TITLE_ANIM');
        this.titleAni.anchor.set(0.5,0.5);
        this.titleAni.scale.x = 0.3;
        this.titleAni.scale.y = 0.3;
        this.titleAni.animations.add("TITLE_ANIM"); // whole sheet = move animation
        this.titleAni.animations.play("TITLE_ANIM", 8, true); // true -> loop forever

    }

    buttonPressed() {
        this.sound.stopAll();
        this.squeaks[Math.floor(Math.random()* 2)].play(null, null, 1 , false);
        this.game.state.start("MenuState");
    }

}