/// <reference path="../../phaserLib/phaser.d.ts"/>
/// <reference path="../GameObjects/Bug.ts"/>


class MenuState extends Phaser.State {
    game:Phaser.Game;

    START_BUTTON1:Phaser.Key;
    START_BUTTON2:Phaser.Key;

    bg:Phaser.TileSprite;

    bugs:Array<Bug>;
    choosen:Array <boolean>;

    s1:Phaser.Sound;
    squeaks:Array<Phaser.Sound>;

    create() {

        this.bg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "bg_neu");

        this.s1 = this.game.add.audio('menunew', 1, true);
        this.s1.play();
        this.squeaks = [
            this.game.add.audio('squeak', 1 ,false),
            this.game.add.audio('squeak2', 1, false)
        ];

        var line1 = "Pick at least 2 Bugs!";
        var style = {font: "60px Swanky and Moo Moo", fill: "#ff0000", textAlign: "center"};
        this.game.add.text(this.game.width * 0.3, 60, line1, style);

        this.START_BUTTON1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.START_BUTTON1.onDown.add(MenuState.prototype.buttonPressed, this);
        this.START_BUTTON2 = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.START_BUTTON2.onDown.add(MenuState.prototype.buttonPressed, this);

        this.bugs = [
            new Bug(this.game, "BUG1_MOVING", this.game.width*.2, this.game.height  *0.4),
            new Bug(this.game, "BUG2_MOVING", this.game.width*.5, this.game.height *0.4),
            new Bug(this.game, "BUG3_MOVING", this.game.width*.8, this.game.height *0.4),
            new Bug(this.game, "BUG4_MOVING", this.game.width*.35, this.game.height *0.65),
            new Bug(this.game, "BUG5_MOVING", this.game.width*.65, this.game.height *0.65)
        ];

        var style2 = {font: "40px Swanky and Moo Moo", fill: "#ff0000", textAlign: "left"};
        var nam1 = "Andi Goldi";
        this.game.add.text(this.game.width*.15, this.game.height  *0.50, nam1, style2);
        var nam2= "Marcel Hirschi";
        this.game.add.text(this.game.width*.41, this.game.height  *0.50, nam2, style2);
        var nam3 = "Raini Schöni";
        this.game.add.text(this.game.width*.72, this.game.height  *0.50, nam3, style2);
        var nam4 = "Marlies Schildi";
        this.game.add.text(this.game.width*.25, this.game.height  *0.75, nam4, style2);
        var nam5 = "Flashi ???";
        this.game.add.text(this.game.width*.58, this.game.height  *0.75, nam5, style2);


        //first two bugs are choosen
        this.choosen = [false, false, false, false];


        for (var i = 0; i < this.bugs.length; i++) {

            // add bug
            this.bugs[i].scale.x = 0.3;
            this.bugs[i].scale.y = 0.3;
            this.bugs[i].anchor.setTo(.5,.5);          this.game.add.existing(this.bugs[i]); // add bug to scene
            this.bugs[i].inputEnabled = true;

        }


        this.bugs[0].events.onInputDown.add(function () {this.BugClick(0)},this);
        this.bugs[1].events.onInputDown.add(function () {this.BugClick(1)},this);
        this.bugs[2].events.onInputDown.add(function () {this.BugClick(2)},this);
        this.bugs[3].events.onInputDown.add(function () {this.BugClick(3)},this);
        this.bugs[4].events.onInputDown.add(function () {this.BugClick(4)},this);

    }


    BugClick(index) {
        if (!this.choosen[index]) {
            this.bugs[index].Animate();
        }
        else {
            this.bugs[index].animations.stop(null, true);
        }
        this.choosen[index] = !this.choosen[index];
    }

/*
    Bug1Click() {
        if (!this.choosen[1]) {
            this.bugs[1].Animate();
        }
        else {
            this.bugs[1].animations.stop(null, true);
        }
        this.choosen[1] = !this.choosen[1];
    }

    Bug2Click() {
        if (!this.choosen[2]) {
            this.bugs[2].Animate();
        }
        else {
            this.bugs[2].animations.stop(null, true);
        }
        this.choosen[2] = !this.choosen[2];
    }

    Bug3Click() {
        if (!this.choosen[3]) {
            this.bugs[3].Animate();
        }
        else {
            this.bugs[3].animations.stop(null, true);
        }
        this.choosen[3] = !this.choosen[3];
    }
    */

    update()
    {

    }


    buttonPressed() {

        var bugsSelected =0 ;
        var chosenAnimName = Array();
        this.squeaks[Math.floor(Math.random() * 2)].play();
        for (var i = 0; i < this.choosen.length; i++) {
            if (this.choosen[i]) {
                    chosenAnimName.push(this.bugs[i].getAnimName());
                bugsSelected++;
            }
        }

        if (bugsSelected < 2) {
            //this.fadeFadeText("Choose at least 2 bugs.");
            return;
        }

        this.sound.stopAll();

        this.game.state.states['GameScreenState'].setBugs(chosenAnimName);

        this.game.state.start("GameScreenState");

    }

}