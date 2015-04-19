/// <reference path="../../phaserLib/phaser.d.ts"/>
/// <reference path="../GameObjects/Bug.ts"/>


class MenuState extends Phaser.State {
    game:Phaser.Game;

    START_BUTTON:Phaser.Key;

    bg:Phaser.TileSprite;

    bugs:Array<Bug>;
    choosen:Array <boolean>;

    s1:Phaser.Sound;
    squeaks:Array<Phaser.Sound>;

    userInfo: Phaser.Text;

    create() {

        this.bg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "bg");

        var line1 = "Pick at least 2 Bugs!";
        var style = {font: "48px Arial", fill: "#ff0000", textAlign: "center"};
        this.game.add.text(this.game.width / 2 - 100, 10, line1, style);

        this.userInfo = this.game.add.text(this.game.width / 2 - 100, 10, "", style);



        this.START_BUTTON = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.START_BUTTON.onDown.add(MenuState.prototype.buttonPressed, this);

        this.bugs = [

            new Bug(this.game, "BUG1_MOVING", 150, this.game.height - this.game.height / 4 * 3),
            new Bug(this.game, "BUG2_MOVING", 550, this.game.height - this.game.height / 4 * 3),
            new Bug(this.game, "BUG3_MOVING", 950, this.game.height - this.game.height / 4 * 3),
            new Bug(this.game, "BUG4_MOVING", 350, this.game.height - this.game.height / 2)
            //new Bug(this.game,"BUG5_MOVING", 750, this.game.height - this.game.height/2)

        ];

        //first two bugs are choosen
        this.choosen = [true, true, false, false];
        this.bugs[0].Animate();
        this.bugs[1].Animate();

        for (var i = 0; i < this.bugs.length; i++) {

            // add bug
            this.bugs[i].scale.x = 0.3;
            this.bugs[i].scale.y = 0.3;
            this.game.add.existing(this.bugs[i]); // add bird to scene
            this.bugs[i].inputEnabled = true;


        }

        this.bugs[0].events.onInputDown.add(this.Bug0Click, this);
        this.bugs[1].events.onInputDown.add(this.Bug1Click, this);
        this.bugs[2].events.onInputDown.add(this.Bug2Click, this);
        this.bugs[3].events.onInputDown.add(this.Bug3Click, this);

        this.s1 = this.game.add.audio('menunew');
        this.s1.play(null, null, 1, true);
        this.squeaks = [
            this.game.add.audio('squeak'),
            this.game.add.audio('squeak2')
        ];

    }

    fadeFadeText(text: string)
    {
        this.userInfo.setText(text);
        this.game.add.tween(this.userInfo).to({ alpha: this.game.height+500}, 2300, Phaser.Easing.Linear.None, true);

    }

    Bug0Click() {
        if (!this.choosen[0]) {
            this.bugs[0].Animate();
        }
        else {
            this.bugs[0].animations.stop(null, true);
        }
        this.choosen[0] = !this.choosen[0];
    }


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

    update() {
        /*for(var i = 0; i<this.bugs.length;i++)
         {
         if(this.choosen[i] == false)
         {
         console.log("enter!");
         this.bugs[i].Animate();
         this.choosen[i] = true;
         }
         else if( this.choosen[i] == true)
         {
         console.log("enter2!");
         this.bugs[i].animations.stop();
         this.choosen[i] = false;
         }

         }*/
        if (this.s1.durationMS - this.s1.currentTime < 10) {
            //ohne console funkts nicht
            console.log("buh!");
            this.s1.restart(null, null);
        }
    }


    buttonPressed() {
        this.s1.stop();
        var bugsSelected =0 ;
        var chosenAnimName = Array();
        this.squeaks[Math.floor(Math.random() * 2)].play(null, null, 1, false);
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

        this.game.state.states['GameScreenState'].setBugs(chosenAnimName);

        this.game.state.start("GameScreenState");


    }

}