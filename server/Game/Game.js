const {GameUpdateMessage} = require("../communication/ClientMessages/GameUpdateMessage");
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
        this.NumVague = 0;
        this.nbUnitParVague = 0;
        this.nbVagueTotal;
        this.nbUnit = 0;
    }


    Tick(i)
    {
        if ((i + 1) % 3 == 0) {
            //this.shoot();
        }
        if (i % 2 == 0) {
            this.spawner();
        }
        //this.moveEnemies();
    }
    forceNextWave()
    {
        this.canSpawn = true;
        this.NumVague+=1;
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
                        this.nbVagueTotal = 5;
                        if(this.NumVague==1){
                            this.nbUnitParVague = 4;
                            this.ennemiSpawn(j*30+15,i*30,100,1,"sol",'./images/eclaireur.png',"peon",2,800);
                            setTimeout('this.ennemiSpawn(' +(j*30+15)+ ',' +(i*30+15)+ ',' +100+ ',' +1+ ',"sol","./images/ecuyer.png","peon",' +2+ ',' +800+ ')', 1800);
                        }
                        if(this.NumVague==2){
                            this.nbUnitParVague = 5;
                            this.ennemiSpawn(j*30+15,i*30+15,100,1,"sol",'./images/eclaireur.png',"peon",5,800);
                        }
                        if(this.NumVague==3){
                            this.nbUnitParVague = 5;
                            this.ennemiSpawn(j*30+15,i*30+15,100,1,"sol","./images/soldat.png","soldat",5,800);
                        }
                        if(this.NumVague==4){
                            this.nbUnitParVague = 5;
                            this.ennemiSpawn(j*30+15,i*30+15,100,1,"sol",'./images/knight.png',"chevalier",5,800);
                        }
                        if(this.NumVague==5){
                            this.ennemiSpawn(j*30+15,i*30+15,100,1,"air",'./images/flybig.png',"chevalier",5,800);
                        }
                    }
                    if(this.lvl==2){
                        this.nbVagueTotal = 5;
                        if(this.NumVague==1){
                            this.ennemiSpawn(j*30+15,i*30+15,100,1,"sol",'./images/eclaireur.png',"peon",5,800);
                        }
                        if(this.NumVague==2){
                            this.ennemiSpawn(j*30+15,i*30+15,100,1,"sol",'./images/soldat.png',"soldat",5,800);
                        }
                        if(this.NumVague==3){
                            this.ennemiSpawn(j*30+15,i*30+15,100,1,"sol",'./images/knight.png',"peon",6,800);
                        }
                        if(this.NumVague==4){
                            this.ennemiSpawn(j*30+15,i*30+15,100,1,"air",'./images/flybig.png',"chevalier",3,800);
                        }
                        if(this.NumVague==5){
                            this.ennemiSpawn(j*30+15,i*30+15,100,1,"air",'./images/flybig.png',"chevalier",6,800);
                        }
                    }
                    if(this.lvl==3){
                        this.nbVagueTotal = 5;
                        if(this.NumVague==1){
                            this.ennemiSpawn(j*30+15,i*30+15,100,1,"sol",'./images/eclaireur.png',"peon",5,800);
                        }
                        if(this.NumVague==2){
                            this.ennemiSpawn(j*30+15,i*30+15,100,1,"air",'./images/eclaireur.png',"peon",5,800);
                        }
                        if(this.NumVague==3){
                            this.ennemiSpawn(j*30+15,i*30+15,100,1,"sol",'./images/ecuyer.png',"peon",5,800);
                        }
                        if(this.NumVague==4){
                            this.ennemiSpawn(j*30+15,i*30+15,100,1,"sol",'./images/ecuyer.png',"peon",5,800);
                        }
                        if(this.NumVague==5){
                            this.ennemiSpawn(j*30+15,i*30+15,100,1,"sol",'./images/ecuyer.png',"peon",5,800);
                        }
                    }
                    if(this.lvl==4){
                        this.nbVagueTotal = 5;
                        if(this.NumVague==1){
                            this.ennemiSpawn(j*30+15,i*30+15,100,1,"sol",'./images/eclaireur.png',"peon",5,800);
                        }
                        if(this.NumVague==2){
                            this.ennemiSpawn(j*30+15,i*30+15,100,1,"air",'./images/eclaireur.png',"peon",5,800);
                        }
                        if(this.NumVague==3){
                            this.ennemiSpawn(j*30+15,i*30+15,100,1,"sol",'./images/ecuyer.png',"peon",5,800);
                        }
                        if(this.NumVague==4){
                            this.ennemiSpawn(j*30+15,i*30+15,100,1,"sol",'./images/ecuyer.png',"peon",5,800);
                        }
                        if(this.NumVague==5){
                            this.ennemiSpawn(j*30+15,i*30+15,100,1,"sol",'./images/ecuyer.png',"peon",5,800);
                        }
                    }
                }
            }
        }
    }
    ennemiSpawn(x, y, pv, speed, type, sprite, genre,nbUnitParVague,intervalEntreEnnemi)
    {
        let enemy = new Enemy(x, y, pv, speed, type, sprite, genre);
        this.wave.push(enemy);
        this.nbUnit++;
        if (this.nbUnit >= nbUnitParVague)
        {
            this.nbUnit = 0;
            this.canSpawn = false;
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