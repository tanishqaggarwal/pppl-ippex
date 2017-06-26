var waterpolarity_distancescale = 1.0 / 2.5E12;
var waterpolarity_timescale = 2E15; //arbitrary

var waterpolarity_stagewidth = 600;
var waterpolarity_stageheight = 400;
var waterpolarity_origin = {
	x: waterpolarity_stagewidth / 2,
	y: waterpolarity_stageheight / 2,
};

var waterpolarity_particlewidth = 5;
var waterpolarity_hydrogenwidth = 10;
var waterpolarity_oxygenwidth = 2.5 * waterpolarity_hydrogenwidth;

//These calculations for the center of mass are described at https://www.overleaf.com/8690662gptqtnjdmdjb
theta = 52.25 * 2 * Math.PI / 360; //this is half of 104.5 degrees, which is the bond angle for water. Converted to radians.
var hydrogen_x_displacement = (waterpolarity_hydrogenwidth + waterpolarity_oxygenwidth) * Math.sin(theta);
var hydrogen_y_displacement = (waterpolarity_hydrogenwidth + waterpolarity_oxygenwidth) * Math.cos(theta);
var waterpolarity_CM = {
	x: waterpolarity_origin.x,
	y: waterpolarity_origin.y + (2 * hydrogen_y_displacement * m_H) / (2 * m_H + m_O),
};

//More physical constants
p_h2o = 6.1862E-30; //Dipole moment of water in units of C*m
L_h2o = p_h2o / (10 * q_e); //Classical length of dipole in meters

//Field can be treated as an electric dipole, which is centered at the center of mass of the object.
//Explanation of calculations available here: https://www.overleaf.com/8690662gptqtnjdmdjb
function field_at_point(particle) {
	dipole_positive = {
		x: waterpolarity_origin.x,
		y: waterpolarity_CM.y + L_h2o / waterpolarity_distancescale / 2.0,
	};
	dipole_negative = {
		x: waterpolarity_origin.x,
		y: waterpolarity_CM.y - L_h2o /	 waterpolarity_distancescale / 2.0,
	};
	positive_field = (1.0 / (4 * Math.PI * epsilon_0)) * 10 * q_e / (distance_compute(particle, dipole_positive, waterpolarity_distancescale) * distance_compute(particle, dipole_positive, waterpolarity_distancescale)) ;
	positive_angle = angle_compute(particle, dipole_positive);
	positive_x = positive_field * Math.cos(positive_angle);
	positive_y = positive_field * Math.sin(positive_angle);

	negative_field = (1.0 / (4 * Math.PI * epsilon_0)) * 10 * (0 - q_e) / (distance_compute(particle, dipole_negative, waterpolarity_distancescale) * distance_compute(particle, dipole_negative, waterpolarity_distancescale));
	negative_angle = angle_compute(particle, dipole_negative);
	negative_x = negative_field * Math.cos(negative_angle);
	negative_y = negative_field * Math.sin(negative_angle);

	return {
		x: positive_x + negative_x,
		y: positive_y + negative_y,
	};
}

function get_accel_scale(particle, field_vals) {
	accel = {
		x: (field_vals.x * particle.charge / particle.m),
		y: (field_vals.y * particle.charge / particle.m),
	};
	return {
		x: accel.x * waterpolarity_distancescale / waterpolarity_timescale / waterpolarity_timescale,
		y: accel.y * waterpolarity_distancescale / waterpolarity_timescale / waterpolarity_timescale,
	};
}