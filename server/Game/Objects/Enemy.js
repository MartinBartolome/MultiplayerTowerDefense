class Enemy
{
    constructor(x, y, pv, speed, type, sprite, genre) {
        this.freezy = 1;
        this.genre = genre;
        this.x = x;
        this.y = y;
        this.tableIndex = Math.floor((x)/30);
        this.tableData = Math.floor((y)/30);
        this.path = []; // Overall board
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