/// <reference path="../../phaserLib/phaser.d.ts"/>
/// <reference path="../GameObjects/Bug.ts"/>
class TestState extends Phaser.State {
    game:Phaser.Game;

    bugs: Array<Bug>;

    create() {

        var line1 = "Test State";
        var style = { font: "48px Arial", fill: "#ff0000", textAlign: "center"};
        this.game.add.text(10, 10, line1, style);

        // start physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 200;

        // add bugs
        var numBugs = 3;
        this.bugs = [

            new Bug(this.game,"BUG1_MOVING", 0, this.game.height - this.game.height/2),
            new Bug(this.game,"BUG2_MOVING", 400, this.game.height - this.game.height/2),
            new Bug(this.game,"BUG3_MOVING", 800, this.game.height - this.game.height/2)

        ];

        // add bugs and physics and animations
        for (var i=0;i<this.bugs.length;i++)
        {
            // add bug
            this.game.add.existing(this.bugs[i]); // add bird to scene

            // physics
            this.game.physics.enable(this.bugs[i], Phaser.Physics.ARCADE);
            this.bugs[i].body.collideWorldBounds = true;
            this.bugs[i].body.bounce.set(0.4);

            // animations
            this.bugs[i].Animate();
        }


    }

    update()
    {

    }
}
