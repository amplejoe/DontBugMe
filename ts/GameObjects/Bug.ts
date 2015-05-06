/// <reference path="../../phaserLib/phaser.d.ts"/>
/// <reference path="../Utils/GameSettings.ts"/>
module Sprites // very important - not even constructor gets called without this...
{
    export class Bug extends Phaser.Sprite
    {
        public static MAX_SPEED: number = 30; // 30 fps

        currentKey: Phaser.Key;

        id: number;
        animName: string;
        name: string;

        selected: boolean;

        firstBoost: boolean;

        constructor(game: Phaser.Game,id:number, animName: string, x:number,y:number)
        {
            super(game,x,y, animName);

            this.setAnimName(animName);

            this.currentKey = null;
            this.setFirstBoost(true);
            this.id = id;
            this.setName(this.id);
            //this.anchor.set(0.5, 0.5);
            // click functions
            this.selected = false;
            this.events.onInputDown.add(function () {this.toggleSelected()},this);
            //this.events.onInputUp.add(function () {this.setClicked(false)},this);
        }

        toggleSelected()
        {
            this.selected = !this.selected;
        }

        isSelected(): boolean
        {
            return this.selected;
        }

        setName(id:number)
        {
            this.name = GameSettings.getBugName(id);
        }

        getName():string
        {
            return this.name;
        }

        setCurrentKey(key: Phaser.Key)
        {
            this.currentKey = key;
        }

        setAnimName(name: string)
        {
            this.animName = name;
        }

        isFirstBoost(): boolean
        {
            return this.firstBoost;
        }

        setFirstBoost(val: boolean)
        {
            this.firstBoost = val;
        }

        getCurrentKey(): Phaser.Key
        {
            return this.currentKey;
        }

        getAnimName(): string
        {
            return this.animName;
        }

        boost(velocity: number)
        {

            if (this.currentKey == null) return;

            // initial boost
            if (this.isFirstBoost())
            {
                this.body.velocity.setTo(0, -270);
                this.setFirstBoost(false); // unset forst boost
                return;
            }

            if (this.currentKey.isDown) this.body.velocity.setTo(0, velocity);
        }

        update()
        {

        }

        animate()
        {
            var anim = this.animations.getAnimation("move");
            if (anim !== null && anim.isPlaying) return;

            this.loadTexture(this.animName,0);
            this.animations.add("move"); // whole sheet = move animation
            this.animations.play("move", 10, true); // true -> loop forever
            this.animations.currentAnim.speed = 10;
        }

        stopAnimation()
        {
            var anim = this.animations.getAnimation("move");
            if (anim === null) return;
            else if (!anim.isPlaying) return;
            this.animations.stop("move", true);
        }

    }
}

