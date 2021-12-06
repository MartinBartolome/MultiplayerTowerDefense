const {GameUpdateMessage} = require("../communication/ClientMessages/GameUpdateMessage");
const {GameStopMessage} = require("../communication/ServerMessages/GameStopMessage");
const Message = require("../communication/Message");
const {Enemy} = require("./Objects/Enemy");
const WebSocket = require("ws");

class Game{

    constructor(Server, Level) {
        this.level = Level.level;
        this.lvl = Level.lvl;
        this.wave = [];
        this.Towers = [];
        this.server = Server;

        this.canSpawn = false;
        this.NumWelle = 0;
        this.nbUnitProWelle = 0;
        this.nbWelleTotal;
        this.nbUnit = 0;
    }


    Tick(i)
    {
        if ((i + 1) % 3 == 0) {
            // this.shoot();
        }
        if (i % 2 == 0) {
            this.spawner();
        }
        //this.moveEnemies();
    }
    forceNextWave()
    {
        this.canSpawn = true;
        this.NumWelle+=1;
    }

    spawner()
    {
        for (var i = 0; i < this.level.length; i++)
        {
            for (var j = 0; j < this.level[i].length; j++)
            {
                if (this.level[i][j] == 3 && this.canSpawn == true)
                {
                    if(this.lvl==1)
                    {
                        this.nbWelleTotal = 5;
                        if(this.NumWelle==1){
                            this.nbUnitProWelle = 4;
                            this.enemySpawn(j*30+15,i*30,100,1,"sol",'./images/orange.png',"blob",2);
                        }
                        if(this.NumWelle==2){
                            this.nbUnitProWelle = 5;
                            this.enemySpawn(j*30+15,i*30+15,100,1,"sol",'./images/orange.png',"soldat",5);
                        }
                        if(this.NumWelle==3){
                            this.nbUnitProWelle = 5;
                            this.enemySpawn(j*30+15,i*30+15,100,1,"sol","./images/soldat.png","ritter",5);
                        }
                        if(this.NumWelle==4){
                            this.nbUnitProWelle = 5;
                            this.enemySpawn(j*30+15,i*30+15,100,1,"sol",'./images/knight.png',"koenig",5);
                        }
                        if(this.NumWelle==5){
                            this.enemySpawn(j*30+15,i*30+15,100,1,"air",'./images/flybig.png',"koenig",5);
                        }
                    }
                    if(this.lvl==2){
                        this.nbWelleTotal = 5;
                        if(this.NumWelle==1){
                            this.enemySpawn(j*30+15,i*30+15,100,1,"sol",'./images/orange.png',"blob",5);
                        }
                        if(this.NumWelle==2){
                            this.enemySpawn(j*30+15,i*30+15,100,1,"sol",'./images/soldat.png',"soldat",5);
                        }
                        if(this.NumWelle==3){
                            this.enemySpawn(j*30+15,i*30+15,100,1,"sol",'./images/knight.png',"ritter",6);
                        }
                        if(this.NumWelle==4){
                            this.enemySpawn(j*30+15,i*30+15,100,1,"air",'./images/flybig.png',"koenig",3);
                        }
                        if(this.NumWelle==5){
                            this.enemySpawn(j*30+15,i*30+15,100,1,"air",'./images/flybig.png',"koenig",6);
                        }
                    }
                    if(this.lvl==3){
                        this.nbWelleTotal = 5;
                        if(this.NumWelle==1){
                            this.enemySpawn(j*30+15,i*30+15,100,1,"sol",'./images/orange.png',"blob",5);
                        }
                        if(this.NumWelle==2){
                            this.enemySpawn(j*30+15,i*30+15,100,1,"air",'./images/orange.png',"soldat",5);
                        }
                        if(this.NumWelle==3){
                            this.enemySpawn(j*30+15,i*30+15,100,1,"sol",'./images/ecuyer.png',"ritter",5);
                        }
                        if(this.NumWelle==4){
                            this.enemySpawn(j*30+15,i*30+15,100,1,"sol",'./images/ecuyer.png',"koenig",5);
                        }
                        if(this.NumWelle==5){
                            this.enemySpawn(j*30+15,i*30+15,100,1,"sol",'./images/ecuyer.png',"koenig",5);
                        }
                    }
                    if(this.lvl==4){
                        this.nbWelleTotal = 5;
                        if(this.NumWelle==1){
                            this.enemySpawn(j*30+15,i*30+15,100,1,"sol",'./images/orange.png',"blob",5);
                        }
                        if(this.NumWelle==2){
                            this.enemySpawn(j*30+15,i*30+15,100,1,"air",'./images/orange.png',"blob",5);
                        }
                        if(this.NumWelle==3){
                            this.enemySpawn(j*30+15,i*30+15,100,1,"sol",'./images/ecuyer.png',"blob",5);
                        }
                        if(this.NumWelle==4){
                            this.enemySpawn(j*30+15,i*30+15,100,1,"sol",'./images/ecuyer.png',"blob",5);
                        }
                        if(this.NumWelle==5){
                            this.enemySpawn(j*30+15,i*30+15,100,1,"sol",'./images/ecuyer.png',"blob",5);
                        }
                    }
                }
            }
        }
    }
    enemySpawn(x, y, pv, speed, type, sprite, genre,nbUnitProWelle)
    {
        let enemy = new Enemy(x, y, pv, speed, type, sprite, genre, this.NumWelle);
        this.wave.push(enemy);
        this.nbUnit++;
        if (this.nbUnit > nbUnitProWelle)
        {
            this.nbUnit = 0;
            this.canSpawn = false;
            if(this.NumWelle == 5) {
                let stop = new GameStopMessage(true);
                this.broadcast(stop);
            }
        }
        else
        {
            let message2 = new GameUpdateMessage(Message.UpdateType.Wave,enemy);
            this.broadcast(message2);
        }
    };

    broadcast(data) {
        this.server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data.toStream());
            }
        });
    }
}
module.exports = {
    Game : Game

}