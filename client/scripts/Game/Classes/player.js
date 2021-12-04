var Player = function(lvl)
{
    this.lvl = lvl;
/*******************************************************************************
*Variables des tours
********************************************************************************/
    this.destroy = false;
    this.up = false;
    this.selectedtower = 0;
/*******************************************************************************
*Variables de l'HUD
********************************************************************************/
    this.or = 100;
    this.vie = 20;
    this.vague = 0;
/*******************************************************************************
*Variables de la spécial feature
********************************************************************************/
    this.time = false;
    this.timing= 180;

    this.special = function()
    {
      if(this.time == true){
          this.timing-=1;
      }
      
      if(this.timing == 0){
          this.time = false;
      }
      
      if(this.time==true){
        for (var i = 0; i < wave.length; i++)
          {
            wave[i].speed = 0;
          }
      }
      if(this.time==false){
        for (var i = 0; i < wave.length; i++)
          {
            wave[i].speed = 1;
          }
      }
    }
}
