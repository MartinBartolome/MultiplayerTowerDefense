/*******************************************************************************
*Variables de definition pour les canvas
********************************************************************************/
var canvas,
    context,
    elem          = document.getElementById("canvas"),
    canvas_width  = 900,
    canvas_height = 900,
    cell_size     = 30,
    frameCount    = 0,
    nbUnit        = 0;
    lvl=1;
/*******************************************************************************
*Variable des ennemis
********************************************************************************/
var wave     = [],
    missiles = [],
    towers   = [];

