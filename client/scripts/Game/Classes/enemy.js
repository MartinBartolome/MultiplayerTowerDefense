function Enemy(x, y, pv, speed, type, sprite, genre)
{
    this.freezy = 1;
    this.genre = genre;
    this.x = x;
    this.y = y;
    this.tableIndex = Math.floor((x)/30);
    this.tableData = Math.floor((y)/30);
    this.path = [];
    this.speed = (speed*this.freezy);
    this.pv = pv;
    this.colorpv = "green";
    this.type = type;
    this.froze = false;
    this.frize = 0;
    this.sprite = sprite;
    const img = new Image();
    img.src = sprite;
    let spritelol = 32;
    let spriteigloo = 65;
    let frameSpriteSheet = 0;
    for (let i = 0; i < level.length; i++)
    {
        this.path[i] = [];
        for (let j = 0; j < level[i].length; j++)
        {
            this.path[i][j] = 0;
        }
    }

    this.draw = function()
    {
        const savepv = pv;

        if (this.pv <= 25){
                    context.strokeRect(this.x-15, this.y-40, savepv/4, 5);
                    this.colorpv="red";
                    context.fillStyle = this.colorpv;
                    context.fillRect(this.x-15, this.y-40, this.pv/4, 3);
                }
                else if(this.pv <= 50){
                    context.strokeRect(this.x-15, this.y-40, savepv/4, 5);
                    this.colorpv="yellow";
                    context.fillStyle = this.colorpv;
                    context.fillRect(this.x-15, this.y-40, this.pv/4, 3);
                }
                else if (this.pv <= 75){
                    context.strokeRect(this.x-15, this.y-40, savepv/4, 5);
                    this.colorpv="green";
                    context.fillStyle = this.colorpv;
                    context.fillRect(this.x-15, this.y-40, this.pv/4, 3);
                }
                else{
                    context.strokeRect(this.x-15, this.y-40, savepv/4, 5);
                    context.fillStyle = this.colorpv;
                    context.fillRect(this.x-15, this.y-40, this.pv/4, 3);
                }
                    
        if(sprite==='./images/sprite_eclaireur.png'){
        context.drawImage(img, 50 * frameSpriteSheet, spritelol , 50, 50, this.x-17, this.y-20, 35, 35);
                frameSpriteSheet++;
        if (frameSpriteSheet === 10)
            frameSpriteSheet = 0;
        }
        else{
            context.drawImage(img, 50 * frameSpriteSheet, spritelol , 50, 50, this.x-17, this.y-20, 35, 35);
            if (frameCount % 5 === 0){
                frameSpriteSheet++;
            }
            if (frameSpriteSheet === 10){
            frameSpriteSheet = 0;
            }
        }
    };
    this.move = function()
    {
        if(this.froze === true)
        {
           this.frize += 1;
        }
        if(this.frize === 120)
        {
            this.froze = false;
            this.frize = 0;
            this.freezy=1;
        }
        if ((level[this.tableData][this.tableIndex+1] === 1 || level[this.tableData][this.tableIndex+1] === 4) && this.path[this.tableData][this.tableIndex+1] !== 1)
        {
            this.path[this.tableData][this.tableIndex] = 1;
            this.x+=(this.speed*this.freezy);
            this.tableIndex = Math.floor((this.x-15)/30);
            spritelol=50;
            spriteigloo = 65;
        }
        else if ((level[this.tableData][this.tableIndex-1] === 1 || level[this.tableData][this.tableIndex-1] === 4) && this.path[this.tableData][this.tableIndex-1] !== 1)
        {
            this.path[this.tableData][this.tableIndex] = 1;
            this.x-=(this.speed*this.freezy);
            this.tableIndex = Math.ceil((this.x-15)/30);
            spritelol=150;
            spriteigloo = 195;
        }
        else if ((level[this.tableData+1][this.tableIndex] === 1 || level[this.tableData+1][this.tableIndex] === 4) && this.path[this.tableData+1][this.tableIndex] !== 1)
        {
            this.path[this.tableData][this.tableIndex] = 1;
            this.y+=(this.speed*this.freezy);
            this.tableData = Math.floor((this.y-15)/30);
            spritelol=100;
            spriteigloo = 130;
        }
        else if ((level[this.tableData-1][this.tableIndex] === 1 || level[this.tableData-1][this.tableIndex] === 4) && this.path[this.tableData-1][this.tableIndex] !== 1)
        {
            this.path[this.tableData][this.tableIndex] = 1;
            this.y-=(this.speed*this.freezy);
            this.tableData = Math.ceil((this.y-15)/30);
            spritelol=0;
            spriteigloo = 0;
        }
    };

    this.damage = function(num, dmg)
    {
        this.pv-=dmg;
        if(this.pv<=0)          
                if(this.genre === "blob"){
                    wave.splice(num,1);
                    player.geld+=10;
                }
                else if(this.genre === "soldat"){
                    wave.splice(num,1);
                    player.geld+=20;
                }
                else if(this.genre === "ritter"){
                    wave.splice(num,1);
                    player.geld+=30;
                }
                else if(this.genre === "koenig"){
                    wave.splice(num,1);
                    player.geld+=50;
                }    
    };

    this.over = function(num)
    {
        if (level[this.tableData][this.tableIndex] === 4)
        {
            if(this.genre === "blob"){
                    wave.splice(num,1);
                    player.leben-=1;
                }
                else if(this.genre === "soldat"){
                    wave.splice(num,1);
                    player.leben-=2;
                }
                else if(this.genre === "ritter"){
                    wave.splice(num,1);
                    player.leben-=3;
                }
                else if(this.genre === "koenig"){
                    wave.splice(num,1);
                    player.leben-=5;
                }    
        }
    };
}
