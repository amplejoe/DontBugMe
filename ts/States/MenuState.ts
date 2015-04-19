/// <reference path="../../phaserLib/phaser.d.ts"/>
/// <reference path="../GameObjects/Bug.ts"/>


class MenuState extends Phaser.State {
    game:Phaser.Game;

    START_BUTTON:Phaser.Key;


    bugs:Array<Bug>;
    choosenBugs:Array<String>;
    choosen:Array <boolean>;

    s1:Phaser.Sound;
    squeaks: Array<Phaser.Sound>;

    create() {
        var line1 = "MENU";
        var style = {font: "48px Arial", fill: "#ff0000", textAlign: "center"};
        this.game.add.text(10, 10, line1, style);

        this.START_BUTTON = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.START_BUTTON.onDown.add(MenuState.prototype.buttonPressed, this);

        this.bugs = [

            new Bug(this.game, "BUG1_MOVING", 150, this.game.height - this.game.height / 4 * 3),
            new Bug(this.game, "BUG2_MOVING", 550, this.game.height - this.game.height / 4 * 3),
            new Bug(this.game, "BUG3_MOVING", 950, this.game.height - this.game.height / 4 * 3),
            new Bug(this.game, "BUG4_MOVING", 350, this.game.height - this.game.height / 2)
            //new Bug(this.game,"BUG5_MOVING", 750, this.game.height - this.game.height/2)

        ];
        for (var i = 0; i < this.bugs.length; i++) {

            // add bug
            this.bugs[i].scale.x = 0.3;
            this.bugs[i].scale.y = 0.3;
            this.game.add.existing(this.bugs[i]); // add bird to scene
        }
        for (var i = 0; i < this.bugs.length; i++) {
            this.bugs[i].inputEnabled = true;
            this.bugs[i].input.start(1, true);
        }

        this.s1 = this.game.add.audio('menunew');
        this.s1.play(null, null, 1, true);
        this.squeaks = [
            this.game.add.audio('squeak'),
            this.game.add.audio('squeak2')
        ]

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
        this.squeaks[Math.floor(Math.random()* 2)].play(null, null, 1, false);
        this.game.state.start("GameScreenState");
    }

}