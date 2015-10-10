/// <reference path="../../phaserLib/phaser.d.ts"/>
module States
{
    export class TitleScreenState extends Phaser.State
    {
        game:Phaser.Game;

        START_BUTTON1:Phaser.Key;
        START_BUTTON2:Phaser.Key;
        INFO_BUTTON: Phaser.Key;
        bg: Phaser.TileSprite;
        enter: Phaser.Sprite;

        s1:Phaser.Sound;

        titleAni: Phaser.Sprite;

        squeaks: Array<Phaser.Sound>;

        create() {


            this.bg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "bg_neu");

            // blinking enter
            this.enter = this.game.add.sprite(this.game.width * 0.88, this.game.height * 0.82, "enter");
            this.enter.anchor.setTo(0.5,0.5);
            this.enter.scale.x = 0.50;
            this.enter.scale.y = 0.50;
            this.enter.alpha = 0;
            this.game.add.tween(this.enter).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

            this.s1 = this.game.add.audio('bg_old', 1, true);
            this.s1.play();

            this.squeaks = [
                this.game.add.audio('squeak', 1,false),
                this.game.add.audio('squeak2',1,false)
            ];

            this.showInfo();

            // buttons
            this.START_BUTTON1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            this.START_BUTTON1.onDown.add(TitleScreenState.prototype.buttonPressed, this);
            this.START_BUTTON2 = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.START_BUTTON2.onDown.add(TitleScreenState.prototype.buttonPressed, this);
            this.INFO_BUTTON = this.game.input.keyboard.addKey(Phaser.Keyboard.I);
            this.INFO_BUTTON.onDown.add(TitleScreenState.prototype.openInfoPage, this);

            this.titleAni = this.game.add.sprite(this.game.width/2, this.game.height/2, 'TITLE_ANIM');
            this.titleAni.anchor.set(0.5,0.5);
            this.titleAni.scale.x = 0.27;
            this.titleAni.scale.y = 0.27;
            this.titleAni.animations.add("TITLE_ANIM"); // whole sheet = move animation
            this.titleAni.animations.play("TITLE_ANIM", 8, true); // true -> loop forever

        }

        showInfo()
        {
            document.getElementById('infolink').style.display = 'block';
        }

        hideInfo()
        {
            document.getElementById('infolink').style.display = 'none';
        }

        buttonPressed() {
            this.sound.stopAll();
            this.hideInfo();
            this.squeaks[Math.floor(Math.random()* 2)].play();
            this.game.tweens.removeFrom(this.enter); // remove enter tween
            this.INFO_BUTTON.onDown.remove(TitleScreenState.prototype.openInfoPage, this); // clear Infobutton
            this.game.input.keyboard.removeKey(Phaser.Keyboard.I);
            this.game.state.start("MenuState");
        }

        openInfoPage()
        {
            window.open("info.html",'_blank');
        }

    }
}
