class GameSession{
    addCanvas() {
        // Create the canvas
        this.canvas = window.document.createElement('canvas');
        this.canvas.id = 'gameCanvas';
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 12 * 64;
        this.canvas.height = 12 * 64;
        window.document.body.appendChild(this.canvas);
    }
    SetLevel(Level)
    {
        this.Level = Level;
    }
    handleGameExit() {
        // reset everything to zero
        this.Level.enemiesMoving = [];
        this.Level.towersAlive = [];
    }
    main()
    {
        var now = Date.now();
        var delta = now - then;
        this.render();
        then = now;
    }
    render()
    {
        // if (bgReady) {
        // 	ctx.drawImage(bgImage, 0, 0);
        // }
        if (tilesReady) {
            for (var c = 0; c < this.Level.cols; c++) {
                for (var r = 0; r < this.Level.rows; r++) {
                    var tile = this.Level.getTile(c, r);
                    if (tile !== 0) {
                        // 0 => empty tile
                        this.ctx.drawImage(
                            tiles, // image
                            (tile % 23) * this.Level.tsize, // source x
                            Math.floor(tile / 23) * this.Level.tsize, // source y
                            this.Level.tsize, // source width
                            this.Level.tsize, // source height
                            c * this.Level.tsize, // target x
                            r * this.Level.tsize, // target y
                            this.Level.tsize, // target width
                            this.Level.tsize // target height
                        );
                    }
                }
            }

            // draw enemies
            for (var i = 0; i < this.Level.enemiesMoving.length; i++) {
                let enemy = this.Level.enemiesMoving[i];
                let tile = enemy[3];
                if (tile !== 0) {
                    // 0 => empty tile
                    this.ctx.drawImage(
                        tiles, // image
                        (tile % 23) * this.Level.tsize, // source x
                        Math.floor(tile / 23) * this.Level.tsize, // source y
                        this.Level.tsize, // source width
                        this.Level.tsize, // source height
                        enemy[0] * this.Level.tsize, // target x
                        enemy[1] * this.Level.tsize, // target y
                        this.Level.tsize, // target width
                        this.Level.tsize // target height
                    );
                }
            }

            // draw towers
            for (var i = 0; i < this.Level.towersAlive.length; i++) {
                let tower = this.Level.towersAlive[i];
                let tile = tower[2];
                if (tile !== 0) {
                    // 0 => empty tile
                    ctx.drawImage(
                        tiles, // image
                        (tile % 23) * this.Level.tsize, // source x
                        Math.floor(tile / 23) * this.Level.tsize, // source y
                        this.Level.tsize, // source width
                        this.Level.tsize, // source height
                        tower[0] * this.Level.tsize, // target x
                        tower[1] * this.Level.tsize, // target y
                        this.Level.tsize, // target width
                        this.Level.tsize // target height
                    );
                }
            }
        }
    }
}

window.GameSession = GameSession;