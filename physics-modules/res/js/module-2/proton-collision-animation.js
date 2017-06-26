var protoncollision_stagewidth = 600;
var protoncollision_stageheight = 200;

var protoncollision_stage = new PIXI.Container();
var protoncollision_renderer = PIXI.autoDetectRenderer(protoncollision_stagewidth, protoncollision_stageheight,{
        view : document.getElementById("proton-collision-canvas"),
        antialiasing : false,
        transparent : true,
        resolution : 1
    });

//responsive canvas
function protoncollision_resize(allowable_width) {
	ratio = Math.min(allowable_width / protoncollision_stagewidth, allowable_width / protoncollision_stageheight);
	protoncollision_stage.scale.x = protoncollision_stage.scale.y = ratio;
	protoncollision_renderer.resize(Math.ceil(protoncollision_stagewidth * ratio), Math.ceil(protoncollision_stageheight * ratio));
}

var collision_proton1, collision_proton2;

function protoncollision_setup() {
	//"Dot" texture used for protons
	/**SPECIAL NOTE: 2 px = 0.1 fm, so 2 px radius circle = 4 px diameter = 0.2 fm => works out to 3.46 MeV critical energy per proton when starting at 5 fm. So the displayed size of proton is critical!!!**/
	particlewidth = 3;
	$("#energyslide").attr("max", 1.5 * critical_energy(2 * particlewidth / distance_scale));
	$("#energyslide").val(0.5 * $("#energyslide").attr("max"));

	//Actually create protons
	collision_proton1 = new PIXI.Sprite(circle_texture(particlewidth, protoncollision_renderer));
	collision_proton2 = new PIXI.Sprite(circle_texture(particlewidth, protoncollision_renderer));
	collision_proton1.anchor.set(0.5);
	collision_proton2.anchor.set(0.5);
	collision_proton1.y = protoncollision_stageheight / 2;
	collision_proton2.y = protoncollision_stageheight / 2;
	protoncollision_stage.addChild(collision_proton1);
	protoncollision_stage.addChild(collision_proton2);

	protoncollision_renderer.render(protoncollision_stage);

	protoncollision_animationLoop();
}

//Simulation state variables
var collision_running       = false; //protons are not moving
var stucktogether = false; //protons are not stuck together
var protoncollision_current_velocity, protoncollision_current_distance;

function protoncollision_animationLoop() {
	requestAnimationFrame(protoncollision_animationLoop);
	if (!collision_running && !stucktogether) {
		outofframe = false;
		stucktogether = false;
		protoncollision_current_distance = $("#distanceslide").val() * distance_scale;
		protoncollision_current_velocity = energy_to_velocity($("#energyslide").val()) * velocity_scale;
		collision_proton1.x = Math.round((protoncollision_stagewidth / 2.0) - protoncollision_current_distance / 2.0);
		collision_proton2.x = Math.round((protoncollision_stagewidth / 2.0) + protoncollision_current_distance / 2.0);
		collision_proton1.v_x = 0 - protoncollision_current_velocity;
		collision_proton2.v_x = 0 - protoncollision_current_velocity;
	}
	else if (!outofframe && !stucktogether) {
		protoncollision_current_distance = (collision_proton2.x - collision_proton1.x) / distance_scale;

		//Move the protons
		collision_proton1.v_x += total_accel(protoncollision_current_distance) * accel_scale;
		collision_proton2.v_x += total_accel(protoncollision_current_distance) * accel_scale;
		collision_proton1.x -= collision_proton1.v_x;
		collision_proton2.x += collision_proton2.v_x;

		if (collision_proton1.x < -200 || collision_proton2.x > protoncollision_stagewidth + 200) {
			collision_running = false;
		}

		if (collision_proton2.x - collision_proton1.x <= collision_proton1.width) {
			collision_running = false;
			stucktogether = true;
		}

		if (!collision_running) {
			$("#startbutton").removeClass("disabled");
			$("#startbutton").text("Release");
		}
	}
	else if (stucktogether) {
		$("#protoncollision-originaltext").hide();
		$("#protoncollision-newtext").show();
	}
	protoncollision_renderer.render(protoncollision_stage);
}

$("#startbutton").click(function() {
	if (!stucktogether) {
		collision_running = true;
		$("#startbutton").addClass("disabled");
		$("#startbutton").text("Running...");
	}
});

$("#distanceslide").on("input", protoncollision_updateslides);
$("#energyslide").on("input", protoncollision_updateslides);

function protoncollision_updateslides() {
	$("#distancemeter").text($("#distanceslide").val() * 1E15);
	$("#energymeter").text($('#energyslide').val());
	$("#speed").val("Speed: " + velocity_to_mph(energy_to_velocity($('#energyslide').val())) + " mph" );
}

$("#strong-nuclear-slide").click(function() {
	$("#proton-collision-animation").fadeOut(function() {
		$("#strong-nuclear-animation").fadeIn(function() {
			analogy_buttonpressed = true;
		});
	});
});

$(document).ready(function() {
	protoncollision_updateslides();
});

protoncollision_setup();