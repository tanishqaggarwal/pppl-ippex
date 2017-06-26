var circuitflow_stagewidth = 600;
var circuitflow_stageheight = 400;

var circuitflow_stage = new PIXI.Container(),
    circuitflow_renderer = PIXI.autoDetectRenderer(circuitflow_stagewidth, circuitflow_stageheight,{
            view : document.getElementById("circuit-flow-canvas"),
            antialiasing : false,
            transparent : true,
            resolution : 1}
            );

PIXI.loader.add([
"/modules/res/images/module-1/wall-plug.png",
]).load(circuitflow_setup);

var wire_track = [{
	start : [50,350],
	end : [500,350],
},
{
	start : [500,350],
	end : [500,300],
},
//RANDOM MOTION WITHIN PLASMA HERE
{
	start : [500,150],
	end : [500,100],
},
{
	start : [500,100],
	end : [300,100],
},
{
	start : [300,100],
	end : [300,300],
},
{
	start : [300,300],
	end : [50,300],
}]

function electron_texture(particlewidth, renderer) {
	dottexture = new PIXI.RenderTexture(renderer, 2 * particlewidth, 2 * particlewidth);
	var graphics = new PIXI.Graphics();
	graphics.beginFill(0xff0000);
	graphics.drawCircle(particlewidth, particlewidth, particlewidth);
	graphics.endFill();
	dottexture.render(graphics);

	return dottexture;
}

var circuitflow_numelectrons;
var circuitflow_electrons = new Array();

function circuitflow_setup() {
	// var plug = new PIXI.Sprite(PIXI.loader.resources["/modules/res/images/module-1/wall-plug.png"].texture);
	// plug.scale.set(0.5,0.5); //sprite size is now 100 x 83
	// plug.x = 450;
	// plug.y = 267;
	// module_1_stage.addChild(plug);

	electronwidth = 2;

	for(var i = 0; i < wire_track.length; i++) {
		track = wire_track[i];
		track_displacement = track.end.subtract(track.start);
		track_length = track_displacement.magnitude();
		track_electrons = track_length / 40.0 / electronwidth;

		//Interval in which electrons should be placed
		xstep = Math.floor(track_displacement[0] / 40.0 / electronwidth);
		ystep = Math.floor(track_displacement[1] / 40.0 / electronwidth);
		for(var j = 0; j < track_electrons; j++) {
			electron_obj = new PIXI.Sprite(electron_texture(electronwidth, circuitflow_renderer));
			electron_obj.anchor.set(0.5);
			electron_obj.x = track.start[0] + j * xstep;
			electron_obj.y = track.start[1] + j * ystep;

			electron_obj.path_number = i;

			circuitflow_electrons.push(electron_obj);
			circuitflow_stage.addChild(electron_obj);
		}
	}

	circuitflow_renderer.render(circuitflow_stage);
	circuitflow_animation_loop();
}

var movement_scaler = 0.005;
function circuitflow_animation_loop() {	

	requestAnimationFrame(circuitflow_animation_loop);
	// for(var i = 0; i < circuitflow_numelectrons; i++) {
	// 	electron_obj = circuitflow_electrons[i];
	// 	currentpath = wire_track[electron_obj.path_number];
	// 	displacement_vector = currentpath.end.subtract(currentpath.start);
	// 	projection = displacement_vector.sproduct(movement_scaler);

	// 	currentpos = [electron_obj.x, electron_obj.y];
	// 	newpos = currentpos.add(projection);
	// 	if(newpos.subtract(currentpath.start).greaterMag(displacement_vector)) { //If the new position overextends the path
	// 		electron_obj.path_number++;
	// 		console.log("ELECTRON #" + i + " CHANGED TO PATH: " + electron_obj.path_number);
	// 		if (electron_obj.path_number == wire_track.length) {
	// 			electron_obj.path_number = 0;
	// 		}

	// 		currentpath = wire_track[electron_obj.path_number];
	// 		displacement_vector = currentpath.end.subtract(currentpath.start);
	// 		projection = displacement_vector.sproduct(movement_scaler);

	// 		currentpos = [electron_obj.x, electron_obj.y];
	// 		newpos = currentpos.add(projection);
	// 	}
	// 	electron_obj.x = newpos[0];
	// 	electron_obj.y = newpos[1];
	// }

	circuitflow_renderer.render(circuitflow_stage);
}