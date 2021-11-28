class Level {
    constructor(data ) {
        this.cols = data.cols;
        this.rows = data.rows;
        this.tsize = data.tsize;
        this.tiles = data.tiles;
        this.enemiesMoving = data.enemiesMoving;
        this.towersAlive = data.towersAlive;
    }

    getTile(col,row){
        return this.tiles[row][col];
    }
}

window.Level = Level;