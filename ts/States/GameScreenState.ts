/// <reference path="../../phaserLib/phaser.d.ts"/>
/// <reference path="../GameObjects/Bug.ts"/>
/// <reference path="../Utils/GameSettings.ts"/>
/// <reference path="../Utils/Timer.ts"/>
/// <reference path="../Utils/IntervalTimer.ts"/>
/// <reference path="../Utils/RandomIntervalTimer.ts"/>
/// <reference path="../Utils/CountdownTimer.ts"/>
/// <reference path="../Utils/UtilFunctions.ts"/>
module States
{
    export class GameScreenState extends Phaser.State {

        game:Phaser.Game;

        // background
        bgTile0: Phaser.TileSprite;

        // rnd keys
        allKeys: Array<number>;
        currentlySetKeys: Array<number>;

        // texts, styles
        cdText: Phaser.Text;
        bugsTexts: Array<Phaser.Text>;
        userInfo: Phaser.Text;

        // bug related vars
        bugs: Array<Sprites.Bug>;
        initKeysPressed: Array<boolean>;
        bugsIngame: number;
        bugNames: Array<string>;

        // timers
        gameTimer: Utils.IntervalTimer;
        preGameCountDownTimer: Utils.CountdownTimer;
        initPhaseButtonReassignTimer: Utils.IntervalTimer;
        rndButtonAssignTimer: Utils.RandomIntervalTimer;

        // game difficulty attributes
        tileSpeed: number;
        gravity: number;
        boostVelocity: number;

        // audio
        music: Array<Phaser.Sound>;
        currentMusicPlaying: Phaser.Sound;
        squeaks: Array<Phaser.Sound>;
        sEnd: Array<Phaser.Sound>;
        sStart: Phaser.Sound;
        sBeep: Phaser.Sound;

        // ambience sprites
        shrubbery: Array<string>;
        shrubTimerMax: number;
        shrubTimerMin: number;
        shrubTimerCreateTime: number;
        shrubSpawnTimer: number;
        twig: Phaser.Sprite;

        // game settings
        gameStage: GameSettings.GameStages = GameSettings.GameStages.STAGE_NONE;
        gameMode: GameSettings.GameModes = GameSettings.GameModes.MODE_NONE;

        create()
        {

            // game settings
            this.setGameStage(GameSettings.GameStages.STAGE_INIT);
            this.setGameMode(GameSettings.GameModes.MODE_LAST_BUG_CRAWLING); //TODO: implement other modes

            // scrolling background
            this.bgTile0 = this.game.add.tileSprite(0, 0, this.game.stage.width, this.game.cache.getImage('bg_neu').height, 'bg_neu');

            this.initRndLetters();

            this.initTexts();

            this.initSounds();

            this.initAmbientSprites();

            // start game timing, tilespeed etc.
            this.initGameTiming();

            this.initBugs();

            this.setGameStage(GameSettings.GameStages.STAGE_READY);


        }

        startRunning()
        {
            if (this.gameStage == GameSettings.GameStages.STAGE_INITIAL_KEY_WAIT)
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
                //this.prevAdjustmentTime = this.game.time.time;

                this.tweenSpriteDown(this.twig);

                // init interval timers used in game
                this.assignAndRemoveLetters();
                this.gameTimer.reInit();
                this.rndButtonAssignTimer.reInit();

                // hide user info and stop infinite tween
                this.userInfo.setText('');
                this.game.tweens.removeFrom(this.userInfo);

                this.setGameStage(GameSettings.GameStages.STAGE_PLAYING);

            }
        }

        initAmbientSprites()
        {
            this.shrubbery = [
                'leaves1',
                'leaves2',
                'leaves3'
            ];

            this.shrubTimerMax = 1.5;
            this.shrubTimerMin = 0.4;
            this.shrubTimerCreateTime = -1;
            this.shrubSpawnTimer = 1.2;

        }

        initTexts()
        {
            //countdown text
            this.cdText = this.game.add.text(this.game.world.centerX-20, this.game.world.centerY-130, '', GameSettings.getTextStyle(GameSettings.TextStyles.STYLE_RED, 80));
            this.userInfo = this.game.add.text(this.game.world.centerX-260, this.game.world.centerY-200, '', GameSettings.getTextStyle(GameSettings.TextStyles.STYLE_RED, 80));
            this.userInfo.alpha = 0;
        }


