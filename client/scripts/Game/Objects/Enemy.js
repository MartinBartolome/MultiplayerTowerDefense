class Enemy
{
    constructor() {

    }
    fromStream(data)
    {
        this.id = data.id;
        this.x = data.x;
        this.y = data.y;
        this.hp = data.hp;
    }
}
window.Enemy = Enemy;