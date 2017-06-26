var waterpolarity_stage = new PIXI.Container();
    waterpolarity_renderer = PIXI.autoDetectRenderer(waterpolarity_stagewidth, waterpolarity_stageheight,{
            view : document.getElementById("water-polarity-canvas"),
            antialiasing : false,
            transparent : true,
            resolution : 1}
            );

var waterpolarity_particles = new Array();
var waterpolarity_positions = new Array();

var oxygen_atom, hydrogen_atom_1, hydrogen_atom_2;
function waterpolarity_setup() {
	oxygen_atom = new PIXI.Sprite(circle_texture(waterpolarity_oxygenwidth, waterpolarity_renderer));
	oxygen_atom.anchor.set(0.5);
	oxygen_atom.x = waterpolarity_stagewidth / 2;
	oxygen_atom.y = waterpolarity_stageheight / 2;

	hydrogen_atom_1 = new PIXI.Sprite(circle_texture(waterpolarity_hydrogenwidth, waterpolarity_renderer, 0xff0000));
	hydrogen_atom_1.anchor.set(0.5);
	hydrogen_atom_1.x = waterpolarity_stagewidth / 2 - hydrogen_x_displacement;
	hydrogen_atom_1.y = waterpolarity_stageheight / 2 + hydrogen_y_displacement;
	hydrogen_atom_2 = new PIXI.Sprite(circle_texture(waterpolarity_hydrogenwidth, waterpolarity_renderer, 0xff0000));
	hydrogen_atom_2.anchor.set(0.5);
	hydrogen_atom_2.x = waterpolarity_stagewidth / 2 + hydrogen_x_displacement;
	hydrogen_atom_2.y = waterpolarity_stageheight / 2 + hydrogen_y_displacement;

	waterpolarity_stage.addChild(oxygen_atom);
	waterpolarity_stage.addChild(hydrogen_atom_1);
	waterpolarity_stage.addChild(hydrogen_atom_2);
	waterpolarity_animationLoop();
}

var positron_enabled = true; //whether or not you can add positrons to the screen

function should_arrest(particle, oxygen, hydrogen1, hydrogen2) {
	THRESHOLD = 1.1; //1.1 times the distance between the particle and the actual object is the stopping point
	if (   distance_compute(particle, oxygen, waterpolarity_distancescale) / waterpolarity_distancescale < THRESHOLD * (waterpolarity_particlewidth + waterpolarity_oxygenwidth) 
		|| distance_compute(particle, hydrogen1, waterpolarity_distancescale) / waterpolarity_distancescale < THRESHOLD * (waterpolarity_particlewidth + waterpolarity_hydrogenwidth)  
		|| distance_compute(particle, hydrogen2, waterpolarity_distancescale) / waterpolarity_distancescale < THRESHOLD * (waterpolarity_particlewidth + waterpolarity_hydrogenwidth) ) {
		return true;
	}
	if (particle.x < -2 * waterpolarity_particlewidth 
	|| particle.x > waterpolarity_stagewidth + 2 * waterpolarity_particlewidth 
	|| particle.y < -2 * waterpolarity_particlewidth 
	|| particle.y > waterpolarity_stageheight + 2 * waterpolarity_particlewidth) { //if beyond bounds
		return true;
	}
	return false;
}

var animation_enabled = null;

function waterpolarity_animationLoop() {
	for(var i = 0; i < waterpolarity_particles.length; i++) {
		particle = waterpolarity_particles[i];
		if (!particle.arrested) {
			if ( should_arrest(particle, oxygen_atom, hydrogen_atom_1, hydrogen_atom_2) ) { //( distance < (2 * waterpolarity_particlewidth) * waterpolarity_distancescale && particle.charge != -1 ) || distance > real_distance(central_electron, {x: 0, y: 0})) {
				particle.arrested = true;
				particle.hold_start = Date.now();
			}

			acceleration_scaled = get_accel_scale(particle, field_at_point(particle));
			particle.v_x += acceleration_scaled.x;
			particle.v_y += acceleration_scaled.y;
			particle.x += particle.v_x;
			particle.y += particle.v_y;

			//record the particle positions so that the trajectory overlay can be created later
			waterpolarity_positions[i].push({x: particle.x, y: particle.y});		
		}
		else {
			if (Date.now() - particle.hold_start > 500) { //be gone after half a second
				particle.visible = false;
			}
		}
	}

	waterpolarity_renderer.render(waterpolarity_stage);
	animation_enabled = requestAnimationFrame(waterpolarity_animationLoop);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

//Check to see if user clicks within the actual water molecule (and in that case, don't create a particle.)
function waterpolarity_inside_molecule(position) {
	if (distance_compute(position, oxygen_atom, waterpolarity_distancescale) / waterpolarity_distancescale < 1.1 * waterpolarity_oxygenwidth
		|| distance_compute(position, hydrogen_atom_1, waterpolarity_distancescale) / waterpolarity_distancescale < 1.1 * waterpolarity_hydrogenwidth
		|| distance_compute(position, hydrogen_atom_2, waterpolarity_distancescale) / waterpolarity_distancescale < 1.1 * waterpolarity_hydrogenwidth) {
		return true;
	}
	else {
		return false;
	}
}

function angle_debug(pos) {
	console.log("Magnitude" + Math.abs(Math.atan((pos.y - waterpolarity_origin.y) / (pos.x - waterpolarity_origin.x))));
	console.log("Adjusted" + angle_compute(pos, waterpolarity_origin));
}

//Variables used to count number and type of data points used. Once three are used from each domain, the "Next" button can be clicked. This ensures that the data produced at least somewhat looks like a line.
$("#water-polarity-canvas").mouseup(function(e) {
	var particletype = "electron";
	if (e.shiftKey && positron_enabled) { //If shift key is pressed, make it a positron instead
		particletype = "positron";
	}
	var pos = getMousePos(this, e);
	if (!waterpolarity_inside_molecule(pos)) {
		var particle;
		if (particletype == "electron" && !waterpolarity_inside_molecule(pos))
			particle = new PIXI.Sprite(circle_texture(waterpolarity_particlewidth, waterpolarity_renderer));
		else
			particle = new PIXI.Sprite(circle_texture(waterpolarity_particlewidth, waterpolarity_renderer, 0xff0000));

		particle.anchor.set(0.5, 0.5);
		particle.x = pos.x;
		particle.y = pos.y;
		particle.v_x = 0;
		particle.v_y = 0;
		particle.charge = particletype == "electron" ? (0 - 1.0) : 1.0;
		particle.m = m_e;
		particle.arrested = false;


		//Add to rendering
		waterpolarity_stage.addChild(particle);
		waterpolarity_particles.push(particle);

		waterpolarity_positions.push(new Array());
	}
});

//Draw the trajectories of all the particles released in the simulation
function draw_trajectories() {
	cancelAnimationFrame(animation_enabled);
	blue = 0x4A56FF;
	red  = 0xFC5656;

	for(var i = 0; i < waterpolarity_particles.length; i++) {
		charge = waterpolarity_particles[i].charge;
		marker_color = (charge == -1.0) ? blue : red;
		positions = waterpolarity_positions[i];
		
		for(var j = 0; j < positions.length; j++) {
			marker = new PIXI.Graphics();
			marker.beginFill(marker_color);
			marker.drawCircle(positions[j].x,positions[j].y,2);
			marker.endFill();
			
			waterpolarity_stage.addChild(marker);
		}
	}
	waterpolarity_renderer.render(waterpolarity_stage);
}

waterpolarity_setup();