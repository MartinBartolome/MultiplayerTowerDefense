/**
 * GameLoop Funktion
 */
function run()
{
  	Win();
  	Scoring();
    drawBackground();
    drawTowers();
    drawMissiles();
    checkSpawn();
    getinfobox();
    frameCount++;
    if(frameCount === 300){
      frameCount = 0;
    }
    drawEnemies();
    requestAnimFrame(run);
}
