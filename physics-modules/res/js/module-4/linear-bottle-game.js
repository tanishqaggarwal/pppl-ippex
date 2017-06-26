var bottlegame_stage = new PIXI.Container();
var bottlegame_renderer = PIXI.autoDetectRenderer(bottlegame_stagewidth, bottlegame_stageheight,{
        view : document.getElementById("bottlegame"),
        antialiasing : false,
        transparent : true,
        resolution : 1
    });

//Sprites
var chamber_wall;
var solenoid;
var B_slider_slide;
var B_slider_button;

var health_bar;
var health_score;
var energy_bar;
var energy_score;
var time_display;
var time_score;

var numparticles = 20;
var particles = [];
var particle_release_delay = 5; //after 5 frames, release each new particle until they're all out and about

var in_initial_release = true; //currently in the stage of initially releasing particles

function resetparticle(particle) {
	
}

function setup() {
	//chamber
	chamber_wall = new PIXI.Sprite();

	bottlegame_stage.addChild(chamber_wall);

	//slider
	B_slider_slide = new PIXI.Sprite();
	B_slider_button = new PIXI.Sprite();

	bottlegame_stage.addChild(B_slider_slide);
	bottlegame_stage.addChild(B_slider_button);

	//energy/health bars
	energy_bar = new PIXI.Sprite();
	health_bar = new PIXI.Sprite();

	bottlegame_stage.addChild(energy_bar);
	bottlegame_stage.addChild(health_bar);
	//peripherals

	for(var i = 0; i < numparticles; i++) {
		//Determining particle type
		newparticle = new PIXI.Sprite();
		newparticle = resetparticle(newparticle);

		bottlegame_stage.addChild(newparticle);
		particles.push(newparticle);
	}

	bottlegame_renderer.render(bottlegame_stage);
	animationLoop();
}

function healthsubtract(particle) { //subtracts from health based on particle's momentum at impact
	momentum = particle.m * Math.sqrt(particle.og_x * particle.og_x + particle.og_y * particle.og_y + particle.og_z * particle.og_z) / (distance_scale * distance_scale);
	health_score -= momentum;
}

function animationLoop() {
	current_B = 2; //READ SLIDER
	energy_score -= power(current_B) * dt;

	for(var i = 0; i < numparticles; i++) {
		particles[i].og_x = particles[i].x;
		particles[i].og_y = particles[i].y;
		particles[i].og_z = particles[i].z;
		particles[i].og_v_x = particles[i].v_x;
		particles[i].og_v_y = particles[i].v_y;
		particles[i].og_v_z = particles[i].v_z;
		particle_nextpos(particles[i], current_B, dt);

		if( particles[i].bounced ) {
			healthsubtract(particles[i]);
			particles[i].bounced = false;
		}
	}

	requestAnimationFrame(animationLoop);
	bottlegame_renderer.render(bottlegame_stage);
}