//Simulation logging utilities

function logging_data(particle) {
	console.log("x: " + particle.x + ", y: " + particle.y + ", vx: " + particle.v_x + ", vy: " + particle.v_y);
}

//FOR GROUPS OF PARTICLES
function logging_report_x(array_of_particles) {
	reportstring = "";
	for (var i = 0; i < array_of_particles.length; i++) {
		reportstring += array_of_particles[i].x + ", ";
	}
	console.log(reportstring);
}

function logging_report_y(array_of_particles) {
	reportstring = "";
	for (var i = 0; i < array_of_particles.length; i++) {
		reportstring += array_of_particles[i].y + ", ";
	}
	console.log(reportstring);
}

function logging_report_vx(array_of_particles) {
	reportstring = "";
	for (var i = 0; i < array_of_particles.length; i++) {
		reportstring += array_of_particles[i].v_x + ", ";
	}
	console.log(reportstring);
}

function logging_report_vy(array_of_particles) {
	reportstring = "";
	for (var i = 0; i < array_of_particles.length; i++) {
		reportstring += array_of_particles[i].v_y + ", ";
	}
	console.log(reportstring);
}

function logging_report_conglomerate(array_of_particles) {
	reportstring = "";
	for (var i = 0; i < array_of_particles.length; i++) {
		reportstring += "[" + array_of_particles[i].x + ", " + array_of_particles[i].y + ", " + array_of_particles[i].v_x + ", " + array_of_particles[i].v_y + "], ";
	}
	console.log(reportstring);
}