/**
 * Objekt für den Feind
 */
class Enemy
{
    constructor(x, y, pv, speed, type, sprite, genre, wave) {
        this.freezy = 1;
        this.genre = genre;
        this.x = x;
        this.y = y;


         // Overall board
        this.speed = (speed*this.freezy);
        this.pv = pv;

        this.type = type;


        this.sprite = sprite;
        this.wave = wave;
    }

}
module.exports = {
    Enemy : Enemy
}
