REM Packs and minifies all js files into dist\js\game.min.js
java -jar "tools\closure\compiler.jar" --js js\Utils\GameSettings.js --js js\Utils\UtilFunctions.js  --js js\Utils\Timer.js  --js js\Utils\IntervalTimer.js  --js js\Utils\RandomIntervalTimer.js  --js js\Utils\CountdownTimer.js --js js\GameObjects\Bug.js --js js\States\TitleScreenState.js --js js\States\MenuState.js --js js\States\GameScreenState.js --js js\States\GameOverScreenState.js --js js\app.js --js_output_file dist\js\game.min.js 

