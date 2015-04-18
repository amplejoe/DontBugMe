/// <reference path="../../phaserLib/phaser.d.ts"/>
class GameScreenState extends Phaser.State {
    game:Phaser.Game;

    bgTile0: Phaser.TileSprite;

    create()
    {

        this.bgTile0 = this.game.add.tileSprite(0, 0, this.game.stage.width, this.game.cache.getImage('bg').height, 'bg');
    }

    update()
    {
        this.bgTile0.tilePosition.y += 1;
    }
}