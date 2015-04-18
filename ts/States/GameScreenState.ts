/// <reference path="../../phaserLib/phaser.d.ts"/>
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




    create()
    {
        this.countdownMax =this.countdown = 5;
        this.bgTile0 = this.game.add.tileSprite(0, 0, this.game.stage.width, this.game.cache.getImage('bg').height, 'bg');
        this.startTime = this.game.time.time;
        //countdown format + position
        this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, '5', { font: "80px Arial", fill: "#ffffff", align: "center" });
        //this.text.anchor.setTo(0.5, 0.5);


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

        if (this.countdown < 0) {
        this.bgTile0.tilePosition.y += 1;
            this.text.setText("");
            this.UpdateRndBtn();
        }
        else if (this.countdown == 0){
            this.updateCounter();
            this.text.setText("GO!");
        }else {
            this.updateCounter();
            console.log("Countdown: " + this.countdown);
            this.text.setText(this.countdown);
        }
    }
    toInt(value) { return ~~value; }

    getRandomLetter(){
        var tempo = this.alphabet[Math.floor(Math.random()*this.alphabet.length)]; //this.alphabet.indexOf(,Math.round(Math.random()*this.alphabet.length));
        console.log("Random letter: "+ tempo);
        return tempo;
    }
}
