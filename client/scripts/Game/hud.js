var selected=false;
function nextWaveForced()
{
    let GameUpdateMessage = new window.GameUpdateMessage(UpdateType.Wave);
    websocketGame.socket.send(GameUpdateMessage.toStream());
    player.geld += (1*20);
}
function checkSpawn()
  {
      if((wave.length == 0) || (wave.length == 5))
      {
        document.getElementById("buttonspawn").style.display = "inline";
      }
      else
      {
        document.getElementById("buttonspawn").style.display = "none";
      }
  }

function kk1()
{
  player.selectedtower=1;
  document.getElementById("tower").style.backgroundImage ="url('images/solbuttonover.png')";
  document.getElementById("tower2").style.backgroundImage ="url('images/airbutton.png')";
  document.getElementById("tower3").style.backgroundImage ="url('images/freezebutton.png')";
}
function kk2()
{
  player.selectedtower=2;
  document.getElementById("tower").style.backgroundImage ="url('images/solbutton.png')";
  document.getElementById("tower2").style.backgroundImage ="url('images/airbuttonover.png')";
  document.getElementById("tower3").style.backgroundImage ="url('images/freezebutton.png')";
}
function kk3()
{
  player.selectedtower=3;
  document.getElementById("tower").style.backgroundImage ="url('images/solbutton.png')";
  document.getElementById("tower2").style.backgroundImage ="url('images/airbutton.png')";
  document.getElementById("tower3").style.backgroundImage ="url('images/freezebuttonover.png')";
}

function Scoring()
{
    var addLife = document.getElementById("leben")
    addLife.innerHTML = "lebens : " + player.leben;
    var addgeld = document.getElementById("geld")
    addgeld.innerHTML = "geld : " + player.geld;
    var addWelle = document.getElementById("welle")
    addWelle.innerHTML = "Welle : " + wavecounter + " / 5";
}
function Win()
{
  if(wavecounter == 5){
    var nospawn = document.getElementById("buttonspawn")
    nospawn.style.display = "none";
   }
   if(wavecounter == (5) && player.leben >= 1){
    document.getElementById("win").style.display = "inline";
   }
   if(player.leben <= 0){
    var loose = document.getElementById("loose")
    loose.style.display = "inline";
   }
}

function getinfobox()
{
  if(player.selectedtower==1)
  {
    document.getElementById("infobox").innerHTML = "Art des Turms : Land <br>Kaufpreis: 50 Geld";
  }
  if(player.selectedtower==2)
  {
    document.getElementById("infobox").innerHTML = "Art des Turms : Luft <br>Kaufpreis : 50 geld";
  }
  if(player.selectedtower==3)
  {
    document.getElementById("infobox").innerHTML = "Art des Turms : Eis<br>Kaufpreis : 50 geld";
  }
}