/// <reference path="../../phaserLib/phaser.d.ts"/>
class Bug extends Phaser.Sprite
{
    public static MAX_SPEED: number = 30; // 30 fps

    game: Phaser.Game;

    currentKey: Phaser.Key;
    currentKeyVal: number;
    currentKeyText: Phaser.Text;

    animName: string;

    constructor(game:Phaser.Game, animName: string, x:number,y:number)
    {
        this.game = game;

        this.animName = animName;

        this.currentKey = null;
        this.currentKeyVal = -1;

        super(game,x,y,this.animName, 0);
        this.anchor.set(0.5, 0.5);

    }

    setCurrentKey(key: Phaser.Key)
    {
        console.log("key set");
        this.currentKey = key;
    }

    setCurrentKeyVal(key: number)
    {
        this.currentKeyVal = key;
    }

    getCurrentKeyVal()
    {
        return this.currentKeyVal;
    }

    getCurrentKey()
    {
        return this.currentKey;
    }

    getAnimName()
    {
        return this.animName;
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
        this.animations.currentAnim.speed = 10;
    }

    toInt(value) { return ~~value; }
}
