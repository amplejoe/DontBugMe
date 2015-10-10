/// <reference path="../../phaserLib/phaser.d.ts"/>
/// <reference path="../GameObjects/Bug.ts"/>
/// <reference path="../Utils/GameSettings.ts"/>
/// <reference path="../Utils/UtilFunctions.ts"/>
module States
{
    export class GameOverScreenState extends Phaser.State
    {
        game: Phaser.Game;

        timePlayed: string = "00:00:00";

        gameOverStage: GameSettings.GameOverStages = GameSettings.GameOverStages.STAGE_NONE;

        bg: Phaser.TileSprite;
        enter: Phaser.Sprite;
        winnerBug: Sprites.Bug;

        // highscore sprites
        check: Phaser.Sprite;
        cancel: Phaser.Sprite;
        cloudSprites: Array<Phaser.Sprite>;
        nameInputBox: Phaser.Sprite;
        nameInput: Phaser.Text;
        fadeInTime: number = 0;

        // final sprites
        showHighscore: Phaser.Text;
        newGame: Phaser.Text;

        // constants
        MAX_NAME_LENGTH: number = 8;
        FADE_IN_INTERVAL: number = 100;
        SELECTED_SCALE = 0.4;
        NOT_SELECTED_SCALE = 0.15;

        backspaceTime: number = 0;
        highscoreUserMessage: Phaser.Text;

        winnerId: number;
        winnerString: string;
        winnerRank: number;

        // buttons
        START_BUTTON_ENTER:Phaser.Key;
        START_BUTTON_SPACE:Phaser.Key;
        BACKSPACE_BUTTON: Phaser.Key;
        CURSOR_BUTTONS: Phaser.CursorKeys;

        // sounds
        sEnd: Phaser.Sound;
        squeaks:Array<Phaser.Sound>;
        sBeep: Phaser.Sound;

        setWinner(winnerId:number, winnerString: string)
        {
            this.winnerId = winnerId;
            this.winnerString = winnerString;
        }

        setTimePlayed(time: string)
        {
            this.timePlayed = time;
        }

        create()
        {

            // current stage
            this.setGameOverStage(GameSettings.GameOverStages.STAGE_INIT);

            this.sEnd = this.game.add.audio('end_quiet', 1, true);
            //this.sEnd.play();
            this.sEnd.fadeIn(6000, true); // fadein sound 6s
            this.squeaks = [
                this.game.add.audio('squeak', 1 ,false),
                this.game.add.audio('squeak2', 1, false)
            ];
            this.sBeep = this.game.add.audio('beep', 0.7, false);

            this.bg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "bg_neu");

            this.BACKSPACE_BUTTON = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
            //this.BACKSPACE_BUTTON.onDown.add(GameOverScreenState.prototype.backPressed, this);

            this.CURSOR_BUTTONS = this.game.input.keyboard.createCursorKeys();

            // bug dialog bubble
            this.showBubble();

            //  Capture all key presses
            this.game.input.keyboard.addCallbacks(this, null, null, this.keyPress);


            //this.enableEnterNewGame();

            var line1 = "Game Over - The Winner";
            var line1Pos: number = 300;
            var style = GameSettings.getTextStyle(GameSettings.TextStyles.STYLE_GREEN,60);

            var line3 = "Time played: "+this.timePlayed;
            this.game.add.text(this.game.width/2 - 100, this.game.height * 0.80, line3, style);

            if (this.winnerString == "")
            {
                var line2 = "Nobody!";
                var style2 = GameSettings.getTextStyle(GameSettings.TextStyles.STYLE_GREEN,80);
                this.game.add.text(this.game.width/2 - 100, 250, line2, style2);
                this.setGameOverStage(GameSettings.GameOverStages.STAGE_FINAL);

                line1 += ":";

                this.showFinalSelection();

            }
            else
            {
                this.winnerBug = new Sprites.Bug(this.game, this.winnerId, this.winnerString, this.game.width * 0.5, this.game.height * 0.5);

                this.winnerBug.x -= this.winnerBug.width/2;
                this.winnerBug.y -= this.winnerBug.height/2;
                this.game.add.existing(this.winnerBug);
                this.winnerBug.animate();
                this.setGameOverStage(GameSettings.GameOverStages.STAGE_HIGHSCORE_ENTRY);

                line1 += " (Rank "+this.winnerRank+"):";
                line1Pos = 400;

                this.showHighscoreInput();

            }

