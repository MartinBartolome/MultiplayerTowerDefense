const Tower = function (type, range, x, y, damage, upgrade) {
    this.type = type;
    this.range = range;
    this.x = x;
    this.y = y;
    this.upgrade = upgrade;
    this.damage = damage;
    const img = new Image();
    this.angle=0;
    let enemydistance = -1;
    this.canshoot = false;
    let frameSpriteSheet = 0;
    this.check = function () {
        this.canshoot = false;
        if (wave[0] != null) {
            for (let i = 0; i < wave.length; i++) {
                const distance = Math.sqrt(Math.pow(((wave[i].x) - this.x * 30), 2) + Math.pow(((wave[i].y) - this.y * 30), 2));
                if (this.range > distance && frameCount % 60 === 0 && this.type === wave[i].type) {
                    enemydistance = i;
                    this.canshoot = true;
                }
                if (this.range > distance && frameCount % 60 === 0 && this.type === "freeze") {
                    enemydistance = i;
                    this.canshoot = true;
                }
            }
        }
    };
    this.shoot = function () {
        if (this.canshoot === true && this.type === "sol") {
            this.angle = (Math.atan2(this.x * 30 - wave[enemydistance].x, this.y * 30 - wave[enemydistance].y)) + Math.PI / 2;
            missiles.push(new Missile(this.x, this.y, this.angle, this.damage * this.upgrade, this.type));
        }
        if (this.canshoot === true && this.type === "air") {
            this.angle = (Math.atan2(this.x * 30 - wave[enemydistance].x, this.y * 30 - wave[enemydistance].y)) + Math.PI / 2;
            missiles.push(new Missile(this.x, this.y, this.angle, this.damage * this.upgrade, this.type));
        }
        if (this.canshoot === true && this.type === "freeze") {
            this.angle = (Math.atan2(this.x * 30 - wave[enemydistance].x, this.y * 30 - wave[enemydistance].y)) + Math.PI / 2;
            missiles.push(new Missile(this.x, this.y, this.angle, this.damage / this.upgrade, this.type));
        }
    };
    this.draw = function () {
        img.src = "./images/" + this.type + this.upgrade + ".png";
        if (this.type === "freeze") {
            context.drawImage(img, (this.x * 30) - 10, (this.y * 30) - 20, 50, 50);
        } else {
            context.drawImage(img, 50 * frameSpriteSheet, 0, 50, 50, (this.x * 30) - 10, (this.y * 30) - 20, 50, 50);

            frameSpriteSheet++;
            if (frameSpriteSheet === 9) {
                frameSpriteSheet = 0;
            }
        }


    };
};
