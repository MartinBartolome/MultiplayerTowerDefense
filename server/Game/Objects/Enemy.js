class Enemy
{
    constructor(x, y, pv, speed, type, sprite, genre) {
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
        var spritelol = 32;
        var spriteigloo = 65;
        var frameSpriteSheet = 0;
    }

}
module.exports = {
    Enemy : Enemy
}