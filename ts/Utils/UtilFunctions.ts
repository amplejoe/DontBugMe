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

        /**
         * For umlauts etc.
         */
        static getSpecialCharString(specialCharacter: string): string
        {
            return decodeURIComponent(encodeURIComponent(specialCharacter)).toString();
        }

        static getHighScoresTable(): string
        {
            var highScoreSize =  parseInt(localStorage["dontbugme.highscore.count"]);
            var highscoresString = "<table id='highscoreTable' class='centered'><thead><tr><th>Player</th><th>Score</th><th>Time</th></tr></thead>";

            for (var i=0;i<highScoreSize;i++)
            {
                var oddClass = (i % 2 == 0)? "" : " class='odd'";
                highscoresString += "<tbody><tr"+oddClass+">";
                highscoresString += "<th>"+(i+1)+"</th>";
                highscoresString += "<td>"+localStorage["dontbugme.highscore."+i+".score"]+"</td>";
                highscoresString += "<td>"+localStorage["dontbugme.highscore."+i+".time"]+"</td>";
                highscoresString += "</tr></tbody>";
            }

            highscoresString += "<tfoot><th>Total</th><td colspan='2'>"+highScoreSize+" Scores</td></tfoot></table>";

            return highscoresString;
            //document.getElementById('highscores').innerHTML = highscoresString;
        }


        static addHighscoreEntrySorted(score: number, time:string ): number
        {
            var highscoreEntryCountString = localStorage["dontbugme.highscore.count"];
            var id = 0;

            if (highscoreEntryCountString == null)
            {
                localStorage["dontbugme.highscore.count"] = 0;
            }
            else
            {
                var id = parseInt(highscoreEntryCountString);
            }

            var currentHighscoreCount = parseInt(localStorage["dontbugme.highscore.count"]);

            if (currentHighscoreCount > 0)
            {
                var insert: boolean = false;
                for (var i=0;i<currentHighscoreCount;i++)
                {
                    var curScore: number = parseInt(localStorage["dontbugme.highscore."+i+".score"]);
                    if (score >= curScore)
                    {
                        id = i;
                        insert = true;
                        break;
                    }
                }
            }

            if (insert)
            {
                // shift scores to make room for new one
                for (var i = (currentHighscoreCount-1); i >= id; i--)
                {
                    localStorage["dontbugme.highscore."+(i+1)+".score"] = localStorage["dontbugme.highscore."+i+".score"];
                    localStorage["dontbugme.highscore."+(i+1)+".time"] = localStorage["dontbugme.highscore."+i+".time"];
                }
            }

            // add current score
            localStorage["dontbugme.highscore."+id+".score"] = score;
            localStorage["dontbugme.highscore."+id+".time"] = time;
            localStorage["dontbugme.highscore.count"] = currentHighscoreCount + 1;
            return (id+1);
        }

        static toInt(value) { return ~~value; }

    }
}