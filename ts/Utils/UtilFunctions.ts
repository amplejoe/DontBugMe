/**
 * Created by Bns on 30.04.2015.
 */
module Utils
{
    export class UtilFunctions
    {

        /**
         * Returns a random number between min (inclusive) and max (exclusive)
         */
        static getRandomArbitrary(min: number, max: number): number
        {
            return Math.random() * (max - min) + min;
        }

        /**
         * Returns a random integer between min (inclusive) and max (inclusive)
         * Using Math.round() will give you a non-uniform distribution!
         */
        static getRandomInt(min: number, max: number): number
        {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
}