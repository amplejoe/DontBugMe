/// <reference path="../../phaserLib/phaser.d.ts"/>
class Bug extends Phaser.Sprite
{
    public static MAX_SPEED: number = 30; // 30 fps

    game: Phaser.Game;
    movingSpeed: number;

    index: number;

    animName: string;

    constructor(game:Phaser.Game, animName: string, x:number,y:number, index: number)
    {
        this.game = game;
        this.movingSpeed = 10;
        this.index = index;
        console.log("my number is "+this.index);
        this.animName = animName;

        super(game,x,y,this.animName, 0);
        //this.anchor.set(0.0,0.5);
    }

    setIndex(index: number)
    {
        this.index = index;
    }

    getIndex()
    {
        return this.index;
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
