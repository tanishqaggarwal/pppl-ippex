PIXI.loader.add([
	"/modules/res/images/module-2/spring.png"
]).load(protons_setup);

$("#mass-defect-slide").click(function() {
	$("#strong-nuclear-animation").fadeOut(function() {
		$("#mass-defect-explanation").fadeIn();
	});
});

var analogy_stagewidth = 600;
var analogy_stageheight = 200;

var actualprotons_stage = new PIXI.Container();
var actualprotons_renderer = PIXI.autoDetectRenderer(analogy_stagewidth, analogy_stageheight,{
        view : document.getElementById("strong-nuclear-actual"),
        antialiasing : false,
        transparent : true,
        resolution : 1
    });

var analogy_stage = new PIXI.Container();
var analogy_renderer = PIXI.autoDetectRenderer(analogy_stagewidth, analogy_stageheight,{
        view : document.getElementById("strong-nuclear-analogy"),
        antialiasing : false,
        transparent : true,
        resolution : 1
    });

var actualprotons_proton1, actualprotons_proton2, analogy_proton1, analogy_proton2;
var actualprotons_textSprite, analogy_textSprite;
var analogy_spring;
var energy_text;
var energy_text_2;

function proton_setup(proton_obj) {
	proton_obj.anchor.set(0.5);
	proton_obj.y = analogy_stageheight / 2;
	proton_obj.v_x = 0;
}

function proton_texture(particlewidth, renderer) {
	dottexture = new PIXI.RenderTexture(renderer, 2 * particlewidth, 2 * particlewidth);
	var graphics = new PIXI.Graphics();
	graphics.beginFill(0xff0000);
	graphics.drawCircle(particlewidth, particlewidth, particlewidth);
	graphics.endFill();
	dottexture.render(graphics);

	return dottexture;
}

function protons_setup() {
	//"Dot" texture used for protons
	/**SPECIAL NOTE: 2 px = 0.1 fm, so 2 px radius circle = 4 px diameter = 0.2 fm => works out to 3.46 MeV critical energy per proton when starting at 5 fm. So the displayed size of proton is critical!!!**/
	actualprotons_particlewidth = 35;
	analogy_particlewidth = 10;

	var actualprotons_dottexture = proton_texture(actualprotons_particlewidth, actualprotons_renderer);
	var analogy_dottexture = proton_texture(analogy_particlewidth, analogy_renderer);

	//Actually create protons
	actualprotons_proton1 = new PIXI.Sprite(actualprotons_dottexture);
	actualprotons_proton2 = new PIXI.Sprite(actualprotons_dottexture);
	analogy_proton1 = new PIXI.Sprite(analogy_dottexture);
	analogy_proton2 = new PIXI.Sprite(analogy_dottexture);
	proton_setup(actualprotons_proton1);
	proton_setup(actualprotons_proton2);
	proton_setup(analogy_proton1);
	proton_setup(analogy_proton2);

	actualprotons_stage.addChild(actualprotons_proton1);
	actualprotons_stage.addChild(actualprotons_proton2);
	analogy_stage.addChild(analogy_proton1);
	analogy_stage.addChild(analogy_proton2);

	analogy_spring = new PIXI.Sprite(PIXI.loader.resources["/modules/res/images/module-2/spring.png"].texture);
	analogy_spring.og_width = analogy_spring.width;
	analogy_spring.scale.set(analogy_stagewidth / 2 * 1.0 / analogy_spring.og_width, analogy_stagewidth / 2 * 1.0 / analogy_spring.og_width / 3);
	analogy_spring.anchor.x = 0.5;
	analogy_spring.anchor.y = 0.5;
	analogy_spring.x = analogy_stagewidth / 2;
	analogy_spring.y = analogy_stageheight / 2;
	analogy_stage.addChild(analogy_spring);

	energy_text = new PIXI.Text("0.5 MeV", {font: "Oswald", fontSize: "30"});
	energy_text.position.set(10,10);
	analogy_stage.addChild(energy_text);
	actualprotons_stage.addChild(energy_text);

	actualprotons_renderer.render(actualprotons_stage);
	analogy_renderer.render(analogy_stage);
	analogy_animationLoop();
}