            this.setControlButtons();


            this.game.add.text(this.game.width/2-line1Pos, 70, line1, style);


        }

        showBubble(): void
        {
            this.cloudSprites = Array(4);
            this.cloudSprites[0] = this.game.add.sprite(800, 200, "cloud_1"); // container
            this.cloudSprites[0].alpha = 0;
            this.cloudSprites[0].scale.x = 0.75;
            this.cloudSprites[0].scale.y = 0.75;
            this.cloudSprites[1] = this.game.add.sprite(0, 0, "cloud_2");
            this.cloudSprites[1].alpha = 0;
            this.cloudSprites[2] = this.game.add.sprite(0, 0, "cloud_no_dots");
            this.cloudSprites[2].alpha = 0;

            // add to container (first bubble sprite
            this.cloudSprites[0].addChild(this.cloudSprites[1]);
            this.cloudSprites[0].addChild(this.cloudSprites[2]);

            // fade in sprites (attributes, time, easing function, autostart, delay, repeat, yoyo)
            this.game.add.tween(this.cloudSprites[0]).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, this.fadeInTime+=this.FADE_IN_INTERVAL, 0, false);
            this.game.add.tween(this.cloudSprites[1]).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, this.fadeInTime+=this.FADE_IN_INTERVAL, 0, false);
            this.game.add.tween(this.cloudSprites[2]).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, this.fadeInTime+=this.FADE_IN_INTERVAL, 0, false);

        }

        showHighscoreInput(): void
        {
            var line = "Enter name:";
            var style = GameSettings.getTextStyle(GameSettings.TextStyles.STYLE_GREEN,50);
            this.highscoreUserMessage = this.game.add.text(155, 85, line, style);
            this.highscoreUserMessage.alpha = 0;

            this.nameInputBox = this.game.add.sprite(140, 145, "name_box");
            this.nameInputBox.alpha = 0;
            var style = GameSettings.getTextStyle(GameSettings.TextStyles.STYLE_GREEN,50);
            this.nameInput = this.game.add.text(147, 158, "", style);
            this.nameInput.alpha = 0;
            //this.nameInputBox.scale.x = 1.0;
            //this.nameInputBox.scale.y = 1.0;

            var scale = this.SELECTED_SCALE;
            this.check = this.game.add.sprite(255, 265, "check_green");
            this.check.anchor.setTo(0.5, 0.5);
            this.check.alpha = 0;
            this.check.scale.x = scale;
            this.check.scale.y = scale;
            scale = this.NOT_SELECTED_SCALE;
            this.cancel = this.game.add.sprite(330, 265, "x_red");
            this.cancel.anchor.setTo(0.5, 0.5);
            this.cancel.alpha = 0;
            this.cancel.scale.x = scale;
            this.cancel.scale.y = scale;

            // add all sprites to container (sprite most in the bg)
            this.cloudSprites[0].addChild(this.highscoreUserMessage);
            this.cloudSprites[0].addChild(this.nameInputBox);
            this.cloudSprites[0].addChild(this.nameInput);
            this.cloudSprites[0].addChild(this.check);
            this.cloudSprites[0].addChild(this.cancel);

            // fade in stuff (attributes, time, easing function, autostart, delay, repeat, yoyo)
            this.game.add.tween(this.highscoreUserMessage).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, this.fadeInTime+=this.FADE_IN_INTERVAL, 0, false);
            this.game.add.tween(this.nameInputBox).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, this.fadeInTime+=this.FADE_IN_INTERVAL, 0, false);
            this.game.add.tween(this.nameInput).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, this.fadeInTime+=this.FADE_IN_INTERVAL, 0, false);
            this.game.add.tween(this.check).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, this.fadeInTime+=this.FADE_IN_INTERVAL, 0, false);
            this.game.add.tween(this.cancel).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, this.fadeInTime+=this.FADE_IN_INTERVAL, 0, false);
        }

        hideHighscoreInput():void
        {
            // fade out stuff (attributes, time, easing function, autostart, delay, repeat, yoyo)
            this.game.add.tween(this.highscoreUserMessage).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, this.fadeInTime+=this.FADE_IN_INTERVAL, 0, false);
            this.game.add.tween(this.nameInputBox).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, this.fadeInTime+=this.FADE_IN_INTERVAL, 0, false);
            this.game.add.tween(this.nameInput).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, this.fadeInTime+=this.FADE_IN_INTERVAL, 0, false);
            this.game.add.tween(this.check).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, this.fadeInTime+=this.FADE_IN_INTERVAL, 0, false);
            this.game.add.tween(this.cancel).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, this.fadeInTime+=this.FADE_IN_INTERVAL, 0, false);
        }

        /**
         * Toggles Check and Cancel Buttons.
         * @param direction
         */
        toggleHighscoreControl(direction: number): void
        {
            if ((this.SELECTED_SCALE == this.check.scale.x) && (direction == Phaser.Keyboard.RIGHT))
            {
                var scale = this.NOT_SELECTED_SCALE;
                this.check.scale.x = scale;
                this.check.scale.y = scale;
                scale = this.SELECTED_SCALE;
                this.cancel.scale.x = scale;
                this.cancel.scale.y = scale;
                this.sBeep.play();
            }

            if ((this.SELECTED_SCALE == this.cancel.scale.x) && (direction == Phaser.Keyboard.LEFT))
            {
                var scale = this.NOT_SELECTED_SCALE;
                this.cancel.scale.x = scale;
                this.cancel.scale.y = scale;
                scale = this.SELECTED_SCALE;
                this.check.scale.x = scale;
                this.check.scale.y = scale;
                this.sBeep.play();
            }

        }

        toggleFinalControl(direction: number): void
        {
            if ((this.newGame.text.charAt(0) == "[") && (direction == Phaser.Keyboard.DOWN))
            {
                this.newGame.setText("New Game");
                this.showHighscore.setText("[Show Highscore]");
                this.sBeep.play();
            }

            if ((this.showHighscore.text.charAt(0) == "[") && (direction == Phaser.Keyboard.UP))
            {
                this.showHighscore.setText("Show Highscore");
                this.newGame.setText("[New Game]");
                this.sBeep.play();
            }
        }

        showFinalSelection(): void
        {
            var line1 = "[New Game]";
            var style = GameSettings.getTextStyle(GameSettings.TextStyles.STYLE_GREEN,55);
            this.newGame = this.game.add.text(140, 110, line1, style);
            this.newGame.alpha = 0;

            var line2 = "Show Highscore";
            var style = GameSettings.getTextStyle(GameSettings.TextStyles.STYLE_GREEN,55);
            this.showHighscore = this.game.add.text(120, 178, line2, style);
            this.showHighscore.alpha = 0;

            this.cloudSprites[0].addChild(this.newGame);
            this.cloudSprites[0].addChild(this.showHighscore);

            this.game.add.tween(this.newGame).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, this.fadeInTime+=this.FADE_IN_INTERVAL, 0, false);
            this.game.add.tween(this.showHighscore).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, this.fadeInTime+=this.FADE_IN_INTERVAL, 0, false);

        }


        update()
        {
            switch (this.gameOverStage)
            {
                case GameSettings.GameOverStages.STAGE_HIGHSCORE_ENTRY:
                    this.updateHighScoreEntry();
                    return;
                case GameSettings.GameOverStages.STAGE_FINAL:
                    this.updateFinal();
                    return;
                case GameSettings.GameOverStages.STAGE_INIT:
                case GameSettings.GameOverStages.STAGE_NONE:
                default: return;
            }
        }

        updateHighScoreEntry(): void
        {
            if (this.BACKSPACE_BUTTON.isUp) this.backspaceTime = 0;
            if (this.BACKSPACE_BUTTON.isDown) this.backPressed();

            if (this.CURSOR_BUTTONS.left.isDown) this.toggleHighscoreControl(Phaser.Keyboard.LEFT);
            else if (this.CURSOR_BUTTONS.right.isDown) this.toggleHighscoreControl(Phaser.Keyboard.RIGHT);
        }

        updateFinal(): void
        {
            if (this.CURSOR_BUTTONS.up.isDown) this.toggleFinalControl(Phaser.Keyboard.UP);
            else if (this.CURSOR_BUTTONS.down.isDown) this.toggleFinalControl(Phaser.Keyboard.DOWN);
        }


        setControlButtons(): void
        {
            // add keys
            this.START_BUTTON_ENTER = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            this.START_BUTTON_SPACE = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            // remove previous assignments
            this.START_BUTTON_ENTER.onDown.removeAll();
            this.START_BUTTON_SPACE.onDown.removeAll();

            switch (this.gameOverStage)
            {
                case GameSettings.GameOverStages.STAGE_HIGHSCORE_ENTRY:
                    this.START_BUTTON_ENTER.onDown.add(GameOverScreenState.prototype.checkSelectionHighscore, this);
                    this.START_BUTTON_SPACE.onDown.add(GameOverScreenState.prototype.checkSelectionHighscore, this);
                    return;
                case GameSettings.GameOverStages.STAGE_FINAL:
                    this.START_BUTTON_ENTER.onDown.add(GameOverScreenState.prototype.checkSelectionFinal, this);
                    this.START_BUTTON_SPACE.onDown.add(GameOverScreenState.prototype.checkSelectionFinal, this);
                    return;
                case GameSettings.GameOverStages.STAGE_INIT:
                case GameSettings.GameOverStages.STAGE_NONE:
                default: return;
            }
        }


        enableEnterNewGame(): void
        {
            // show blinking enter
            /*
            this.enter = this.game.add.sprite(this.game.width * 0.92, this.game.height * 0.86, "enter");
            this.enter.anchor.setTo(0.5,0.5);
            this.enter.scale.x = 0.40;
            this.enter.scale.y = 0.40;
            this.enter.alpha = 0;
            this.game.add.tween(this.enter).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
            */

        }

        backPressed(): void
        {
            if (this.nameInput.text.length < 1) return;

            // backspace (add delay if button is pressed continuously)
            if (this.game.time.now > this.backspaceTime)
            {
                this.nameInput.setText(this.nameInput.text.substring(0, this.nameInput.text.length - 1));
                this.backspaceTime = this.game.time.now + 100;
            }

        }

        keyPress(inputChar): void
        {
            //console.log(char.charCodeAt(0) + " == " + Phaser.Keyboard.BACKSPACE);

            inputChar = inputChar.toLowerCase();

            // Skip it unless it's a-z.
            if( inputChar.charCodeAt(0) < "a".charCodeAt(0) || inputChar.charCodeAt(0) > "z".charCodeAt(0) ) return;

            if (this.nameInput.text.length < this.MAX_NAME_LENGTH)
            {
                if (this.nameInput.text.length < 1) inputChar = inputChar.toUpperCase();
                this.nameInput.setText(this.nameInput.text + inputChar);
            }

        }

        setGameOverStage(gameOverStage:GameSettings.GameOverStages): void
        {
            if (this.gameOverStage != gameOverStage) this.gameOverStage = gameOverStage;
        }

        setRank(rank: number): void
        {
            this.winnerRank = rank;
        }

        checkSelectionHighscore(): void
        {

            if (this.check.scale.x == this.SELECTED_SCALE)
            {
                if (this.nameInput.text.length < 3)
                {
                    // play sound to notify user to input something
                    this.squeaks[Math.floor(Math.random() * 2)].play();
                    return;
                }
                Utils.UtilFunctions.addPlayerNameToHighscore(this.winnerRank-1, this.nameInput.text);
            }

            this.game.input.keyboard.addCallbacks(null,null,null,null); // clear callback for key capture
            this.setGameOverStage(GameSettings.GameOverStages.STAGE_FINAL);
            this.fadeInTime = 0;
            this.hideHighscoreInput();
            this.fadeInTime = 0;
            this.showFinalSelection();
            this.setControlButtons();

        }

        checkSelectionFinal()
        {

            if (this.newGame.text.charAt(0) == "[")
            {
                this.sound.stopAll();
                //this.game.tweens.removeFrom(this.enter); // remove enter tween

                this.game.state.start("TitleScreenState");
            }
            else
            {
                window.open("highscore.html",'_blank');
            }

        }

    }
}