/// <reference path="../../phaserLib/phaser.d.ts"/>
class Bug extends Phaser.Sprite
{
    public static MAX_SPEED: number = 30; // 30 fps

    game: Phaser.Game;
    movingSpeed: number;

    currentKey: Phaser.Key;

    animName: string;

    constructor(game:Phaser.Game, animName: string, x:number,y:number)
    {
        this.game = game;
        this.movingSpeed = 10;
        this.animName = animName;

        this.currentKey = null;

        super(game,x,y,this.animName, 0);
        //this.anchor.set(0.5, 0.5);
    }

    setCurrentKey(key: Phaser.Key)
    {
        console.log("key set");
        this.currentKey = key;
    }

    getCurrentKey()
    {
        return this.currentKey;
    }


    update()
    {

    }

    Animate()
    {
        //console.log("animate called");
        this.loadTexture(this.animName,0);
        this.animations.add("move"); // whole sheet = move animation
        this.animations.play("move", 10, true); // true -> loop forever
        this.animations.currentAnim.speed = this.movingSpeed;
    }
}
