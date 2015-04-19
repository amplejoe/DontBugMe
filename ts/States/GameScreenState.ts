/// <reference path="../../phaserLib/phaser.d.ts"/>
/// <reference path="../GameObjects/Bug.ts"/>
class GameScreenState extends Phaser.State {

    game:Phaser.Game;

    // background
    bgTile0: Phaser.TileSprite;

    // rnd keys
    allKeys: Array<number>;
    currentlySetKeys: Array<number>;

    // countdown
    preGameCountDown: number;
    preGameCountDownMax: number;
    cdStartTime: number;
    cdText: Phaser.Text;
    fadedGo: boolean;

    // bug related vars
    bugs: Array<Bug>;
    bugsTexts: Array<Phaser.Text>;
    bugsInited: boolean;
    bugsIngame: number;
    bugNames: Array<string>;
    bugsAreRunning: boolean;

    // game timing & difficulty
    gameStartTime: number;
    adjustInterval: number;
    prevAdjustmentTime: number;

    // button assignment
    currentButtonDurationTime: number;
    buttonDurationTimeMax: number;
    buttonDurationTimeMin: number;
    prevButtonAssigmentTime: number;

    tileSpeed: number;
    gravity: number;
    boostVelocity: number;
    isFirstBoost: boolean;

    // audio
    music: Array<Phaser.Sound>;
    currentMusicPlaying: Phaser.Sound;
    squeaks: Array<Phaser.Sound>;
    sEnd: Array<Phaser.Sound>;
    sStart: Phaser.Sound;

    // ambience sprites
    shrubbery: Array<string>;
    shrubTimerMax: number;
    shrubTimerMin: number;
    shrubTimerCreateTime: number;
    shrubSpawnTimer: number;
    twig: Phaser.Sprite;

    create()
    {
        this.bugsInited = false;
        this.fadedGo = false;
        this.isFirstBoost = true;


        this.bgTile0 = this.game.add.tileSprite(0, 0, this.game.stage.width, this.game.cache.getImage('bg').height, 'bg');

        this.initPreGameCountDown();

        this.initRndLetters();

        this.initSounds();

        this.initAmbientSprites();

        // start game timing, tilespeed etc.
        this.initGameTiming();

        this.initBugs();

        this.sStart.play(null, null, 1, false); // countdown sound

    }

    startRunning()
    {
        if (!this.bugsAreRunning)
        {

            for (var i=0;i<this.bugs.length;i++)
            {
                // animations
                this.bugs[i].Animate();
            }

            this.gravity = 150;

            this.game.physics.arcade.gravity.y = this.gravity;
            // play initial music
            this.playRndLoops();

            // fadeout go!
            this.prevAdjustmentTime = this.game.time.time;

            this.tweenSpriteDown(this.twig);

            this.bugsAreRunning = true;
        }
    }

    initAmbientSprites()
    {
        this.shrubbery = [
            'leaves1',
            'leaves2',
            'leaves3'
        ];

        this.shrubTimerMax = 3;
        this.shrubTimerMin = 0.8;
        this.shrubTimerCreateTime = -1;
        this.shrubSpawnTimer = 2.3;

    }

    initGameTiming()
    {
        // overall game time
        this.gameStartTime = this.game.time.time;
        this.prevAdjustmentTime = this.gameStartTime;
        this.adjustInterval = 10;

        // bug speed and tiles
        this.boostVelocity = -170;
        this.gravity = 0;
        this.tileSpeed = 1;

        // buttonAssignment speed
        this.buttonDurationTimeMax = 5;
        this.buttonDurationTimeMin = 0.5;
        this.currentButtonDurationTime = -1;
    }

    initSounds()
    {

        this.music = [
            this.game.add.audio('loopwbeat'),
            this.game.add.audio('loopwdoing'),
            this.game.add.audio('loopwdoingalowpass'),
            this.game.add.audio('loopwdoingaresonance')
        ];

        this.squeaks = [
            this.game.add.audio('squeak'),
            this.game.add.audio('squeak2')
        ];

        this.sEnd = [
            this.game.add.audio('end'),
            this.game.add.audio('end_combined')
        ];
        this.sStart = this.game.add.audio('startrace');
        this.currentMusicPlaying = null;
    }

