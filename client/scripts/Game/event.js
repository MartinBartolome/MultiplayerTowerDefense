canvas.onclick= function(ev)
{
  const x = Math.floor(ev.offsetX / 30);
  const y = Math.floor(ev.offsetY / 30);
  console.log(level[y][x]);
  if(level[y][x] === 2)
  {
    if(player.selectedtower===1 && player.geld >= 50)
    {
      level[y][x] = 5;
      player.geld-=50;
      towers.push(new Tower("sol", 200, x, y,25,1));
    }
    if(player.selectedtower===2 && player.geld >= 50)
    {
      level[y][x] =5;
      player.geld-=50;
      towers.push(new Tower("air", 200, x, y,50,1));
    }
    if(player.selectedtower===3 && player.geld >= 50)
    {
      level[y][x]=5;
      player.geld-=50;
      towers.push(new Tower("freeze", 200, x, y,0.6,1));
    }
    let GameUpdateMessage = new window.GameUpdateMessage(UpdateType.Level,level);
    websocketGame.socket.send(GameUpdateMessage.toStream());
    GameUpdateMessage = new window.GameUpdateMessage(UpdateType.Player,player);
    websocketGame.socket.send(GameUpdateMessage.toStream());
    GameUpdateMessage = new window.GameUpdateMessage(UpdateType.Tower,towers);
    websocketGame.socket.send(GameUpdateMessage.toStream());
  }
}