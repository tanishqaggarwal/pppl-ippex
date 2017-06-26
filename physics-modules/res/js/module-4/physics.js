//Game constants
var bottlegame_stagewidth = 600;
var bottlegame_stageheight = 400;

//Physical constants
m_p = 1.6726219E-27;
q_e = 1.60217662E-19;
mu_0 = 4.0E-7 * Math.PI;

v_x_max = 1.2E7; //random number, try playing around with it
v_y_max = 1.2E7; //ditto
v_z_max = 1.2E7; //ditto

chamber_width = 0.15; //random
chamber_length = 1.0;
collision_threshold = 2; //random threshold for "collision with wall" to be counted

B_max = 5.0; //random
J_max = 100000; //random, watt-hours
turns_per_length = 200; //turns of wire per 1 m
wire_resistivity = 1.68E-8;
wire_cross_sectional_area = 0.0001; //1 cm^2

//Scaling constants
distance_scale = bottlegame_stageheight / 4.0 / chamber_width;
time_scale = 0.001;
velocity_scale = distance_scale / time_scale;

function power(B) {
	//Derived from P = I^2 R and u_0 I N = B
	return (2 * (chamber_width / 2) * wire_resistivity * chamber_length * B * B) / (mu_0 * mu_0 * turns_per_length * (wire_cross_sectional_area / Math.PI));
}

function reset_particle(particle) {
	particletype = Math.floor(Math.random() * 3);
	switch(particletype) {
		case 1: //protium
			particle.setTexture();
			particle.m = 1 * m_p;
			particle.q = 1 * q_e;
			break;
		case 2: //deuterium
			particle.setTexture();
			particle.m = 2 * m_p;
			particle.q = 1 * q_e;
			break;
		case 3: //tritium
			particle.setTexture();
			particle.m = 3 * m_p;
			particle.q = 1 * q_e;
	}

	particle.x = -2;
	particle.y = Math.random() * chamber_width * distance_scale + (bottlegame_stageheight / 2 - chamber_width * distance_scale / 2);
	particle.v_x = Math.random() * v_x_max * velocity_scale;
	particle.v_y = Math.random() * v_y_max * velocity_scale;
	particle.v_z = Math.random() * v_z_max * velocity_scale;

	return particle;
}

//moves particle according to laws of physics
function particle_nextpos(particle, B, dt) {
	if ( (particle.x * particle.x + particle.y * particle.y - chamber_width * chamber_width * distance_scale * distance_scale) <= (collision_threshold * collision_threshold) ) {
		particle.bounced = true;
		particle.v_x = 0 - particle.v_x;
		particle.v_y = 0 - particle.v_y;
		particle.v_z = 0 - particle.v_z;
	}

	a_y = 0;
	a_z = 0;
	if (particle.x * particle.x + particle.y * particle.y <= chamber_width * chamber_width * distance_scale * distance_scale) { //If within chamber, give some acceleration, otherwise the particle is gonna bounce
		a_y = particle.q * particle.v_z * B / particle.m * dt;
		a_z = particle.q * (0 - particle.v_y) * B / particle.m * dt;
	
	}
	particle.x += particle.v_x * velocity_scale * dt;

	particle.v_y += a_y;
	particle.y += particle.v_y * velocity_scale * dt;

	particle.v_z += a_z;
	particle.z += particle.v_z * velocity_scale * dt;
}

