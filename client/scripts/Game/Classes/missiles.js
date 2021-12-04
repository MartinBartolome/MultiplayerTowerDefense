var Missile = function(x,y,angle,damage,type,sprite){
	this.x = x  * 30;
	this.y = y  * 30;
	this.angle = angle;
	this.damage = damage;
	this.type = type;
	this.freezy = freeze;
	this.critical=false;
	var img = new Image();

	this.move = function()
	{
		this.x += Math.cos(this.angle)*8;
		this.y -= Math.sin(this.angle)*8;
	}
	this.draw = function()
	{
		img.src ="./images/"+this.type+"ball.png";
		context.drawImage(img, this.x, this.y, 20, 20);
	}
	this.explode = function(i)
	{
		for (var y = 0; y < wave.length; y++) {
			if( this.x <= (wave[y].x+30) && (this.x+30) >= (wave[y].x) && this.y <= (wave[y].y+30) && (this.y+30) >= (wave[y].y)){
				missiles.splice(i,1);
				if(wave[y].genre == "peon"){ 
					if(this.type=="freeze"){
						wave[y].froze = true;
						wave[y].freezy = this.damage;
						break;
					}
					else
					{
						if(this.critical==true){
							wave[y].damage(y, (this.damage*2));
							break;
						}
						else{
							wave[y].damage(y, (this.damage));
							break;
						}
					}
				}
				else if(wave[y].genre == "soldat"){
					if(this.type=="freeze"){
						wave[y].froze = true;
						wave[y].freezy = this.damage;
						break;
					}
					else
					{
						if(this.critical==true){
							wave[y].damage(y, (this.damage*2)/2);
							break;
						}
						else{
							wave[y].damage(y, (this.damage)/2);
							break;
						}
					}
				}
				else if(wave[y].genre == "chevalier"){
					if(this.type=="freeze"){
						wave[y].froze = true;
						wave[y].freezy = this.damage;
						break;
					}
					else
					{
						if(this.critical==true){
							wave[y].damage(y, (this.damage*2)/4);
							break;
						}
						else{
							wave[y].damage(y, (this.damage)/4);
							break;
						}
					}
				}
				else if(wave[y].genre == "roi"){
					if(this.type=="freeze"){
						wave[y].froze = true;
						wave[y].freezy = this.damage;
						break;
					}
					else
					{
						if(this.critical==true){
							wave[y].damage(y, (this.damage*2)/8);
							break;
						}
						else{
							wave[y].damage(y, (this.damage)/8);
							break;
						}
					}			
				}
			}
		}
		if((this.x < 0) || (this.x > 900) || (this.y < 0) || (this.y > 900))
		{
			missiles.splice(i,1);
		}
	}
}