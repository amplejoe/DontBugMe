/// <reference path="../../phaserLib/phaser.d.ts"/>
module GameSettings
{
    export enum GameStages
    {
        STAGE_NONE = 0,
        STAGE_INIT = 1,
        STAGE_READY = 2,
        STAGE_COUNTDOWN = 3,
        STAGE_INITIAL_KEY_WAIT = 4,
        STAGE_PLAYING = 5,
        STAGE_GAME_OVER = 6
    };

    export enum GameModes
    {
        MODE_NONE = 0,
        MODE_LAST_BUG_CRAWLING = 1,
        MODE_TIME_TRIAL = 2
    };
}


