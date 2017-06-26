var pi_stagewidth = 600;
var pi_stageheight = 400;

var pi_stage = new PIXI.Container(),
    pi_renderer = PIXI.autoDetectRenderer(pi_stagewidth, pi_stageheight,{
            view : document.getElementById("particle-interaction-canvas"),
            antialiasing : false,
            transparent : true,
            resolution : 1}
            );

var central_electron;
var pi_particles = new Array();
var pi_particlewidth = 5;

function positron_texture(particlewidth, renderer) {
	dottexture = new PIXI.RenderTexture(renderer, 2 * particlewidth, 2 * particlewidth);
	var graphics = new PIXI.Graphics();
	graphics.beginFill(0xff0000);
	graphics.drawCircle(particlewidth, particlewidth, particlewidth);
	graphics.endFill();
	dottexture.render(graphics);

	return dottexture;
}

function pi_setup() {
	central_electron = new PIXI.Sprite(electron_texture(pi_particlewidth, pi_renderer));
	central_electron.x = pi_stagewidth / 2;
	central_electron.y = pi_stageheight / 2;

	pi_stage.addChild(central_electron);
	pi_animationLoop();
}

//Some physical/game constants
var positron_enabled = false; //whether or not you can add positrons to the screen
var distance_scale = 1.0 / 2000.0; //20 pixels per centimeter => 2000 pixels per meter
var time_scale = 2E-5; //arbitrary
var q_e = 1.60217662E-19;
var epsilon_0 = 8.854187E-12;
var m_e = 9.109383E-31;

//Compute Euclidean distance and report a properly unit-ed answer
function real_distance(particle1, particle2) {
	return Math.sqrt(   ( (particle1.x - particle2.x) * (particle1.x - particle2.x) 
								+ (particle1.y - particle2.y) * (particle1.y - particle2.y) ) ) * distance_scale;
}

var coloumb_data_series = {
	name : "Electrons",
	data : []
}

function pi_animationLoop() {
	for(var i = 0; i < pi_particles.length; i++) {
		particle = pi_particles[i];
		if (!particle.arrested) {

			/** Move the particle according to Coloumb's law, unless its beyond the screen or close to the center, in which case you should arrest it. **/
			distance = real_distance(particle, central_electron);
			distance_sqed = distance * distance;
			if ( ( distance < (2 * pi_particlewidth) * distance_scale && particle.charge != -1 ) || distance > real_distance(central_electron, {x: 0, y: 0})) {
				particle.arrested = true;
				particle.hold_until = Date.now();

				//Add particle data to chart
				start_distance = parseFloat($('#pi-data-table tr:eq(' + (i + 1) + ') td:eq(1)').text());
				max_vel        = parseFloat($('#pi-data-table tr:eq(' + (i + 1) + ') td:eq(2)').text());
				coloumb_data_series.data.push([start_distance, max_vel]);
				continue;
			}

			force 			 = (1 / (4 * Math.PI * epsilon_0)) * (0 - q_e) * (q_e * particle.charge) / distance_sqed;
			acceleration     = force / m_e;
			acceleration_scale = acceleration * time_scale * time_scale / distance_scale;
			particle.v_x += acceleration_scale * ((particle.x - central_electron.x) / (distance / distance_scale)); //the second part is cos(t)
			particle.v_y += acceleration_scale * ((particle.y - central_electron.y) / (distance / distance_scale)); //the second part is sin(t)
			particle.x += particle.v_x;
			particle.y += particle.v_y;

			/**Log data in table.**/
			v = Math.sqrt(particle.v_x * particle.v_x + particle.v_y * particle.v_y);
			$("#speed-" + i).text(v.toFixed(3));
		}
		else {
			if (Date.now() - particle.hold_until > 500) { //begone after half a second
				particle.visible = false;
			}
		}
	}

	pi_renderer.render(pi_stage);
	requestAnimationFrame(pi_animationLoop);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

//Variables used to count number and type of data points used. Once three are used from each domain, the "Next" button can be clicked. This ensures that the data produced at least somewhat looks like a line.
var num_small_distance = 0;
var num_medium_distance = 0;
var num_large_distance = 0;
$("#particle-interaction-canvas").mouseup(function(e) {
	var particletype = "electron";
	if (e.shiftKey && positron_enabled) { //If shift key is pressed, make it a positron instead
		particletype = "positron";
	}
	var pos = getMousePos(this, e);
	var particle;
	if (particletype == "electron")
		particle = new PIXI.Sprite(electron_texture(pi_particlewidth, pi_renderer));
	else
		particle = new PIXI.Sprite(positron_texture(pi_particlewidth, pi_renderer));

	particle.x = pos.x;
	particle.y = pos.y;
	particle.og_x = pos.x;
	particle.og_y = pos.y; //"og" stands for original. Hopefully this code doesn't go unread for so long that that acronym goes out of fashion :\
	particle.v_x = 0;
	particle.v_y = 0;
	particle.charge = particletype == "electron" ? (0 - 1.0) : 1.0;

	//Test the particle for its distance, and add to the appropriate data counter
	distance = real_distance(particle, central_electron);
	max_distance = real_distance({x:0, y:0}, central_electron) / 2.0;
	if (distance < max_distance / 4.0) {
		num_small_distance++;
	}
	else if (distance < max_distance / 2.0) {
		num_medium_distance++;
	}
	else {
		num_large_distance++;
	}

	//Should the "next" button be enabled?
	if (num_small_distance > 3 && num_medium_distance > 3 && num_large_distance > 3) {
		$("#graphbutton").removeClass("disabled");
	}

	//Add to rendering
	pi_stage.addChild(particle);
	pi_particles.push(particle);

	//Add to table
	real_x = (pos.x - central_electron.x) * distance_scale * (100 / 2.54); //The "x 100" is to convert to inches, for a more readable unit
	real_y = (central_electron.y - pos.y) * distance_scale * (100 / 2.54); //The "x 100" is to convert to inches, for a more readable unit
	real_dist = real_distance(particle, central_electron) * (100 / 2.54);
	$('#pi-data-table > tbody:last-child').append("<tr id = '" + pi_particles.length + "'>" + 
		"<td class = 'col-xs-4'>(" + real_x.toFixed(3) + ", " + real_y.toFixed(3) + ")</td>" + 
		"<td class = 'col-xs-4'>" + real_dist.toFixed(3) + "</td>" + 
		"<td class = 'col-xs-4' id = 'speed-" + (pi_particles.length - 1) + "'></td>");
});

pi_setup();

$("#next-pi-with-positive").click(function() {
	$("#particle-interaction-canvas").detach().appendTo('#second-pi-container');
	positron_enabled = true;
});