/***********************************************************
*boucle d'affichage des frames
*
***********************************************************/
function run()
{
  	Win();
  	Scoring();
    drawBackground();
    drawTowers();
    drawMissiles();
    checkSpawn();
    getinfotour();
    frameCount++;
    if(frameCount == 300){
      frameCount = 0;
    }
    drawEnemies();
    requestAnimFrame(run);
}