        initGameTiming()
        {
            // overall game time
            this.gameTimer = new Utils.IntervalTimer(this.game, 10);

            // pre game countdown
            this.preGameCountDownTimer = new Utils.CountdownTimer(this.game, 2.5);

            // bug speed and tiles
            this.boostVelocity = -170;
            this.gravity = 0;
            this.tileSpeed = 1;

            // buttonAssignment speed
            this.rndButtonAssignTimer = new Utils.RandomIntervalTimer(this.game,7,0.5);

            // button reassign timer
            this.initPhaseButtonReassignTimer = new Utils.IntervalTimer(this.game, 10);

        }

        initSounds()
        {
            this.music = [
                this.game.add.audio('loopwbeat',1,true),
                this.game.add.audio('loopwdoing',1,true),
                this.game.add.audio('loopwdoingalowpass',1,true),
                this.game.add.audio('loopwdoingaresonance',1,true)
            ];

            this.squeaks = [
                this.game.add.audio('squeak',1,false),
                this.game.add.audio('squeak2',1,false)
            ];

            this.sEnd = [
                this.game.add.audio('end', 1, false),
                this.game.add.audio('end_combined',1,false)
            ];
            this.sStart = this.game.add.audio('startrace', 1, false);
            this.sBeep = this.game.add.audio('beep', 1, false);
            this.currentMusicPlaying = null;
        }


        initRndLetters()
        {
            this.allKeys = [Phaser.Keyboard.Q, Phaser.Keyboard.W, Phaser.Keyboard.E, Phaser.Keyboard.R,
                Phaser.Keyboard.T, Phaser.Keyboard.Z, Phaser.Keyboard.U, Phaser.Keyboard.I,
                Phaser.Keyboard.O, Phaser.Keyboard.P, Phaser.Keyboard.A, Phaser.Keyboard.S,
                Phaser.Keyboard.D, Phaser.Keyboard.F, Phaser.Keyboard.G, Phaser.Keyboard.H,
                Phaser.Keyboard.J, Phaser.Keyboard.K, Phaser.Keyboard.L, Phaser.Keyboard.Y,
                Phaser.Keyboard.X, Phaser.Keyboard.C, Phaser.Keyboard.V, Phaser.Keyboard.B,
                Phaser.Keyboard.N, Phaser.Keyboard.M
            ];

        }

