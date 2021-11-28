class Level {
    constructor() {
    }

    getTile(col,row){
        return this.tiles[row][col];
    }
}

window.Level = Level;