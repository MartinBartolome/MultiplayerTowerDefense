/* Global game runner */
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