    initPreGameCountDown()
    {
        this.preGameCountDownMax = this.preGameCountDown = 3;

        this.cdStartTime = this.game.time.time;
        //countdown format + position
        this.cdText = this.game.add.text(this.game.world.centerX-70, this.game.world.centerY-130, '5', { font: "80px Swanky and Moo Moo", fill: "#ff0000", align: "center" });
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

    }

    initBugs()
    {
        // start physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = this.gravity;

        // twig
        this.twig = this.game.add.sprite(this.game.width/2, this.game.height/2, "twig");
        this.twig.anchor.setTo(1, .5);
        this.twig.scale.x = -0.4;
        this.twig.scale.y = -0.4;
        this.twig.x -= 350;
        this.twig.y -= 10;

        // create bugs
        if (this.bugNames.length < 2) return;

        this.bugsIngame = this.bugNames.length;
        this.bugs = Array(this.bugNames.length);


        //console.log("bugs in game"+this.bugsIngame);

        this.bugsTexts = Array(this.bugsIngame);
        this.currentlySetKeys = Array(this.bugsIngame);

        // add bugs and physics and animations
        var startX = 0.2;
        for (var i=0;i<this.bugs.length;i++)
        {
            this.bugs[i] = new Bug(this.game,this.bugNames[i], this.game.width * startX, this.game.height * 0.52);
            startX += 0.15;

            // add bug
            this.bugs[i].scale.x = 0.3;
            this.bugs[i].scale.y = 0.3;
            this.game.add.existing(this.bugs[i]); // add bird to scene


            // physics
            this.game.physics.enable(this.bugs[i], Phaser.Physics.ARCADE);
            this.bugs[i].body.collideWorldBounds = false;
            this.bugs[i].body.bounce.set(0.4);


            this.bugsTexts[i] = this.game.add.text(this.bugs[i].x+40, 40,'', { font: "80px Swanky and Moo Moo", fill: "#ff0000", align: "center"});

        }


        this.assignAndRemoveLetters();

        this.bugsInited = true;
        this.bugsAreRunning = false;

    }

    tweenSpriteDown(sprite: Phaser.Sprite)
    {
        this.game.add.tween(sprite).to({ y: this.game.height+700}, 5800 - this.tileSpeed*100 , Phaser.Easing.Linear.None, true);

    }

    playRndLoops()
    {
        var music = this.music[Math.floor(Math.random()* 2)];
        this.switchMusic(music);
    }

    playRndFilters()
    {
        var music = this.music[Math.floor(Math.random()* 3-2+1)+2];
        this.switchMusic(music);
    }

    switchMusic(music: Phaser.Sound)
    {
        for (var i=0;i<this.music.length;i++)
        {
            if (this.music[i].isPlaying)
            {
                if (music.name !== this.music[i].name)
                {
                    this.currentMusicPlaying = music;
                }
                return;
            }
        }

        // no music playing -> just start music
        music.play(null, null, 1, true);
        this.currentMusicPlaying = music;
    }

    stopMusic()
    {
        var musicPlaying = this.getCurrentMusicPlaying();

        if (musicPlaying == null) return;

        musicPlaying.stop();
    }

    getCurrentMusicPlaying()
    {
        for (var i=0;i<this.music.length;i++) {
            if (this.music[i].isPlaying) return this.music[i];
        }

        return null;

    }

