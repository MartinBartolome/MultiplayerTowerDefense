const {GameUpdateMessage} = require("../communication/ClientMessages/GameUpdateMessage");
const Message = require("../communication/Message");
const {Enemy} = require("./Objects/Enemy");
const WebSocket = require("ws");

class Game{

    constructor(Server, Level) {
        this.runningLevel = Level;
        this.Enemys = [];
        this.Towers = [];
        this.server = Server;
    }
    Tick(i)
    {
        if ((i + 1) % 3 == 0) {
            //this.shoot();
        }
        if (i % 4 == 0) {
            this.spawnEnemy();
        }
        //this.moveEnemies();
    }
    spawnEnemy() {
        let topRow = this.runningLevel.walkway[0];
        let x = topRow.indexOf(1);
        let y = 0;
        let enemy = new Enemy(x,y,100,247);
        this.Enemys.push(enemy)
        let message = new GameUpdateMessage(Message.UpdateType.EnemySpawn,0,0,this.Enemys)
        this.broadcast(message);
    }

    addTower(updatemessage) {
        this.Level.towersAlive.push([updatemessage.x, updatemessage.y, updatemessage.objectid])
    }

    moveEnemies() {
        this.Level.enemiesMoving.forEach(enemy => {
            if (
                enemy[1] == 0 ||
                enemy[1] == 1 ||
                enemy[1] == 3 ||
                enemy[1] == 4 ||
                enemy[1] == 5 ||
                enemy[1] == 7 ||
                enemy[1] == 9 ||
                enemy[1] == 10 ||
                (enemy[1] == 2 && enemy[0] == 2) ||
                (enemy[1] == 6 && enemy[0] == 4) ||
                (enemy[1] == 8 && enemy[0] == 5) ||
                enemy[1] == 11
            ) {
                enemy[1]++;
            } else if (enemy[1] == 2 && enemy[0] == 3) {
                enemy[0]--;
            } else if (
                (enemy[1] == 6 && enemy[0] == 2) ||
                (enemy[1] == 6 && enemy[0] == 3) ||
                (enemy[1] == 8 && enemy[0] == 4)
            ) {
                enemy[0]++;
            }
            if (enemy[1] == 12) {
                // lost game!
                console.log('you lost!');
                this.Level.enemiesMoving.shift();
            }
        });
        let message = new GameUpdateMessage(Message.UpdateType.EnemyMoving,0,0,0);
        broadcast(message)
    }
    shoot() {
        console.log('shot', this.Level.towersAlive)
        for (var i = 0; i < this.Level.towersAlive.length; i++) {
            var activeTower = this.Level.towersAlive[i];
            if (this.Level.enemiesMoving.length != 0) {
                let activeEnemy = map.enemiesMoving[0];
                activeEnemy[2] = activeEnemy[2] - calculateShot(activeTower, activeEnemy[2]);
                // create message and broadcast it
                if (activeEnemy[2] <= 0) {
                    this.Level.enemiesMoving.shift();
                }
            }
        }
    }

    calculateShot(tower, activeEnemyHp) {
        console.log("calculating shot")
        let enemy = this.Level.enemiesMoving[0];
        let diffX = Math.abs(tower[0] - enemy[0]);
        let diffY = Math.abs(tower[1] - enemy[1]);
        let distance = Math.sqrt(diffX * diffX + diffY * diffY) + 1;
        let randomNumber = Math.floor(Math.random() * 17); // zwischen 1 und 17 // 15.5 ist max
        if (distance < randomNumber) {
            // here, we can also adjust difficulty
            // if hit, send message already here
            let value = {
                enemyX: enemy[0],
                enemyY: enemy[1],
                enemyHp: activeEnemyHp,
                towerX: tower[0],
                towerY: tower[1]
            };
            let message = createMessage(Message.MessageType.SHOT, value);
            broadcast(message);
            console.log('hit: ', 50 / distance);
            return 50 / distance;
        } else {
            console.log('miss');
            return 0;
        }
    }
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