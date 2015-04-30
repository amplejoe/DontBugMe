:: creates a distribution folder with all needed files to distribute the game

if not exist dist mkdir dist

:: copy assts/css/needed files
xcopy assets dist\assets\ /s /e /Y
xcopy css dist\css\ /s /e /Y
copy info.html dist

:: TODO modify index.html (replace js files by game.min.js) 
:: FOR /F "eol=; tokens=2,3* delims=, " %i in (index.html) do @echo %i %j %k

:: Packs and minifies all js files into dist\js\game.min.js
if not exist dist\js mkdir dist\js
java -jar "tools\closure\compiler.jar" --js js\Utils\GameSettings.js --js js\Utils\UtilFunctions.js  --js js\Utils\Timer.js  --js js\Utils\IntervalTimer.js  --js js\Utils\RandomIntervalTimer.js  --js js\Utils\CountdownTimer.js --js js\GameObjects\Bug.js --js js\States\TitleScreenState.js --js js\States\MenuState.js --js js\States\GameScreenState.js --js js\States\GameOverScreenState.js --js js\app.js --js_output_file dist\js\game.min.js 

