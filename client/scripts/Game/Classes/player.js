/**
 * Spieler mit gestartetem Level, selektierem Tower, sowie das geld und das Leben
 * @param lvl
 * @constructor
 */
const Player = function (lvl) {
    this.lvl = lvl;
    this.selectedtower = 0;
    this.geld = 100;
    this.leben = 20;
};
