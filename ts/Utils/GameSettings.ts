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

    export enum GameOverStages
    {
        STAGE_NONE = 0,
        STAGE_INIT = 1,
        STAGE_HIGHSCORE_ENTRY = 2,
        STAGE_FINAL = 3
    };

    export enum TextStyles
    {
        STYLE_NONE = 0,
        STYLE_NEON_RED = 1,
        STYLE_NEON_GREEN = 2,
        STYLE_GREEN = 3
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
            case TextStyles.STYLE_NEON_RED:
                return {font: size+"px Love Ya Like A Sister", fill: "#ff0000", align: "center" }; // #2a6a2a
                case TextStyles.STYLE_NEON_GREEN:
                return {font: size+"px Love Ya Like A Sister", fill: "#00ee00", align: "center" };
                case TextStyles.STYLE_GREEN:
                return {font: size+"px Love Ya Like A Sister", fill: "#2a6a2a", align: "center" };
            case TextStyles.STYLE_NONE:
            default: return null;
        }
    }
}


