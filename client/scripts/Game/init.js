window.onload = function()
{
    canvas        = document.getElementById("canvas");
    context       = canvas.getContext("2d");
    canvas.width  = canvas_width;
    canvas.height = canvas_height;
    player = new Player(1);
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
};

