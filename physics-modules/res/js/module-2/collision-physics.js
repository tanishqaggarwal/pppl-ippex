//*****The physics****************************************************
function a_c(distance) { //Acceleration due to Coloumb force
	return (q_e * q_e) / (distance * distance) / m_p / (4 * Math.PI * epsilon_0);
}

//Obtained from http://www.sjsu.edu/faculty/watkins/deuteron10.htm . Derived based on a Yukawa potential.
function a_n(distance) { //Acceleration due to strong force
	return H * Math.exp((0 - distance) / d_0) / (distance * distance);
}

function total_accel(distance) {
	return a_c(distance) - a_n(distance);
}

function energy_to_velocity(energy) {
	return Math.sqrt(2 * joule_per_MeV * energy / m_p);
}

function critical_energy(width) {
	return Math.abs(  0.5 * (q_e * q_e) / (4 * Math.PI * epsilon_0) * ( (1.0 / 5E-15) - (1.0 / width) )  ) / joule_per_MeV;
}

miles_per_meter = 6.214E-4;
seconds_per_hour = 1.0 / 3600;

function velocity_to_mph(velocity) {
	return Math.round(velocity * 2.237).toExponential(2);
}

// function get_current_vel(initial_distance, current_distance, initial_vel) {

// ///FORMULA: INT(F dx) = 1/2 m(vf^2 - v1^2)   ==>   SQRT(2 INT(F dx) + v1^2) = vf.

// //Riemann integration
// 	var step = (current_distance - initial_distance) / (1000.0);
// 	var integral = 0;
// 	for(var i = 0; i < 1000; i++) {
// 		integral += total_accel(initial_distance + i * step) * step;
// 	}
// 	return Math.sqrt(2 * integral + initial_vel * initial_vel);
// }

//******SCALING FACTORS************************
//Note how scaling factors work: if a is in MKS units, then a * s, where s is the scaling factor, produces game units.
//10 pixels/fermi
var distance_scale = 2.5E16;
var time_scale = 3.391E23;

var velocity_scale = distance_scale / time_scale;
var accel_scale    = velocity_scale / time_scale;
