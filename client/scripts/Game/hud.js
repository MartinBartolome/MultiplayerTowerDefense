const selected = false;

/**
 * Button zum starten einer neuen Welle
 */
function nextWaveForced()
{
    let GameUpdateMessage = new window.GameUpdateMessage(UpdateType.Wave);
    websocketGame.socket.send(GameUpdateMessage.toStream());
    player.geld += (wavecounter);
}

/**
 * prüfen ob die Welle vorbei ist
 */
function checkSpawn()
  {
      if((wave.length === 0) || (wave.length === 5))
      {
        document.getElementById("buttonspawn").style.display = "inline";
      }
      else
      {
        document.getElementById("buttonspawn").style.display = "none";
      }
  }

/**
 * Auswählen des ersten Turms
 */
function kk1()
{
  player.selectedtower=1;
  document.getElementById("tower").style.backgroundImage ="url('images/solbuttonover.png')";
  document.getElementById("tower2").style.backgroundImage ="url('images/airbutton.png')";
  document.getElementById("tower3").style.backgroundImage ="url('images/freezebutton.png')";
}
/**
 * Auswählen des zweiten Turms
 */
function kk2()
{
  player.selectedtower=2;
  document.getElementById("tower").style.backgroundImage ="url('images/solbutton.png')";
  document.getElementById("tower2").style.backgroundImage ="url('images/airbuttonover.png')";
  document.getElementById("tower3").style.backgroundImage ="url('images/freezebutton.png')";
}
/**
 * Auswählen des dritten Turms
 */
function kk3()
{
  player.selectedtower=3;
  document.getElementById("tower").style.backgroundImage ="url('images/solbutton.png')";
  document.getElementById("tower2").style.backgroundImage ="url('images/airbutton.png')";
  document.getElementById("tower3").style.backgroundImage ="url('images/freezebuttonover.png')";
}

/**
 * Anzeigen des Lebens, Geldes und der aktuellen Welle
 * @constructor
 */
function Scoring()
{
    const addLife = document.getElementById("leben");
    addLife.innerHTML = "leben : " + player.leben;
    const addgeld = document.getElementById("geld");
    addgeld.innerHTML = "geld : " + player.geld;
    const addWelle = document.getElementById("welle");
    addWelle.innerHTML = "Welle : " + wavecounter + " / 5";
}

/**
 * Anzeige, wenn der Spieler gewonnen hat
 * @constructor
 */
function Win()
{
  if(win){
      const nospawn = document.getElementById("buttonspawn");
      nospawn.style.display = "none";
   }
   if(win && player.leben >= 1){
    document.getElementById("win").style.display = "inline";
   }
   if(!win)
   {
       document.getElementById("win").style.display = "none";
   }
   if(player.leben <= 0){
       const loose = document.getElementById("loose");
       loose.style.display = "inline";
   }
   else
   {
       const loose = document.getElementById("loose");
       loose.style.display = "none";
       const wait = document.getElementById("waitonplayer");
       wait.innerHTML = "";
   }
}

function waitonplayer()
{
    const loose = document.getElementById("waitonplayer");
    loose.innerHTML = "Warte auf weitere Spieler";
}

/**
 * Zeigen der Informationen zum Turm
 */
function getinfobox()
{
  if(player.selectedtower===1)
  {
    document.getElementById("infobox").innerHTML = "Art des Turms : Land <br>Kaufpreis: 50 Geld";
  }
  if(player.selectedtower===2)
  {
    document.getElementById("infobox").innerHTML = "Art des Turms : Luft <br>Kaufpreis : 50 geld";
  }
  if(player.selectedtower===3)
  {
    document.getElementById("infobox").innerHTML = "Art des Turms : Eis<br>Kaufpreis : 50 geld";
  }
}
