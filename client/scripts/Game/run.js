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
    player.special();
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