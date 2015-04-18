/// <reference path="../../phaserLib/phaser.d.ts"/>
/// <reference path="../GameObjects/Bug.ts"/>
class GameScreenState extends Phaser.State {
    game:Phaser.Game;

    bgTile0: Phaser.TileSprite;

    allKeys: Array<number>;
    currentlySetKeys: Array<number>;

    countdown: number;
    startTime: number;
    countdownMax: number;
    elapsedSeconds:number;
    text;

    alphabet: Array<String>;

    bugs: Array<Bug>;
    bugsTexts: Array<Phaser.Text>;
    bugsInited: boolean;

    // var  set new btn
    MaxTime:number;
    Time: number;
    LastTime: number;

    bugsIngame: number;

    bugNames: Array<string>;

    create()
    {
        this.bugsInited = false;

        this.bugsIngame = 4;
        this.bugsTexts = Array(this.bugsIngame);

        this.currentlySetKeys = Array(this.bugsIngame);


        this.bgTile0 = this.game.add.tileSprite(0, 0, this.game.stage.width, this.game.cache.getImage('bg').height, 'bg');

        this.initCountDown();

        this.initRndLetters();

    }

    initCountDown()
    {
        this.countdownMax = this.countdown = 5;

        this.startTime = this.game.time.time;
        //countdown format + position
        this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, '5', { font: "80px Arial", fill: "#ff0000", align: "center" });
        //this.text.anchor.setTo(0.5, 0.5);
    }

    initRndLetters()
    {
        this.allKeys = [Phaser.Keyboard.Q, Phaser.Keyboard.W, Phaser.Keyboard.E, Phaser.Keyboard.R,
                        Phaser.Keyboard.T, Phaser.Keyboard.Z, Phaser.Keyboard.U, Phaser.Keyboard.I,
                        Phaser.Keyboard.Q, Phaser.Keyboard.W, Phaser.Keyboard.E, Phaser.Keyboard.R,
                        Phaser.Keyboard.O, Phaser.Keyboard.P, Phaser.Keyboard.A, Phaser.Keyboard.S,
                        Phaser.Keyboard.D, Phaser.Keyboard.F, Phaser.Keyboard.G, Phaser.Keyboard.H,
                        Phaser.Keyboard.J, Phaser.Keyboard.K, Phaser.Keyboard.L, Phaser.Keyboard.Y,
                        Phaser.Keyboard.X, Phaser.Keyboard.C, Phaser.Keyboard.V, Phaser.Keyboard.B,
                        Phaser.Keyboard.N, Phaser.Keyboard.M
        ];

        this.MaxTime= 1;
        this.LastTime = this.game.time.time;
        this.Time = Math.round(Math.random()*this.MaxTime)+5;


        //console.log("time :"+this.Time);
    }

    initBugs()
    {
        // start physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 150;

        // create bugs
        this.bugNames = [
            "BUG1_MOVING",
            "BUG2_MOVING",
            "BUG3_MOVING",
            "BUG4_MOVING"
        ]
        this.bugs = [

            new Bug(this.game,this.bugNames[0], this.game.width * 0.15, this.game.height - this.game.height/2),
            new Bug(this.game,this.bugNames[1], this.game.width * 0.3, this.game.height - this.game.height/2),
            new Bug(this.game,this.bugNames[2], this.game.width * 0.45, this.game.height - this.game.height/2),
            new Bug(this.game,this.bugNames[3], this.game.width * 0.60, this.game.height - this.game.height/2)

        ];


        // add bugs and physics and animations
        for (var i=0;i<this.bugs.length;i++)
        {

            // add bug
            this.bugs[i].scale.x = 0.3;
            this.bugs[i].scale.y = 0.3;
            this.game.add.existing(this.bugs[i]); // add bird to scene


            // physics
            this.game.physics.enable(this.bugs[i], Phaser.Physics.ARCADE);
            this.bugs[i].body.collideWorldBounds = false;
            this.bugs[i].body.bounce.set(0.4);

            // animations
            this.bugs[i].Animate();

            this.bugsTexts[i] = this.game.add.text(this.bugs[i].x, 50,'', { font: "80px Arial", fill: "#ff0000", align: "center"});

            // keys
            //this.controlKeys[i] = this.game.input.keyboard.addKey(this.controlKeyNumbers[i]);
            //this.bugs[i].setCurrentKey(this.controlKeys[i]);

            //var index = this.bugs[i].getIndex();
            //this.controlKeys[i].onDown.add(this.bugs[i].boostBug, this);

        }

        this.bugsInited = true;
    }


    updateCounter(){
       this.elapsedSeconds = this.toInt(this.game.time.elapsedSecondsSince(this.startTime));
       this.countdown=this.countdownMax-this.elapsedSeconds;
    }

    update() {

        if (this.isCountingDown()) return;

        this.text.setText("");

        this.bgTile0.tilePosition.y += 1;


        //console.log("check"+i);



        // check key press and deaths
        for (var i=0;i<this.bugs.length;i++)
        {

            if (this.bugs[i] != null)
            {
                if (this.bugs[i].y >= this.game.height)
                {
                    // remove old key
                    if (this.bugs[i].getCurrentKey() != null)
                    {
                        var keyCode = this.bugs[i].getCurrentKey().keyCode;
                        this.game.input.keyboard.removeKey(keyCode);
                    }
                    this.bugs[i] = null;
                    this.bugsIngame--;

                }
                else if (this.bugs[i].y <= 50)
                {
                    this.bugs[i].y = 50;
                    this.bugs[i].body.velocity.setTo(0, +30);
                }
            }

            this.handleWin();

            this.handleButtons(i);
        }

        this.UpdateRndBtns();

    }

    handleButtons(bugindex: number)
    {
        if (this.bugs[bugindex] == null) {
            this.bugsTexts[bugindex].setText(":(");
            return;
        }

        var key: Phaser.Key;
        key = this.bugs[bugindex].getCurrentKey();
        if (key != null) this.bugsTexts[bugindex].setText(""+this.keyValToString(key.keyCode));
        if(key != null && key.isDown)
        {
            this.boostBug(bugindex);
        }

    }


    handleWin()
    {

        if (this.bugsIngame > 1) return;

        var winnerString: string;

        winnerString = "";
        if (this.bugsIngame == 1)
        {

            for (var i=0;i<this.bugs.length;i++)
            {
                if (this.bugs[i] != null) {
                    winnerString = this.bugNames[i];
                    break;
                }
            }

        }
        this.game.state.states['GameOverScreenState'].setWinner(winnerString);
        this.game.state.start("GameOverScreenState");
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
            //console.log("Countdown: " + this.countdown);
            this.text.setText(this.countdown);
            return true;
        }
        else if (this.countdown == 0){
            this.updateCounter();
            this.text.setText("GO!");
            if (!this.bugsInited) this.initBugs();
            this.assignAndRemoveLetters();
            return true;
        }

        return false;
    }

    getRandomLetter(){
        var tempo = this.allKeys[Math.floor(Math.random()*this.allKeys.length)]; //this.alphabet.indexOf(,Math.round(Math.random()*this.alphabet.length));
        //console.log("Random letter: "+ tempo);
        return tempo;
    }

    UpdateRndBtns(){
        this.elapsedSeconds = this.toInt(this.game.time.elapsedSecondsSince(this.LastTime));
        var temp = this.Time-this.elapsedSeconds;

        if (temp <= 0){


            this.assignAndRemoveLetters();

            //console.log("set bug "+bugNr);
            this.Time = Math.round(Math.random()*this.MaxTime)+2;
            this.LastTime = this.game.time.time;

        }
    }

    assignAndRemoveLetters()
    {
        var keyVal;
        for(var i=0; i<this.bugs.length;i++)
        {

            if (this.bugs[i] != null)
            {
                keyVal = this.getRandomLetter();
                while (this.currentlySetKeys.indexOf(keyVal) > -1) keyVal = this.getRandomLetter();

                this.currentlySetKeys[i] = keyVal;

                // remove old
                if (this.bugs[i].getCurrentKey() != null)
                {
                    var keyCode = this.bugs[i].getCurrentKey().keyCode;
                    this.game.input.keyboard.removeKey(keyCode);
                }

                // add
                var key =  this.game.input.keyboard.addKey(keyVal);
                this.bugs[i].setCurrentKey(key);
            }
        }
    }


    toInt(value) { return ~~value; }

    keyValToString(key: number)
    {
        var value = String.fromCharCode(key);
        return value;
    }


}
