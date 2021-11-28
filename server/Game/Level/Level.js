class Level {
    constructor() {
        this.cols = 12;
        this.rows = 12;
        this.tsize = 64;
        this.tiles = [];
        this.enemiesMoving = [];
        this.towersAlive = [];
    }

    getTile(col,row){
        return this.tiles[row][col];
    }
}
module.exports = {
    Level : Level
}