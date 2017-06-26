//General EM/particle constants
var epsilon_0 = 8.854187E-12; //permittivity of free space
var mu_0 = 1.25663706E-6; //permeability of free space
var m_e = 9.109383E-31; //electron mass
var m_p = 1.6726219E-27; //proton mass
var m_n = 1.674929E-27; //neutron mass
var q_e = 1.60217662E-19; //elementary charge

//Atoms
var m_O = 8 * m_p + 8 * m_n; //approximate mass of oxygen-16
var m_H = m_p; //approximate mass of hydrogen-1
var m_H2O = m_O + 2 * m_H;
var r_H = 2.5E-11;
var r_O = 6.0E-11;

//Constants of strong nuclear force
var H = 3.392372E-26;
var d_0 = 1.522E-15;

//Conversion factors
var joule_per_eV = 1.6021766E-19;
var joule_per_keV = joule_per_eV * 1E3;
var joule_per_MeV = joule_per_eV * 1E6;
var joule_per_GeV = joule_per_eV * 1E9;

var K = 1.38064852E-23; //Boltzmann's constant

//Return the distance in real-world coordinates
function distance_compute(particle1, particle2, distancescale) {
	return Math.sqrt( ( (particle1.x - particle2.x) * (particle1.x - particle2.x) 
								+ (particle1.y - particle2.y) * (particle1.y - particle2.y) ) ) * distancescale;
}

//Computes angle in PIXI coordinates, i.e. clockwise relative to the x axis.
function angle_compute(particle, origin_particle) { //Angle relative to positive x and y directions (right and down.)
	magnitude = Math.abs(Math.atan((particle.y - origin_particle.y) / (particle.x - origin_particle.x)));
	if (particle.x >= waterpolarity_origin.x && particle.y >= waterpolarity_origin.y) {
		//1st quadrant
		return magnitude;
	}
	else if (particle.x <= waterpolarity_origin.x && particle.y >= waterpolarity_origin.y) {
		//2nd quadrant
		return Math.PI - magnitude;
	}
	else if (particle.x <= waterpolarity_origin.x && particle.y <= waterpolarity_origin.y) {
		//3rd quadrant
		return magnitude + Math.PI;
	}
	else if (particle.x >= waterpolarity_origin.x && particle.y <= waterpolarity_origin.y) {
		//4th quadrant
		return 2 * Math.PI - magnitude;
	}
}