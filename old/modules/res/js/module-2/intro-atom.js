var introatom_stagewidth = 600;
var introatom_stageheight = 200;

var introatom_stage = new PIXI.Container();
var introatom_renderer = PIXI.autoDetectRenderer(introatom_stagewidth, introatom_stageheight,{
        view : document.getElementById("introatom"),
        antialiasing : false,
        transparent : true,
        resolution : 1
    });