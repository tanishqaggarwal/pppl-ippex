var trfjam_stagewidth = 600;
var trfjam_stageheight = 50;

var trfjam_particlewidth = 5;
var trfjam_separation = 10;

var trfjam_stage = new PIXI.Container(),
    trfjam_renderer = PIXI.autoDetectRenderer(trfjam_stagewidth, trfjam_stageheight,{
            view : document.getElementById("traffic-jam-canvas"),
            antialiasing : false,
            transparent : true,
            resolution : 1}
            );

var trfjam_electrons = new Array();
var num_trfjam_electrons = (trfjam_stagewidth - 50.0) / (2 * trfjam_particlewidth + trfjam_separation);

var og_vx = 10;
function trfjam_setup() {
	for(var i = 0; i < num_trfjam_electrons; i++) {
		e = new PIXI.Sprite(circle_texture(trfjam_particlewidth, trfjam_renderer));
		e.x = 0 - trfjam_particlewidth - trfjam_separation * i;
		e.y = trfjam_stageheight / 2;
		e.v_x = og_vx;

		trfjam_stage.addChild(e);
		trfjam_electrons.push(e);
	}

	trfjam_animationLoop();
}

var deceleration = (og_vx * og_vx) / (2.0 * (trfjam_stagewidth - 50.0)); //slow down enough to come to a stop within the interval
var frozen = false; //for debugging purposes; allows the simulation to freeze
function trfjam_animationLoop() {
	for(var i = 0; i < num_trfjam_electrons; i++) {
		e = trfjam_electrons[i];
		if (!frozen) {
			if (e.x > 0 && e.x <= (trfjam_stagewidth - 50.0) - 2 * trfjam_particlewidth - trfjam_separation * i) {
				e.v_x = Math.sqrt(100 - 2 * deceleration * e.x);
			}
			else if (e.x > (trfjam_stagewidth - 50.0) - 2 * trfjam_particlewidth - trfjam_separation * i) {
				e.v_x = 0;
			}
			else {
				e.v_x = og_vx;
			}
		}
		else {
			e.v_x = 0;
		}
		e.x += e.v_x;
	}

	trfjam_renderer.render(trfjam_stage);
	requestAnimationFrame(trfjam_animationLoop);
}

$("#traffic-jam-canvas").keypress(function(e) {
	if (e.keyCode == 70) {
		frozen = !frozen;
	}
});

trfjam_setup();