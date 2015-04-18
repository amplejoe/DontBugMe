/// <reference path="../../phaserLib/phaser.d.ts"/>
/// <reference path="../GameObjects/Bug.ts"/>

class TestState extends Phaser.State {
    game:Phaser.Game;

    bugs: Array<Bug>;
    controlKeyNumbers: Array<number>;
    controlKeys: Array<Phaser.Key>;

    bgTile0: Phaser.TileSprite;


    create() {

        this.bgTile0 = this.game.add.tileSprite(0, 0, this.game.stage.width, this.game.cache.getImage('bg').height, 'bg');

        var line1 = "Test State";
        var style = { font: "48px Arial", fill: "#ff0000", textAlign: "center"};
        this.game.add.text(10, 10, line1, style);

        // start physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 200;

        // create bugs
        var numBugs = 3;
        this.bugs = [

            new Bug(this.game,"BUG1_MOVING", 0, this.game.height - this.game.height/2, 0),
            new Bug(this.game,"BUG2_MOVING", 400, this.game.height - this.game.height/2, 1),
            new Bug(this.game,"BUG3_MOVING", 800, this.game.height - this.game.height/2, 2)

        ];

        // create keys
        var numControlKeys = numBugs;
        this.controlKeyNumbers = [
            Phaser.Keyboard.Q,
            Phaser.Keyboard.W,
            Phaser.Keyboard.E
        ];

        this.controlKeys = Array(3);

        var button;

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

            // keys
            this.controlKeys[i] = this.game.input.keyboard.addKey(this.controlKeyNumbers[i]);
            var index = this.bugs[i].getIndex();
            console.log("index before" + index);
            this.controlKeys[i].onDown.add(() =>  {
                switch(index)
                {
                    case 0:
                        this.boostBug(0);
                    break;
                    case 1:
                        this.boostBug(1);
                    break;
                    case 2:
                        this.boostBug(2);
                    default:
                    break;
                }

            });

        }


    }

    boostBug(bugIndex: number)
    {
        console.log(bugIndex);
        this.bugs[bugIndex].body.velocity.setTo(0, -70);
    }



    update()
    {
        this.bgTile0.tilePosition.y += 1;
    }
}