    createShrubberyLeft()
    {
        var elapsedSecs = this.game.time.elapsedSecondsSince(this.shrubTimerCreateTime);

        if (elapsedSecs >= this.shrubSpawnTimer)
        {
            var shrubName = this.shrubbery[Math.floor(Math.random()* 3)];
            var shrub = this.game.add.sprite(0, 0-700, shrubName);
            shrub.scale.x = 0.4;
            shrub.scale.y = 0.4;

            this.tweenSpriteDown(shrub);
            //this.game.add.tween(shrub).to({ y: this.game.height}, 2000 - (this.tileSpeed*100), Phaser.Easing.Linear.None, true);

            this.shrubTimerCreateTime = this.game.time.time;

            this.shrubSpawnTimer = Math.round(Math.random()*(this.shrubTimerMax-this.shrubTimerMin)) + this.shrubTimerMin;
        }


    }

    createShrubberyRight()
    {
        var elapsedSecs = this.game.time.elapsedSecondsSince(this.shrubTimerCreateTime);

        if (elapsedSecs >= this.shrubSpawnTimer)
        {
            var shrubName = this.shrubbery[Math.floor(Math.random()* 3)];
            var shrub = this.game.add.sprite(this.game.width, 0-700, shrubName);
            shrub.anchor.setTo(.5, 1); //so it flips around its middle
            shrub.scale.x = -0.4;
            shrub.scale.y = -0.4;
            shrub.x += shrub.width/2;

            this.tweenSpriteDown(shrub);
            //this.game.add.tween(shrub).to({ y: this.game.height}, 5800 - (this.tileSpeed*100), Phaser.Easing.Linear.None, true);

            this.shrubTimerCreateTime = this.game.time.time;

            this.shrubSpawnTimer = Math.round(Math.random()*(this.shrubTimerMax-this.shrubTimerMin)) + this.shrubTimerMin;
        }


    }

    updateCounter(){
       var elapsedSecs = this.toInt(this.game.time.elapsedSecondsSince(this.cdStartTime));
       this.preGameCountDown=this.preGameCountDownMax-elapsedSecs;
    }

    checkInitialKeysPressed()
    {
        var buttonsPressed = 0;
        for (var i=0;i<this.bugs.length;i++)
        {
            var key: Phaser.Key;
            key = this.bugs[i].getCurrentKey();
            if (key != null) this.bugsTexts[i].setText(""+this.keyValToString(key.keyCode));
            if(key != null && key.isDown)
            {
                buttonsPressed++;
            }
        }

        //console.log("buttonpressed: "+buttonsPressed);

        if (buttonsPressed == this.bugs.length) this.startRunning();

    }

    update() {

        if (this.isCountingDown()) return;

        if (!this.fadedGo) {
            this.game.time.events.add(2000, function() {
                //this.game.add.tween(this.cdText).to({x: 4000}, 100, Phaser.Easing.Linear.None, true);
                //this.game.add.tween(this.cdText).to({scale: 5.0}, 800, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.cdText).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
            }, this);
            this.fadedGo = true;
        }

        if (!this.bugsAreRunning) {
            this.checkInitialKeysPressed();
            return;
        }

        this.bgTile0.tilePosition.y += this.tileSpeed;

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
                    this.sEnd[0].play(null, null, 1, false);
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

            this.createRndShrubbery();

            this.adjustGameDifficulty();

            this.checkMusic();

            this.handleButtons(i);

        }

        if (this.isFirstBoost)
        {
            this.isFirstBoost = false;

        }

