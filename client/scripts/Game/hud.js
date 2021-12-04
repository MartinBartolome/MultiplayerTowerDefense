var selected=false;
function nextWaveForced()
{
    let GameUpdateMessage = new window.GameUpdateMessage(UpdateType.Wave);
    websocketGame.socket.send(GameUpdateMessage.toStream());
    player.or += (1*20);
}
function checkSpawn()
  {
      /*if((wave.length == 0) || (wave.length == spawn.nbUnitParVague))
      {
        document.getElementById("buttonspawn").style.display = "inline";
      }
      else
      {
        spawn.canSpawn = false;
        document.getElementById("buttonspawn").style.display = "none";
      }*/
  }

function kk1()
{
  player.selectedtower=1;
  document.getElementById("tower").style.backgroundImage ="url('images/solbuttonover.png')";
  document.getElementById("tower2").style.backgroundImage ="url('images/airbutton.png')";
  document.getElementById("tower3").style.backgroundImage ="url('images/freezebutton.png')";
  document.getElementById("destroy").style.backgroundImage ="url('images/down.png')";
  document.getElementById("upgrade").style.backgroundImage ="url('images/up.png')";
  player.destroy = false;
  player.up = false;
}
function kk2()
{
  player.selectedtower=2;
  document.getElementById("tower").style.backgroundImage ="url('images/solbutton.png')";
  document.getElementById("tower2").style.backgroundImage ="url('images/airbuttonover.png')";
  document.getElementById("tower3").style.backgroundImage ="url('images/freezebutton.png')";
  document.getElementById("destroy").style.backgroundImage ="url('images/down.png')";
  document.getElementById("upgrade").style.backgroundImage ="url('images/up.png')";
  player.destroy = false;
  player.up = false;
}
function kk3()
{
  player.selectedtower=3;
  document.getElementById("tower").style.backgroundImage ="url('images/solbutton.png')";
  document.getElementById("tower2").style.backgroundImage ="url('images/airbutton.png')";
  document.getElementById("tower3").style.backgroundImage ="url('images/freezebuttonover.png')";
  document.getElementById("destroy").style.backgroundImage ="url('images/down.png')";
  document.getElementById("upgrade").style.backgroundImage ="url('images/up.png')";
  player.destroy = false;
  player.up = false;
}
function upgrading()
{
  document.getElementById("upgrade").style.backgroundImage ="url('images/upover.png')";
  document.getElementById("destroy").style.backgroundImage ="url('images/down.png')";
  document.getElementById("tower").style.backgroundImage ="url('images/solbutton.png')";
  document.getElementById("tower2").style.backgroundImage ="url('images/airbutton.png')";
  document.getElementById("tower3").style.backgroundImage ="url('images/freezebutton.png')";
  player.selectedtower=0;
  player.up = true;
  player.destroy = false;
}
function destroying()
{
  document.getElementById("destroy").style.backgroundImage ="url('images/downover.png')";
  document.getElementById("upgrade").style.backgroundImage ="url('images/up.png')";
  document.getElementById("tower").style.backgroundImage ="url('images/solbutton.png')";
  document.getElementById("tower2").style.backgroundImage ="url('images/airbutton.png')";
  document.getElementById("tower3").style.backgroundImage ="url('images/freezebutton.png')";
  player.selectedtower=0;
  player.up = false;
  player.destroy = true;
}
function Scoring()
{
    var addLife = document.getElementById("vie")
    addLife.innerHTML = "Vies : " + player.vie;
    var addOr = document.getElementById("or")
    addOr.innerHTML = "Or : " + player.or;
    var addVague = document.getElementById("vague")
    //addVague.innerHTML = "Num&eacutero de vague : " + spawn.NumVague + " / 5";
    var addtime = document.getElementById("temps")
    addtime.innerHTML = (Math.floor(player.timing/60)) + " sec";
}
function Win()
{
  /*if(spawn.NumVague == spawn.nbVagueTotal){
    var nospawn = document.getElementById("buttonspawn")
    nospawn.style.display = "none";
   }
   if(spawn.NumVague == (spawn.nbVagueTotal) && player.vie >= 1){
    document.getElementById("win").style.display = "inline";
   }
   if(player.vie <= 0){
    var lose = document.getElementById("lose")
    lose.style.display = "inline";
   }*/
}
function freezing()
{
  if(selected == false && player.timing != 0){
     selected = true; 
      player.time = true;
  }
  else{
    selected=false;
    player.time = false;
  }
}

function retour()
{
  window.location.replace("membre.php");
}
function getinfotour()
{
  if(player.selectedtower==1)
  {
    document.getElementById("infotour").innerHTML = "Type de tour : Terrestre <br>Cout d'achat la tour au Niveau 1 : 50 Or <br>Cout d'upgrade de la tour vers le Niveau 2 : 100 Or <br>Cout d'upgrade de la tour vers le Niveau 3 : 200 Or ";
  }
  if(player.selectedtower==2)
  {
    document.getElementById("infotour").innerHTML = "Type de tour : A&eacuterienne <br>Cout d'achat la tour au Niveau 1 : 50 Or <br>Cout d'upgrade de la tour vers le Niveau 2 : 100 Or <br>Cout d'upgrade de la tour vers le Niveau 3 : 200 Or ";
  }
  if(player.selectedtower==3)
  {
    document.getElementById("infotour").innerHTML = "Type de tour : Ralentisseuse<br>Cout d'achat la tour au Niveau 1 : 50 Or <br>Cout d'upgrade de la tour vers le Niveau 2 : 100 Or <br>Cout d'upgrade de la tour vers le Niveau 3 : 200 Or ";
  }
}