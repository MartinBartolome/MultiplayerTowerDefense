function drawBackground()
{
	context.fillRect(0,0,canvas_width, canvas_height);
	var img = new Image();
    img.src = "./images/herbe.jpg";
	for (var i = 0; i < level.length; i++)
	{
		for(var j = 0; j < level[i].length; j++)
		{
			switch (level[i][j])
			{
				case 0: //sol
					context.drawImage(img, j*cell_size, i*cell_size, cell_size, cell_size);
				break;
				case 1: //chemin ennemis
					context.fillStyle = "#FFCC66";
					context.fillRect(j*cell_size, i*cell_size, cell_size, cell_size);
				break;
				case 2: //tours
					context.fillStyle = "#934016";
					context.fillRect(j*cell_size, i*cell_size, cell_size, cell_size);
				break;
				case 3: //depart
					context.fillStyle = "#FFCC66";
					context.fillRect(j*cell_size, i*cell_size, cell_size, cell_size);
				break;
				case 4: //arrivee
					context.fillStyle = "#FFCC66";
					context.fillRect(j*cell_size, i*cell_size, cell_size, cell_size);
				break;
				case 5: //arrivee
					context.fillStyle = "#934016";
					context.fillRect(j*cell_size, i*cell_size, cell_size, cell_size);
				break;
				default:
				break;
			}
		}
	}
}
function drawEnemies()
{
	for (var i = 0; i < wave.length; i++)
	{
		wave[i].draw();
		wave[i].move();
		wave[i].over(i);
	}
}
function drawTowers()
{
	for (var y = 0; y < towers.length; y++) {
	 	towers[y].draw();
	 	towers[y].check();
	 	towers[y].shoot();
	 }
}
function drawMissiles()
{
	for (var i = 0; i < missiles.length; i++) {
	 	missiles[i].move();
	 	missiles[i].draw();
	 	missiles[i].explode(i);
	 }
}


