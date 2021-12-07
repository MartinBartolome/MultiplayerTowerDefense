/**
 * Funktion für einen Schuss
 * @param x
 * @param y
 * @param angle
 * @param damage
 * @param type
 * @constructor
 */
const Missile = function (x, y, angle, damage, type) {
    this.x = x * 30;
    this.y = y * 30;
    this.angle = angle;
    this.damage = damage;
    this.type = type;
    this.critical = false;
    const img = new Image();

    /**
     * Bewegen des Schusses in die richtung des Feindes
     */
    this.move = function () {
        this.x += Math.cos(this.angle) * 8;
        this.y -= Math.sin(this.angle) * 8;
    }
    /**
     * Zeichnen des Schusses
     */
    this.draw = function () {
        img.src = "./images/" + this.type + "ball.png";
        context.drawImage(img, this.x, this.y, 20, 20);
    }
    /**
     * Explodieren lassen des Schusses
     * @param i
     */
    this.explode = function (i) {
        for (let y = 0; y < wave.length; y++) {
            if (this.x <= (wave[y].x + 30) && (this.x + 30) >= (wave[y].x) && this.y <= (wave[y].y + 30) && (this.y + 30) >= (wave[y].y)) {
                missiles.splice(i, 1);
                if (wave[y].genre === "blob") {
                    if (this.type === "freeze") {
                        wave[y].froze = true;
                        wave[y].freezy = this.damage;
                        break;
                    } else {
                        if (this.critical === true) {
                            wave[y].damage(y, (this.damage * 2));
                            break;
                        } else {
                            wave[y].damage(y, (this.damage));
                            break;
                        }
                    }
                } else if (wave[y].genre === "soldat") {
                    if (this.type === "freeze") {
                        wave[y].froze = true;
                        wave[y].freezy = this.damage;
                        break;
                    } else {
                        if (this.critical === true) {
                            wave[y].damage(y, (this.damage * 2) / 2);
                            break;
                        } else {
                            wave[y].damage(y, (this.damage) / 2);
                            break;
                        }
                    }
                } else if (wave[y].genre === "ritter") {
                    if (this.type === "freeze") {
                        wave[y].froze = true;
                        wave[y].freezy = this.damage;
                        break;
                    } else {
                        if (this.critical === true) {
                            wave[y].damage(y, (this.damage * 2) / 4);
                            break;
                        } else {
                            wave[y].damage(y, (this.damage) / 4);
                            break;
                        }
                    }
                } else if (wave[y].genre === "koenig") {
                    if (this.type === "freeze") {
                        wave[y].froze = true;
                        wave[y].freezy = this.damage;
                        break;
                    } else {
                        if (this.critical === true) {
                            wave[y].damage(y, (this.damage * 2) / 8);
                            break;
                        } else {
                            wave[y].damage(y, (this.damage) / 8);
                            break;
                        }
                    }
                }
            }
        }
        if ((this.x < 0) || (this.x > 900) || (this.y < 0) || (this.y > 900)) {
            missiles.splice(i, 1);
        }
    }
};
