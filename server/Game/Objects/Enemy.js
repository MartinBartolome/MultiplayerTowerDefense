class Enemy
{
    constructor(x, y, hp,id) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.hp = hp;
    }

}
module.exports = {
    Enemy : Enemy
}