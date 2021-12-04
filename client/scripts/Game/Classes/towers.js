var Tower = function(type, range, x, y, damage, upgrade)
{
	this.type = type;
	this.range = range;
	this.x = x;
	this.y = y;
	this.upgrade = upgrade;
	this.damage = damage;
	this.compteur = 0;
	this.up = false;
	this.destroy = false;
	var img = new Image();
	this.angle;
	var ennemiProche = -1;
	this.canshoot = false;
	this.prix = 50;
	var frameSpriteSheet = 0;
	this.check = function()
	{
		this.canshoot = false;
		if(wave[0] != null)
		{
			for (var i = 0 ; i < wave.length ; i++)
			{
				var distance = Math.sqrt(Math.pow(((wave[i].x)-this.x*30),2) + Math.pow(((wave[i].y)-this.y*30),2));
				if (this.range > distance && frameCount % 60 == 0 && this.type == wave[i].type)
				{
					ennemiProche = i;
					this.canshoot = true;
				}
				if (this.range > distance && frameCount % 60 == 0 && this.type == "freeze")
				{
					ennemiProche = i;
					this.canshoot = true;
				}
			}
		}
	};
	this.shoot = function()
	{
		if (this.canshoot == true && this.type == "sol")
		{
			this.angle=(Math.atan2(this.x * 30 - wave[ennemiProche].x, this.y * 30 - wave[ennemiProche].y))+ Math.PI / 2;
			missiles.push(new Missile(this.x,this.y,this.angle,this.damage*this.upgrade,this.type,ennemiProche));
		}
		if (this.canshoot == true && this.type == "air")
		{
			this.angle=(Math.atan2(this.x * 30 - wave[ennemiProche].x, this.y * 30 - wave[ennemiProche].y))+ Math.PI / 2;
			missiles.push(new Missile(this.x,this.y,this.angle,this.damage*this.upgrade,this.type,ennemiProche));
		}
		if (this.canshoot == true && this.type == "freeze")
		{
			this.angle=(Math.atan2(this.x * 30 - wave[ennemiProche].x, this.y * 30 - wave[ennemiProche].y))+ Math.PI / 2;
			missiles.push(new Missile(this.x,this.y,this.angle,this.damage/this.upgrade,this.type));
		}
	};
	this.draw = function(){
		img.src ="./images/"+this.type+this.upgrade+".png";
		if(this.type=="freeze")
        {
			context.drawImage(img,(this.x*30)-10, (this.y*30)-20, 50, 50);
        }
        else
        {
			context.drawImage(img, 50 * frameSpriteSheet, 0 , 50, 50, (this.x*30)-10, (this.y*30)-20, 50, 50);

                frameSpriteSheet++;
        	//on incremente le numero de frame
        	if (frameSpriteSheet == 9)
        	{
        	    frameSpriteSheet = 0;
        	}
        }
		
        
	};
	this.upgrady = function(x,y){
		if(x==this.x && y==this.y && player.up == true && this.upgrade < 3){
    	    if(player.or >= (this.prix*2))
    	    {
    	      player.or -= (this.prix*2);
    	      this.prix = (this.prix*2)+this.prix;
    	      this.upgrade +=1;
    	      player.up = false;
    	      document.getElementById("upgrade").style.backgroundImage ="url('images/up.png')";
    	    }
    	}
	};
	this.destroyy = function(x,y,i)
	{
	  	if(x==this.x && y==this.y && player.destroy == true){
  			player.or += (this.prix*0.5);
  			towers.splice(i,1);
  			player.destroy = false;
			level[y][x]=2;
			document.getElementById("destroy").style.backgroundImage ="url('images/down.png')";
  		}
  	};
}