        initBugs()
        {
            // physics
            this.game.physics.arcade.gravity.y = this.gravity;

            // twig
            this.twig = this.game.add.sprite(this.game.width*.09, this.game.height*.43, "twig");
            this.twig.anchor.setTo(0,0);
            this.twig.scale.x = 0.50;
            this.twig.scale.y = 0.50;

            // create bugs
            if (this.bugNames.length < 2) return;

            this.bugsIngame = this.bugNames.length;
            this.bugs = Array(this.bugNames.length);


            //console.log("bugs in game"+this.bugsIngame);

            this.bugsTexts = Array(this.bugsIngame);
            this.initKeysPressed = Array(this.bugsIngame);
            this.currentlySetKeys = Array(this.bugsIngame);

            // add bugs and physics and animations
            var startX = 0.08;
            for (var i=0;i<this.bugs.length;i++)
            {
                this.bugs[i] = new Sprites.Bug(this.game,this.bugNames[i], this.game.width * startX, this.game.height * 0.52);
                startX += 0.18;

                // add bug
                this.bugs[i].scale.x = 0.3;
                this.bugs[i].scale.y = 0.3;
                this.game.add.existing(this.bugs[i]); // add bird to scene


                // physics
                this.game.physics.enable(this.bugs[i], Phaser.Physics.ARCADE);
                this.bugs[i].body.collideWorldBounds = false;
                this.bugs[i].body.bounce.set(0.4);


                this.bugsTexts[i] = this.game.add.text(this.bugs[i].x+40, 40,'', GameSettings.getTextStyle(GameSettings.TextStyles.STYLE_RED,80));
                this.initKeysPressed[i] = false;
            }

            this.assignAndRemoveLetters();

            //this.bugsInited = true;
            //this.bugsAreRunning = false;

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

        stopMusic()
        {
            var musicPlaying = this.getCurrentMusicPlaying();

            if (musicPlaying == null) return;

            musicPlaying.stop();
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
            this.currentMusicPlaying = music;
            music.loop = true;
            music.play();
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

        checkInitialKeysPressed()
        {
            var buttonsPressed = 0;
            //TODO: Issue with keypressed -> not fixable: ghosting (see info)
            //console.log("Buttons to press:");
            for (var i=0;i<this.bugs.length;i++)
            {
                var key: Phaser.Key;
                key = this.bugs[i].getCurrentKey();
                //console.log(""+this.keyValToString(key.keyCode)+" ")
                this.setKeyButtonText(i, key);
                if(key != null && key.isDown)
                {
                    this.initKeysPressed[i] = true;
                    // removed exact button press (with 5 bugs its annoying when keyboard is limited)
                    //buttonsPressed++;
                }
            }

            for (var i=0;i<this.initKeysPressed.length; i++)
            {
                if (this.initKeysPressed[i] == true) buttonsPressed++;
            }

            //console.log("buttonpressed: "+buttonsPressed);

            // removed exact button press (with 5 bugs its annoying when keyboard is limited)
            if (buttonsPressed == this.bugs.length) this.startRunning();

            // switch keys after predefined interval (prevents game from hanging)
            if (this.initPhaseButtonReassignTimer.checkInterval())
            {
                this.assignAndRemoveLetters();
                // reset already pressed keys
                for (var i=0; i< this.initKeysPressed.length; i++) this.initKeysPressed[i] = false;
            }

        }

        setKeyButtonText(index: number, key: Phaser.Key)
        {

            if (key == null) return;

            // color text according to keypress
            if (key.isDown)
            {
                this.bugsTexts[index].setStyle(GameSettings.getTextStyle(GameSettings.TextStyles.STYLE_GREEN, 80));
            }
            else
            {
                // in initial phase let buttons remain green when pressed once
                if ((this.gameStage > GameSettings.GameStages.STAGE_INITIAL_KEY_WAIT) || !this.initKeysPressed[index])
                {
                    this.bugsTexts[index].setStyle(GameSettings.getTextStyle(GameSettings.TextStyles.STYLE_RED, 80));
                }

            }

            this.bugsTexts[index].setText(this.keyValToString(key.keyCode));
        }

        update() {

            switch (this.gameStage)
            {
                case GameSettings.GameStages.STAGE_READY:
                    this.sStart.play(); // countdown sound
                    this.setGameStage(GameSettings.GameStages.STAGE_COUNTDOWN); // move immediately to next stage (no break;!!)
                case GameSettings.GameStages.STAGE_COUNTDOWN:
                    this.doCountDown();
                    return;
                case GameSettings.GameStages.STAGE_INITIAL_KEY_WAIT:
                    this.checkInitialKeysPressed();
                    return;
                case GameSettings.GameStages.STAGE_PLAYING:
                    break; // move on with rest of update method;
                case GameSettings.GameStages.STAGE_INIT:
                case GameSettings.GameStages.STAGE_NONE:
                default: return;
            }

            this.bgTile0.tilePosition.y += this.tileSpeed;

            // check deaths and key presses
            for (var i=0;i<this.bugs.length;i++)
            {
                this.handleBugDeath(i);

                this.handleButtons(i); // boost bugs if right keys pressed
            }

            // checks game finish conditions
            this.handleWin();

            // creates shrubbery at rnd interval
            this.createRndShrubbery();

            // difficulty adjust and set flags (e.g. music change)
            this.adjustGameDifficulty();

            // checks whether flag is set for music change and handles transition
            this.checkMusic();

            // rnd button change
            this.UpdateRndBtns();

        }

        handleBugDeath(bugNr: number)
        {
            if (this.bugs[bugNr] != null)
            {
                // bug lost (top of bug is below screen)
                if (this.bugs[bugNr].y >= this.game.height)
                {
                    // remove old key
                    if (this.bugs[bugNr].getCurrentKey() != null)
                    {
                        var keyCode = this.bugs[bugNr].getCurrentKey().keyCode;
                        this.game.input.keyboard.removeKey(keyCode);
                    }
                    if (this.bugsIngame > 2) this.sEnd[0].play();
                    this.bugs[bugNr] = null;
                    this.bugsIngame--;

                }
                // bug almost touches ceiling (0) give push into other dir
                else if (this.bugs[bugNr].y <= 50)
                {
                    this.bugs[bugNr].y = 50;
                    this.bugs[bugNr].body.velocity.setTo(0, +30);
                }
            }
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

                if (musicPlaying.currentTime > (duration-100))
                {
                    this.currentMusicPlaying.play();
                    musicPlaying.stop();
                }
            }
        }

        adjustGameDifficulty()
        {

            // check elapses secs since game start
            //var elapsedSecs = this.toInt(this.game.time.elapsedSecondsSince(this.prevAdjustmentTime));

            // adjust difficulty every 10 secs
            if (this.gameTimer.checkInterval())
            {
                // bug speed, tilespeed & gravity
                if (this.boostVelocity > 40) this.boostVelocity -= 20;
                if (this.tileSpeed < 20) this.tileSpeed++;
                if (this.gravity < 400) {
                    this.gravity += 20;
                    this.game.physics.arcade.gravity.y = this.gravity;
                }

                // lower button time
                var rndAssignmentMax: number  = this.rndButtonAssignTimer.getMax();
                if (rndAssignmentMax > this.rndButtonAssignTimer.getMin()) this.rndButtonAssignTimer.setMax(rndAssignmentMax-1);
                //if (this.buttonDurationTimeMax > this.buttonDurationTimeMin) this.buttonDurationTimeMax--;

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
                this.bugsTexts[bugindex].setStyle(GameSettings.getTextStyle(GameSettings.TextStyles.STYLE_RED,80));
                this.bugsTexts[bugindex].setText(":(");
                return;
            }

            var key: Phaser.Key;
            key = this.bugs[bugindex].getCurrentKey();

            this.setKeyButtonText(bugindex, key);

            //if(key != null && key.isDown)
            //{
                this.bugs[bugindex].boost(this.boostVelocity);
            //}

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
            this.sEnd[1].play();
            var timePlayed: string = this.gameTimer.getFormattedTime();
            this.stopMusic();
            this.game.state.states['GameOverScreenState'].setTimePlayed(timePlayed);
            this.game.state.states['GameOverScreenState'].setWinner(winnerString);
            this.game.state.start("GameOverScreenState");
        }

        doCountDown()
        {
            // countdown still running
            if (this.preGameCountDownTimer.isRunning())
            {
                // set current secs
                this.cdText.setText(""+(this.preGameCountDownTimer.getCountdownIntValue()+1));
            }
            else
            {
                // adding tweens MUST only happen once
                this.cdText.setText("GO!");
                // user info
                this.userInfo.setText("Touch all keys!");

                this.game.add.tween(this.userInfo).to({alpha: 1}, 600, Phaser.Easing.Linear.None, true, 0, 300, true);
                //this.game.add.tween(this.userInfo).to({alpha: 0}, 800, Phaser.Easing.Linear.None, true).loop(true);
                this.game.add.tween(this.cdText).to({x: 4000}, 2500, Phaser.Easing.Linear.None, true);
                //this.game.add.tween(this.cdText).to({scale: 5.0}, 800, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.cdText).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);

                this.setGameStage(GameSettings.GameStages.STAGE_INITIAL_KEY_WAIT);

            }

        }

        setGameStage(gameStage:GameSettings.GameStages)
        {
            if (this.gameStage != gameStage) this.gameStage = gameStage;
        }

        setGameMode(gameMode:GameSettings.GameModes)
        {
            if (this.gameMode != gameMode) this.gameMode = gameMode;
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

        UpdateRndBtns()
        {
            if (this.rndButtonAssignTimer.checkInterval())
            {
                this.assignAndRemoveLetters();
            }
        }

        assignAndRemoveLetters()
        {
            var keyVal;
            var wereKeysAssigned = false;
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
                    wereKeysAssigned = true;
                }
            }
            // play sound if keys were assigned
            if (wereKeysAssigned && (this.gameStage >= GameSettings.GameStages.STAGE_INITIAL_KEY_WAIT)) {
                this.sBeep.play();
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


    } // class
} // module