        this.UpdateRndBtns();

    }

    createRndShrubbery()
    {

        var coin = Math.floor(Math.random()* 2);

        if (coin > 0)  this.createShrubberyLeft();
        else this.createShrubberyRight();

    }


    checkMusic()
    {

        if (this.currentMusicPlaying == null) return;

        var musicPlaying = this.getCurrentMusicPlaying();

        if (musicPlaying == null) return;

        if (this.currentMusicPlaying.name != musicPlaying.name)
        {
            var duration = Math.floor(musicPlaying.durationMS);

            //console.log("should switch - dur: "+duration+" pos: "+musicPlaying.currentTime);

            if (musicPlaying.currentTime > (duration-100)) this.currentMusicPlaying.play(null, null, 1, true);
            else return;

            musicPlaying.stop();

        }
    }

    adjustGameDifficulty()
    {

        // check elapses secs since game start
        var elapsedSecs = this.toInt(this.game.time.elapsedSecondsSince(this.prevAdjustmentTime));

        // adjust difficulty every 10 secs
        if (elapsedSecs >= this.adjustInterval)
        {
            // bug speed, tilespeed & gravity
            if (this.boostVelocity > 40) this.boostVelocity -= 20;
            if (this.tileSpeed < 20) this.tileSpeed++;
            if (this.gravity < 400) {
                this.gravity += 20;
                this.game.physics.arcade.gravity.y = this.gravity;
            }

            // lower button time
            if (this.buttonDurationTimeMax > this.buttonDurationTimeMin) this.buttonDurationTimeMax--;

            // set prev adjustment time to now
            this.prevAdjustmentTime = this.game.time.time;

            // change music
            var rnd = Math.floor(Math.random()* 2); // rnd number 0 or 1
            if (rnd == 0)
            {
                this.playRndFilters();
            }
            else
            {
                this.playRndLoops();
            }

        }

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
        this.sEnd[1].play(null, null, 1, false);
        var timePlayed = this.getFormattedTimeSince(this.gameStartTime);
        this.stopMusic();
        this.game.state.states['GameOverScreenState'].setTimePlayed(timePlayed);
        this.game.state.states['GameOverScreenState'].setWinner(winnerString);
        this.game.state.start("GameOverScreenState");
    }

    boostBug(index: number)
    {
        //console.log(bugIndex);
        if (this.isFirstBoost)
        {
            this.bugs[index].body.velocity.setTo(0, -270);
            return;
        }
        this.bugs[index].body.velocity.setTo(0, this.boostVelocity);
    }

    isCountingDown()
    {
        if (this.preGameCountDown > 0) {
            this.updateCounter();
            this.cdText.setText(""+this.preGameCountDown);
            return true;
        }

        if (!this.bugsAreRunning) {

            if (this.cdText.x < this.game.width+500)
            {
                this.cdText.x += 15;
                this.cdText.setText("GO!");
            }
        }


        return false;
    }

    setBugs(bugNames: Array<string>)
    {
        this.bugNames = bugNames;
    }

    getRandomLetter(){
        var tempo = this.allKeys[Math.floor(Math.random()*this.allKeys.length)]; //this.alphabet.indexOf(,Math.round(Math.random()*this.alphabet.length));
        //console.log("Random letter: "+ tempo);
        return tempo;
    }

    UpdateRndBtns(){
        var elapsedSecs = this.toInt(this.game.time.elapsedSecondsSince(this.prevButtonAssigmentTime));

        if (elapsedSecs >= this.currentButtonDurationTime){

            this.assignAndRemoveLetters();

            //console.log("set bug "+bugNr);
            //this.Time = Math.round(Math.random()*this.MaxTime)+2;
            this.currentButtonDurationTime = Math.round(Math.random()*(this.buttonDurationTimeMax-this.buttonDurationTimeMin)) + this.buttonDurationTimeMin;
            this.prevButtonAssigmentTime = this.game.time.time;

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

    getFormattedTimeSince(time: number)
    {
        var elapsedSeconds = this.toInt(this.game.time.elapsedSecondsSince(time));

        var elapsedHours = this.toInt(elapsedSeconds / (60 * 60));
        if (elapsedHours > 0)
        {
            elapsedSeconds -= elapsedHours * 60 * 60;
        }
        var elapsedMinutes =  this.toInt(elapsedSeconds / 60);
        if (elapsedMinutes > 0)
        {
            elapsedSeconds -= elapsedMinutes * 60;
        }

        // add 0s for non double digit values
        var retTime = (elapsedHours > 9? "" : "0") + elapsedHours + ":" +
        (elapsedMinutes > 9? "" : "0") + elapsedMinutes + ":" +
        (elapsedSeconds > 9? "" : "0") + elapsedSeconds;

       return retTime;
    }


}