function protons_accel(distance) {
	return 1500.0 / (distance * distance);
}

//State variables
var analogy_stagecounter = 1; //Currently on stage 1
var analogy_buttonpressed = false;
var v_0;
var protons_current_distance;
/**
Stages:
1) Low energy, the protons barely dent the spring
2) Medium energy, the hooks are about 10 px away from touching, but don't make it
3) High energy, the hooks make it
**/

function reset_initial_values(currentstage, add_delay) {
	protons_current_distance = analogy_stagewidth / 2.0;
	actualprotons_proton1.x = Math.round((analogy_stagewidth / 2.0) - protons_current_distance / 2.0);
	actualprotons_proton2.x = Math.round((analogy_stagewidth / 2.0) + protons_current_distance / 2.0);
	analogy_proton1.x = Math.round((analogy_stagewidth / 2.0) - protons_current_distance / 2.0);
	analogy_proton2.x = Math.round((analogy_stagewidth / 2.0) + protons_current_distance / 2.0);

	switch(currentstage) {
		case 1:
			v_0 = 1;
			break;
		case 2:
			v_0 = 2.5;
			break;
		case 3:
			v_0 = 6.0;
	}
	actualprotons_proton1.v_x = v_0;
	actualprotons_proton2.v_x = 0 - v_0;
	analogy_proton1.v_x = v_0;
	analogy_proton2.v_x = 0 - v_0;

	if (add_delay) {
		for (var i = 0; i < 1E8; i++) {
			if (i == 5E7) {
				console.log("halfway there");
			}
		}
	}
}

function updateposition(currentdistance) {
	actualprotons_proton1.v_x -= protons_accel(currentdistance);
	actualprotons_proton2.v_x += protons_accel(currentdistance);
	actualprotons_proton1.x += actualprotons_proton1.v_x;
	actualprotons_proton2.x += actualprotons_proton2.v_x;

	analogy_proton1.v_x -= protons_accel(currentdistance);
	analogy_proton2.v_x += protons_accel(currentdistance);
	analogy_proton1.x += analogy_proton1.v_x;
	analogy_proton2.x += analogy_proton2.v_x;

	analogy_spring.scale.x = currentdistance / analogy_spring.og_width;
}

function update_energy_text(stagecounter) {
	switch(stagecounter) {
		case 1:
			energy_text.text = "0.5 MeV";
			break;
		case 2:
			energy_text.text = "2 MeV";
			break;
		case 3:
			energy_text.text = "4 MeV";
	}
	actualprotons_renderer.render(actualprotons_stage);
	analogy_renderer.render(analogy_stage);
}

function analogy_animationLoop() {
	if (analogy_buttonpressed) {
		if (analogy_stagecounter != 3) {
			if (protons_current_distance < 1.1 * analogy_stagewidth) {
				//console.log(actualprotons_current_distance, actualprotons_accel(actualprotons_current_distance));
				protons_current_distance = actualprotons_proton2.x - actualprotons_proton1.x;
				updateposition(protons_current_distance);
			}
			else {
				console.log("STAGE UPDATED");
				analogy_stagecounter++;
				update_energy_text(analogy_stagecounter);
				analogy_spring.visible = false;
				analogy_renderer.render(analogy_stage);
				reset_initial_values(analogy_stagecounter, true);
				analogy_spring.visible = true;
				analogy_renderer.render(analogy_stage);
			}
		}
		else if (protons_current_distance > actualprotons_proton1.width) {
			protons_current_distance = actualprotons_proton2.x - actualprotons_proton1.x;
			updateposition(protons_current_distance);
		}
	}
	else {
		reset_initial_values(1, false);
	}

	actualprotons_renderer.render(actualprotons_stage);
	analogy_renderer.render(analogy_stage);
	requestAnimationFrame(analogy_animationLoop);
}

$("#replay-strong-nuclear-analogy").click(function() {
	console.log("clicked");
	analogy_stagecounter = 1;
	update_energy_text(analogy_stagecounter);
	reset_initial_values(analogy_stagecounter, false);
	analogy_buttonpressed = true;
});

