class Level {
    constructor() {
        this.cols = 12;
        this.rows = 12;
        this.tsize = 64;
        this.tiles = [];
        this.walkway = [];
        this.enemiesMoving = [];
        this.towersAlive = [];
    }

    getTile(col,row){
        return this.tiles[row][col];
    }
    getStartTile(){
        return this.walkway[0][0];
    }
}
module.exports = {
    Level : Level
}