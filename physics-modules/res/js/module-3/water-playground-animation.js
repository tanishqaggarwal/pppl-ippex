var waterplayground_stagewidth = 600;
var waterplayground_stageheight = 400;

var waterplayground_stage = new PIXI.Container();
    waterplayground_renderer = PIXI.autoDetectRenderer(waterplayground_stagewidth, waterplayground_stageheight,{
            view : document.getElementById("water-playground-canvas"),
            antialiasing : false,
            transparent : true,
            resolution : 1}
            );

var waterplayground_dipoles = new Array();

function dipole_texture(hwidth, owidth) {
	y_distance = (hwidth + owidth) * Math.sin(h2o_angle); //Half of the y-distance between the centers of the two hydrogen molecules
	x_distance = (hwidth + owidth) * Math.cos(h2o_angle); //Half of the x-distance between the centers of the two hydrogen molecules

	dipoletexture = new PIXI.RenderTexture(waterplayground_renderer, 
										   x_distance + hwidth + owidth,
										   2 * y_distance + 2 * hwidth);
	var graphics = new PIXI.Graphics();
	graphics.beginFill(0x0000ff);
	//the oxygen atom
	graphics.drawCircle(owidth, 
						hwidth + y_distance, 
						owidth);
	graphics.endFill();

	//the hydrogen atoms
	graphics.beginFill(0xff0000);
	graphics.drawCircle(owidth + x_distance, 
						hwidth, 
						hwidth);
	graphics.drawCircle(owidth + x_distance, 
						2 * y_distance + hwidth, 
						hwidth);
	graphics.endFill();
	dipoletexture.render(graphics);

	return dipoletexture;
}
var dipoletexture = dipole_texture(waterplayground_hydrogenwidth, waterplayground_oxygenwidth);

function waterplayground_setup() {
	//Add some particles at random, first
	waterplayground_animationLoop();
}

function should_arrest(particle, oxygen, hydrogen1, hydrogen2) {
	THRESHOLD = 1.1; //1.1 times the distance between the particle and the actual object is the stopping point

	return false;
}

function waterplayground_animationLoop() {
	E_eqn = E_field_eqn(waterplayground_dipoles);
	B_eqn = B_field_eqn(waterplayground_dipoles);

	for (var i = 0; i < waterplayground_dipoles.length; i++) {
		dipole     = waterplayground_dipoles[i];
		modified_E_field = "[0,0,0]"; //This E field will exclude the dipole itself from the computation.
		modified_B_field = "[0,0,0]"; //This B field will exclude the dipole itself from the computation.
		for (var j = 0; i < waterplayground_dipoles.length; j++) {
			if (j != i) {
				modified_E_field += E_eqn[j];
				modified_B_field += E_eqn[j];
			}
		}
		//move_dipole(dipole, E_eqn, B_eqn);
	}

	waterplayground_renderer.render(waterplayground_stage);
	requestAnimationFrame(waterplayground_animationLoop);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

//Check to see if user clicks within an actual water molecule (and in that case, don't create a particle.)
//This uses a circular bound around each water particle, i.e. if the click is within the circle that bounds the water molecule OR within the circle where the created molecule would intersect with an existing molecule, then you don't create the particle.
function inside_molecule(position) {

	for (var i = 0; i < waterplayground_dipoles.length; i++) {
		particle = waterplayground_dipoles[i];
		distance = distance_compute(position, particle, waterplayground_distancescale);

		if (distance <= 2 * (r_H + r_O)) {
			return true;
		}
	}
	return false;
}

var current_temperature = 30; //Kelvin
//TODO: ADD FUNCTION TO ADJUST TEMPERATURE WITH A SLIDER

//Variables used to count number and type of data points used. Once three are used from each domain, the "Next" button can be clicked. This ensures that the data produced at least somewhat looks like a line.
$("#water-playground-canvas").mouseup(function(e) {
	console.log("1");
	var particletype = "electron";
	if (e.shiftKey && positron_enabled) { //If shift key is pressed, make it a positron instead
		particletype = "positron";
	}
	var pos = getMousePos(this, e);
	if (!inside_molecule(pos) && waterplayground_dipoles.length <= 50) {
		var particle;
		particle = new PIXI.Sprite(dipoletexture);

		particle.anchor.set(playground_xcm, 0.5);
		particle.x = pos.x;
		particle.y = pos.y;
		particle.omega = 0;
		particle.rotation = 0;
		particle.vx = 0;
		particle.vy = 0;
		
		randomize_dipole(particle, current_temperature);

		particle.arrested = false;

		//Add to rendering
		waterplayground_stage.addChild(particle);
		waterplayground_dipoles.push(particle);
	}
	else if (waterplayground_dipoles > 50) {
		//Make an error message saying "too many dipoles!"
	}
});

waterplayground_setup();