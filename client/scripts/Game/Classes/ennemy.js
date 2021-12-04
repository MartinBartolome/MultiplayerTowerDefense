//On construit notre objet enemy
function Enemy(x, y, pv, speed, type, sprite, genre)
{
    this.freezy = 1;
    this.genre = genre;
    this.x = x;
    this.y = y;
    this.tableIndex = Math.floor((x)/30);  //numero de l'index du tableau representant le niveau(prototype)
    this.tableData = Math.floor((y)/30);     //numero de la donnée de ce tableau
    this.path = []; //tableau representant le chemin deja parcouru
    this.speed = (speed*this.freezy);
    this.pv = pv;
    this.colorpv = "green";
    this.type = type;
    this.froze = false;
    this.frize = 0;
    this.sprite = sprite;
    var img = new Image();
    img.src = sprite;
    var spritelol = 32;
    var spriteigloo = 65;
    var frameSpriteSheet = 0;
    //On enregistre le chemin de notre enemy dans le tableau path
    for (var i = 0; i < level.length; i++)
    {
        this.path[i] = [];
        for (var j = 0; j < level[i].length; j++)
        {
            this.path[i][j] = 0;
        }
    }

    this.draw = function()
    {
         var savepv = pv;

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
                    
        if(sprite=='./images/sprite_eclaireur.png'){
        //On affiche une frame de la spriteMap
        context.drawImage(img, 50 * frameSpriteSheet, spritelol , 50, 50, this.x-17, this.y-20, 35, 35);

                frameSpriteSheet++;
        //on incremente le numero de frame
        if (frameSpriteSheet == 10)
            frameSpriteSheet = 0;
        }
        else{
            context.drawImage(img, 50 * frameSpriteSheet, spritelol , 50, 50, this.x-17, this.y-20, 35, 35);
        //on incremente le numero de frame
            if (frameCount % 5 == 0){
                frameSpriteSheet++;
            }
            if (frameSpriteSheet == 10){
            frameSpriteSheet = 0;
            }
        }
    };
    this.move = function()
    {
        if(this.froze == true)
        {
           this.frize += 1;
        }
        if(this.frize == 120)
        {
            this.froze = false;
            this.frize = 0;
            this.freezy=1;
        }
         //Math.ceil permet d'arrondir au superieur, cela permet d'aller en haut puis à gauche lorsqu'on décremente
         //Math.floor permet d'arrondir a l'inferieur,cela permet d'aller en bas puis à droit lorsqu'on incremente
         
        if ((level[this.tableData][this.tableIndex+1] == 1 || level[this.tableData][this.tableIndex+1] == 4) && this.path[this.tableData][this.tableIndex+1] != 1)
        {
            this.path[this.tableData][this.tableIndex] = 1;
            this.x+=(this.speed*this.freezy);
            this.tableIndex = Math.floor((this.x-15)/30);
            spritelol=50;
            spriteigloo = 65;
        }
        else if ((level[this.tableData][this.tableIndex-1] == 1 || level[this.tableData][this.tableIndex-1] == 4) && this.path[this.tableData][this.tableIndex-1] != 1)
        {
            this.path[this.tableData][this.tableIndex] = 1;
            this.x-=(this.speed*this.freezy);
            this.tableIndex = Math.ceil((this.x-15)/30);
            spritelol=150;
            spriteigloo = 195;
        }
        else if ((level[this.tableData+1][this.tableIndex] == 1 || level[this.tableData+1][this.tableIndex] == 4) && this.path[this.tableData+1][this.tableIndex] != 1)
        {
            this.path[this.tableData][this.tableIndex] = 1;
            this.y+=(this.speed*this.freezy);
            this.tableData = Math.floor((this.y-15)/30);
            spritelol=100;
            spriteigloo = 130;
        }
        else if ((level[this.tableData-1][this.tableIndex] == 1 || level[this.tableData-1][this.tableIndex] == 4) && this.path[this.tableData-1][this.tableIndex] != 1)
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
        this.pv-=dmg; //on decremente les pv 
        if(this.pv<=0)          
                if(this.genre == "peon"){
                    wave.splice(num,1);  //si plus de pv delete du tableau
                    player.or+=10;
                }
                else if(this.genre == "soldat"){
                    wave.splice(num,1);  //si plus de pv delete du tableau
                    player.or+=20;
                }
                else if(this.genre == "chevalier"){
                    wave.splice(num,1);  //si plus de pv delete du tableau
                    player.or+=30;
                }
                else if(this.genre == "roi"){
                    wave.splice(num,1);  //si plus de pv delete du tableau
                    player.or+=50;
                }    
    };


    //si l'ennemi arrive au bout, on le detruit et nouvelle vague
    this.over = function(num)
    {
        if (level[this.tableData][this.tableIndex] == 4)
        {
            if(this.genre == "peon"){
                    wave.splice(num,1);  //si plus de pv delete du tableau
                    player.vie-=1;
                }
                else if(this.genre == "soldat"){
                    wave.splice(num,1);  //si plus de pv delete du tableau
                    player.vie-=2;
                }
                else if(this.genre == "chevalier"){
                    wave.splice(num,1);  //si plus de pv delete du tableau
                    player.vie-=3;
                }
                else if(this.genre == "roi"){
                    wave.splice(num,1);  //si plus de pv delete du tableau
                    player.vie-=5;
                }    
        }
    };
}
