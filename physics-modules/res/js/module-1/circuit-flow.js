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
"/physics-modules/res/images/module-1/wall-plug.png",
]).load(circuitflow_setup);

var electron_width = 5;

var wire_track = [{
	start : [50,350],
	end : [500,350],
},
{
	start : [500,350 + 2 * electron_width],
	end : [500,300],
},
//RANDOM MOTION WITHIN PLASMA HERE
{
	start : [500,150],
	end : [500,100 - 2 * electron_width],
},
{
	start : [500,100],
	end : [300 - 2 * electron_width,100],
},
{
	start : [300,100],
	end : [300,300 - 2 * electron_width],
},
{
	start : [300,300],
	end : [50,300],
}];

function find_total_length() {
	length = 0;
	for(var i = 0; i < wire_track; i++) {
		length += wire_track[i].end.subtract(wire_track[i].start).magnitude();
	}
	return length;
}

function electron_flow_texture(particlewidth, renderer) {
	dottexture = new PIXI.RenderTexture(renderer, 6 * particlewidth, 2 * particlewidth);
	var graphics = new PIXI.Graphics();
	graphics.beginFill(0x0000ff);
	graphics.drawCircle(particlewidth, particlewidth, particlewidth);
	graphics.endFill();
	graphics.beginFill(0xffffff);
	graphics.drawRect(2 * particlewidth, 0, 4 * particlewidth, 2 * particlewidth);
	graphics.endFill();
	dottexture.render(graphics);

	return dottexture;
}

function setup_electron(particlewidth, renderer) {
	electron = new PIXI.Sprite(circle_texture(particlewidth, renderer));
	electron.anchor.set(0.5,0.16666);

	return electron;
}

// var steps = new Array();
// steps.push(wire_track[0].start);
// var steplength = 5 * electron_width / 60.0;

// var circuitflow_numelectrons;
// var circuitflow_electrons = new Array();
// electron1 = setup_electron(electron_width, circuitflow_renderer);
// electron1.x = steps[0][0];
// electron1.y = steps[0][1];
// circuitflow_electrons.push(electron1);
// circuitflow_stage.addChild(electron1);
// var electron_placement_width = 5 * electron_width;

var wires = new Array();
function circuitflow_setup() {
	// var plug = new PIXI.Sprite(PIXI.loader.resources["/modules/res/images/module-1/wall-plug.png"].texture);
	// plug.scale.set(0.5,0.5); //sprite size is now 100 x 83
	// plug.x = 450;
	// plug.y = 267;
	// module_1_stage.addChild(plug);

	for(var i = 0; i < wire_track.length; i++) {
		start_vec = wire_track[i].start;
		end_vec = wire_track[i].end;
		displacement_vec = end_vec.subtract(start_vec);
		var electron_container = new PIXI.extras.TilingSprite(electron_flow_texture(electron_width, circuitflow_renderer), displacement_vec.magnitude(), 2 * electron_width);

		electron_container.anchor.set(0, 0);
		electron_container.x = start_vec[0];
		electron_container.y = start_vec[1];

		if (displacement_vec[0] == 0) { //it's pointing straight up or down
			if (displacement_vec[1] > 0) //pointing up
				electron_container.rotation = 0.5 * Math.PI;
			else //pointing down
				electron_container.rotation = 1.5 * Math.PI;
		}
		else { //it's pointing left or right
			if (displacement_vec[0] > 0)//pointing up
				electron_container.rotation = 0 * Math.PI;
			else //pointing down
				electron_container.rotation = 1 * Math.PI;
		}

		wires.push(electron_container);
		circuitflow_stage.addChild(electron_container);
	}

	circuitflow_renderer.render(circuitflow_stage);
	circuitflow_animation_loop();
}

var movement_scaler = 0.005;
function circuitflow_animation_loop() {	
	for(var i = 0; i < wires.length; i++) {
		wires[i].tilePosition.x += 1;
	}

	requestAnimationFrame(circuitflow_animation_loop);
	circuitflow_renderer.render(circuitflow_stage);
}