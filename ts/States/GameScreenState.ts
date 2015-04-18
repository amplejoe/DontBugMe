/// <reference path="../../phaserLib/phaser.d.ts"/>
/// <reference path="../GameObjects/Bug.ts"/>
class GameScreenState extends Phaser.State {
    game:Phaser.Game;

    bgTile0: Phaser.TileSprite;

    A_BTN: Phaser.Key;
    B_BTN: Phaser.Key;
    C_BTN: Phaser.Key;
    D_BTN: Phaser.Key;

    countdown: number;
    countdownMax: number;
    startTime: number;
    text;
    text2;
    elapsedSeconds:number;

    alphabet: Array<String>;

    // var  set new btn
    MaxTime:number;
    Time:number;
    LastTime:number;
    playerBtn: String;


    bugs: Array<Bug>;
    controlKeyNumbers: Array<number>;
    controlKeys: Array<Phaser.Key>;
    bugsInited: boolean;


    create()
    {
        this.bugsInited = false;
        this.bgTile0 = this.game.add.tileSprite(0, 0, this.game.stage.width, this.game.cache.getImage('bg').height, 'bg');


        this.initCountDown();


        this.initRndLetters();


    }

    initCountDown()
    {
        this.countdownMax =this.countdown = 5;

        this.startTime = this.game.time.time;
        //countdown format + position
        this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, '5', { font: "80px Arial", fill: "#ff0000", align: "center" });
        //this.text.anchor.setTo(0.5, 0.5);
    }

    initBugs()
    {
        // start physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 200;

        // create bugs
        var numBugs = 4;
        this.bugs = [

            new Bug(this.game,"BUG1_MOVING", 0, this.game.height - this.game.height/2),
            new Bug(this.game,"BUG2_MOVING", 300, this.game.height - this.game.height/2),
            new Bug(this.game,"BUG3_MOVING", 600, this.game.height - this.game.height/2),
            new Bug(this.game,"BUG4_MOVING", 800, this.game.height - this.game.height/2)

        ];

        // create keys
        var numControlKeys = numBugs;
        this.controlKeyNumbers = [
            Phaser.Keyboard.Q,
            Phaser.Keyboard.W,
            Phaser.Keyboard.E,
            Phaser.Keyboard.R
        ];

        this.controlKeys = Array(3);

        var button;

        // add bugs and physics and animations
        for (var i=0;i<this.bugs.length;i++)
        {

            // add bug
            this.bugs[i].scale.x = 0.3;
            this.bugs[i].scale.y = 0.3;
            this.game.add.existing(this.bugs[i]); // add bird to scene

            // physics
            this.game.physics.enable(this.bugs[i], Phaser.Physics.ARCADE);
            this.bugs[i].body.collideWorldBounds = true;
            this.bugs[i].body.bounce.set(0.4);

            // animations
            this.bugs[i].Animate();

            // keys
            this.controlKeys[i] = this.game.input.keyboard.addKey(this.controlKeyNumbers[i]);
            this.bugs[i].setCurrentKey(this.controlKeys[i]);

            //var index = this.bugs[i].getIndex();
            //this.controlKeys[i].onDown.add(this.bugs[i].boostBug, this);

        }

        this.bugsInited = true;
    }

    initRndLetters()
    {
        this.alphabet= ["A", "B", "C", "D"];
        this.playerBtn = this.getRandomLetter();


        this.MaxTime= 5;
        this.LastTime = this.game.time.time;
        this.Time = Math.round(Math.random()*this.MaxTime)+5;
        console.log("time :"+this.Time);
    }

    UpdateRndBtn(){
        this.elapsedSeconds = this.toInt(this.game.time.elapsedSecondsSince(this.LastTime));
        var temp = this.Time-this.elapsedSeconds;
        if (temp<= 0){
            this.playerBtn= this.getRandomLetter();
            this.Time = Math.round(Math.random()*this.MaxTime)+5;
            this.LastTime = this.game.time.time;
            console.log("time :"+this.  Time +"  playerBnt " +this.playerBtn);
        }
    }
    updateCounter(){
       this.elapsedSeconds = this.toInt(this.game.time.elapsedSecondsSince(this.startTime));
       this.countdown=this.countdownMax-this.elapsedSeconds;
    }

    update() {

        if (!this.isCountingDown()) return;

        this.text.setText("");

        this.bgTile0.tilePosition.y += 1;
        this.UpdateRndBtn();


        // check key press
        for (var i=0;i<this.bugs.length;i++)
        {
            var key: Phaser.Key;
            key = this.bugs[i].getCurrentKey();
            if(key != null && key.isDown)
            {
                this.boostBug(i);
            }
        }

    }

    boostBug(index: number)
    {
        //console.log(bugIndex);
        this.bugs[index].body.velocity.setTo(0, -120);
    }

    isCountingDown()
    {
        if (this.countdown > 0) {
            this.updateCounter();
            console.log("Countdown: " + this.countdown);
            this.text.setText(this.countdown);
            return false;
        }
        else if (this.countdown == 0){
            this.updateCounter();
            this.text.setText("GO!");
            if (!this.bugsInited) this.initBugs();
            return false
        }

        return true;
    }


    toInt(value) { return ~~value; }

    getRandomLetter(){
        var tempo = this.alphabet[Math.floor(Math.random()*this.alphabet.length)]; //this.alphabet.indexOf(,Math.round(Math.random()*this.alphabet.length));
        console.log("Random letter: "+ tempo);
        return tempo;
    }
}
