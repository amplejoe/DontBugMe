/// <reference path="../../phaserLib/phaser.d.ts"/>
module GameSettings
{

    var bugNames: Array<string> = ["Andi Goldi", "Marcel Hirschi", "Raini Sch"+decodeURIComponent('%C3%B6')+"ni", "Marlies Schildi", "Mario Scheibi"];

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

    export enum TextStyles
    {
        STYLE_NONE = 0,
        STYLE_RED = 1,
        STYLE_GREEN = 2
    };

    export function getBugNamesArray():Array<string>
    {
        return bugNames;
    }

    export function getBugName(nr:number): string
    {
        if (nr < 0 || nr >= bugNames.length) return "unnamed";
        return bugNames[nr];
    }


    export function getTextStyle(style: TextStyles, size:number): Object
    {
        switch(style)
        {
            case TextStyles.STYLE_RED:
                return {font: size+"px Swanky and Moo Moo", fill: "#ff0000", align: "center" };
                case TextStyles.STYLE_GREEN:
                return {font: size+"px Swanky and Moo Moo", fill: "#00ee00", align: "center" };
            case TextStyles.STYLE_NONE:
            default: return null;
        }
    }
}


