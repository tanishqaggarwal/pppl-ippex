var waterplayground_hydrogenwidth = 3;
var waterplayground_oxygenwidth = 2.5 * waterplayground_hydrogenwidth;

var waterplayground_distancescale = r_H / waterplayground_hydrogenwidth;
var waterplayground_timescale = 2E-5; //arbitrary

var h2o_angle = 52.25 * 2 * Math.PI / 360.0; //Half of 104.5, converted to radians

function water_xcm() {
	//Compute the x-component of the center of mass of the water molecule (as a ratio, i.e. the actual length is 1)
	oxygen_moment = m_O * waterplayground_oxygenwidth;
	hydrogen_moment = m_H * (waterplayground_oxygenwidth + (waterplayground_oxygenwidth + waterplayground_hydrogenwidth) * Math.cos(h2o_angle));
	total_mass = m_H2O;
	scale = 1.0 / ( (waterplayground_oxygenwidth + waterplayground_hydrogenwidth) * (1 + Math.cos(h2o_angle)) );

	return (oxygen_moment + 2 * hydrogen_moment) / (total_mass) * scale;
}
var playground_xcm = water_xcm();

//NOTE: The rest of this code relies heavily on the vectors library in utils. If you're looking to understand this code, do go look at that library to know what the functions are. It should be pretty straightforward from there.

//Compute properties of the positive and negative charge within the dipole
function compute_dipole_charge_properties(dipole, pole) {
	pos_or_neg = (pole == "positive") ? 1 : -1;
	return {
		x: (dipole.x - pos_or_neg * L_h2o / waterplayground_distancescale * Math.cos(dipole.rotation) / 2.0),
		y: (dipole.y - pos_or_neg * L_h2o / waterplayground_distancescale * Math.sin(dipole.rotation) / 2.0),
		charge: pos_or_neg * 10 * q_e,
	};
}

function compute_dipole_velocities(dipole, positive_charge, negative_charge) {
	v_rotation = (dipole.omega * L_h2o / 2.0); //v = rw
	v_rotation_x = v_rotation * Math.cos(dipole.rotation);
	v_rotation_y = v_rotation * Math.sin(dipole.rotation);

	//These are some REALLY annoying (and possibly intimidating) calculations for the signage of the particle velocity, but basically it boils down to two steps:

	//STEP 1: Figure out the quadrant of the direction in which the molecule is pointing. Remember that PIXI's coordinates count the angle going _clockwise_ from the positive x axis.
	var dipole_quadrant;
	if (positive_charge.x - negative_charge.x > 0) {
		if (positive_charge.y - negative_charge.y > 0) {
			dipole_quadrant = 1;
		}
		else {
			dipole_quadrant = 4;
		}
	}
	else {
		if (positive_charge.y - negative_charge.y > 0) {
			dipole_quadrant = 2;
		}
		else {
			dipole_quadrant = 3;
		}
	}

	//STEP 2: Given the dipole's quadrant, the way the rotational velocities point is pretty straightforward but takes a little bit of thought to compute. Here's a chart for it:
	/**
	  Quadrant   + Charge's Rotational V (x,y)   - Charge's Rotational V (x,y)  
	 ---------- ------------------------------- ------------------------------- 
	         1   (-,+)                           (+,-)                          
	         2   (-,-)                           (+,+)                          
	         3   (+,-)                           (-,+)                          
	         4   (+,+)                           (-,-)   
	**/
	//By the way, if you ever need to produce an ASCII chart this is a good source: https://ozh.github.io/ascii-tables/
	switch(dipole_quadrant) {
		case 1:
			positive_charge.vx = dipole.vx - v_rotation_x;
			positive_charge.vy = dipole.vx + v_rotation_x;
			negative_charge.vx = dipole.vy + v_rotation_y;
			negative_charge.vy = dipole.vy - v_rotation_y;
			break;
		case 2:
			positive_charge.vx = dipole.vx - v_rotation_x;
			positive_charge.vy = dipole.vx - v_rotation_x;
			negative_charge.vx = dipole.vy + v_rotation_y;
			negative_charge.vy = dipole.vy + v_rotation_y;
			break;
		case 3:
			positive_charge.vx = dipole.vx + v_rotation_x;
			positive_charge.vy = dipole.vx - v_rotation_x;
			negative_charge.vx = dipole.vy - v_rotation_y;
			negative_charge.vy = dipole.vy + v_rotation_y;
			break;
		case 4:
			positive_charge.vx = dipole.vx + v_rotation_x;
			positive_charge.vy = dipole.vx + v_rotation_x;
			negative_charge.vx = dipole.vy - v_rotation_y;
			negative_charge.vy = dipole.vy - v_rotation_y;
			break;
	}
}

function E_field_eqn(dipoles) {
	E_field = [];

	//Loop over all of the dipoles in order to produce the field
	for(var i = 0; i < dipoles.length; i++) {
		dipole = dipoles[i];

		positive_charge = compute_dipole_charge_properties(dipole, "positive");
		negative_charge = compute_dipole_charge_properties(dipole, "negative");

		//The below formulas are of the form (p - r) / ||p - r||^3, where p and r are the position VECTORS of the dipole and the source charge, respectively.
		//Essentially the formula is p.subtract(r).sproduct(Math.pow(p - r, 3)), with appropriate distance scalings also applied
		positive_field = "p.subtract([" + positive_charge.x + "," + positive_charge.y + ", 0])" +
						 ".sproduct(1.0 / " +
						 	 "Math.pow(" +
						 		"distance_compute({x:p[0], y:p[1]}, " + JSON.stringify(positive_charge) + ", waterplayground_distancescale) / waterplayground_distancescale" +
						 	 ", 3)" +
						 ")";
		negative_field = "p.subtract([" + negative_charge.x + "," + negative_charge.y + ", 0])" +
						 ".sproduct(1.0 / " +
							 "Math.pow(" +
								 "distance_compute({x:p[0], y:p[1]}, " + JSON.stringify(negative_charge) + ", waterplayground_distancescale) / waterplayground_distancescale" +
							 ", 3)" +
						 ")";
		total_field_contribution = positive_field + ".subtract(" + negative_field + ")";
		E_field.push(".add(" + total_field_contribution + ")");
	}
	E_field.push(".sproduct((1 / (4 * Math.PI * epsilon_0)) * 10 * q_e)"); //Multiplying physical and scaling constants TODO fix scaling

	return E_field;
}

function B_field_eqn(dipoles) {
	B_field = [];

	//Loop over all of the dipoles in order to produce the field
	for(var i = 0; i < dipoles.length; i++) {
		dipole = dipoles[i];

		positive_charge = compute_dipole_charge_properties(dipole, "positive");
		negative_charge =  compute_dipole_charge_properties(dipole, "negative");
		compute_dipole_velocities(dipole, positive_charge, negative_charge);

		//The below formulas are of the form qv x (p - r) / ||p - r||^3, where p and r are the position VECTORS of the dipole and the source charge, respectively, ande velocity of the source charge.
		//Essentially the formula is v.crossproduct(p.subtract(r).scalarproduct(Math.pow(p - r, 3))).scalarproduct(q), with appropriate distance scalings also applied
		positive_field = "[" + positive_charge.vx + "," + positive_charge.vy + ",0].sproduct(waterplayground_distancescale / waterplayground_timescale)" +
							".cproduct(" +
								"p.subtract([" + positive_charge.x + "," + positive_charge.y + ", 0])" +
								".sproduct(1.0 / " +
									"Math.pow(" +
										"distance_compute({x:p[0], y:p[1]}, " + JSON.stringify(positive_charge) + ", waterplayground_distancescale) / waterplayground_distancescale" +
									", 3)" +
								")" + 
							")";
		negative_field = "[" + negative_charge.vx + "," + negative_charge.vy + ",0].sproduct(waterplayground_distancescale / waterplayground_timescale)" +
							".cproduct(" +
								"p.subtract([" + negative_charge.x + "," + negative_charge.y + ", 0])" +
								".sproduct(1.0 / " +
									"Math.pow(" +
										"distance_compute({x:p[0], y:p[1]}, " + JSON.stringify(negative_charge) + ", waterplayground_distancescale) / waterplayground_distancescale" +
									", 3)" +
								")" + 
							")";

		total_field_contribution = positive_field + ".subtract(" + negative_field + ")";
		
		B_field.push(".add(" + total_field_contribution + ")");
	}
	B_field.push(".sproduct((mu_0 / (4 * Math.PI)) * 10 * q_e)"); //Multiplying physical and scaling constants TODO fix scaling

	return B_field;
}

//Calculate numerical value of field at a point
function field_compute(position, eqn) {
	commandstring = "p = [" + position.x + "," + position.y + ", 0]; " + eqn;
	return eval(commandstring);
}

//This function does what you expect it to do: compute Lorentz force
function lorentz_force(particle, E_eqn, B_eqn) {
	E_force = field_compute(particle, E_eqn); //E
	B_force = [particle.vx, particle.vy, 0].sproduct(waterplayground_distancescale / waterplayground_timescale)
			  .cproduct(field_compute(particle, B_eqn)); //vB
	return [E_force[0], E_force[1]].add([B_force[0], B_force[1]]).sproduct(particle.charge); //F_lorentz = q(E + vB)
}

//Moment of inertia of water molecule around its center of mass
function inertia_H2O() {
	hydrogen_component = m_H * Math.pow(r_H + r_O, 2);

	molecule_width     = r_O + (r_H + r_O) * Math.cos(52.25 * 2 * Math.PI / 360.0) + r_H;
	oxygen_CM_distance = molecule_width * playground_xcm - r_O;
	oxygen_component   = m_O * Math.pow(oxygen_CM_distance, 2);

	return 2 * hydrogen_component + oxygen_component;
}

var inertia_h2o = inertia_H2O();

//Computes the net motion of a dipole given the forces on its individual components
function dipole_accelerations(dipole, E_eqn, B_eqn) {

	positive_charge = compute_dipole_charge_properties(dipole, "positive");
	negative_charge = compute_dipole_charge_properties(dipole, "negative");
	compute_dipole_velocities(dipole, positive_charge, negative_charge);
	console.log(positive_charge);

	//We can find the forces on each individual particle
	positive_force = lorentz_force(positive_charge, E_eqn, B_eqn);
	negative_force = lorentz_force(negative_charge, E_eqn, B_eqn);

	//Net force is easy to calculate
	net_force = positive_force.add(negative_force);

	//But torque is a little more difficult. Let's start by computing the components of the forces that are perpendicular to the dipole's axis.
	//First we have to figure out the angles at which the forces are pointing.
	positive_angle = angle_compute({x: positive_force[0], y: positive_force[1]}, {x:0, y:0});
	negative_angle = angle_compute({x: negative_force[0], y: negative_force[1]}, {x:0, y:0});
	dipole_angle   = angle_compute(positive_charge, negative_charge);

	relative_positive_angle = dipole_angle - positive_angle;
	relative_negative_angle = dipole_angle - negative_angle;

	//Now we get the perpendicular component since we know now the angle between the forces and the dipole
	positive_force_component = positive_force.magnitude() * Math.sin(relative_positive_angle);
	negative_force_component = negative_force.magnitude() * Math.sin(relative_negative_angle);

	//When positive force makes a positive relative angle with the dipole, it causes the dipole to spin counterclockwise, so it contributes a negative rotational effect (since in PIXI coordinates, positive is clockwise). Similarly the negative force causes a positive rotational effect.
	net_torque = (negative_force_component - positive_force_component) * L_h2o / 2.0;

	return [net_force.sproduct(1.0 / m_H2O), net_torque / inertia_h2o];
}

function move_dipole(dipole, E_eqn, B_eqn) {
	accelerations = dipole_accelerations(dipole, E_eqn, B_eqn);
	translational_a = accelerations[0];
	rotational_a    = accelerations[1];

	dipole.vx += translational_a[0];
	dipole.vy += translational_a[1];
	dipole.omega += rotational_a;

	dipole.x += dipole.vx;
	dipole.y += dipole.vy;
	dipole.rotation += dipole.omega;
}

function randomize_dipole(dipole, temp) { //Gives the dipole a random direction. TODO implement randomization with the Maxwell-Boltzmann function (is this necessary tho?)
	total_energy = 9.0 / 2.0 * K * temp; //For a triatomic molecule, df = 9 so E = 9/2 kT
	transla_velocity = Math.sqrt((2.0 / 9.0) * total_energy / m_H2O * 2); //(2/9) (9/2 kT) = 1/2 mv^2, since 2 out of the 9 degrees of freedom go into 2-dimensional translational motion
	angular_velocity = Math.sqrt((1.0 / 9.0) * total_energy / inertia_h2o * 2); //(1/9) (9/2 kT) = 1/2 mv^2, since 1 out of the 9 degrees of freedom go into rotation in one plane
	
	dipole.rotation = Math.random() * 2 * Math.PI; //random direction of motion
	dipole.omega = angular_velocity;

	t_velocity_x = transla_velocity * Math.cos(dipole.rotation);
	t_velocity_y = transla_velocity * Math.sin(dipole.rotation);
	dipole.vx = t_velocity_x;
	dipole.vy = t_velocity_y;
}

function fix_out_of_bounds(dipole, xlimit, ylimit) { //function to keep the dipoles bounded within the box of the stage. Basically the code is: if on edge, bounce.
	THRESHOLD = 5; //how many pixels away the dipole can be from a wall before it's bounced
	if (Math.abs(dipole.x - 0) <= THRESHOLD || Math.abs(dipole.x - xlimit)) {
		dipole.vx = -dipole.vx;
	}
	if (Math.abs(dipole.y - 0) <= THRESHOLD || Math.abs(dipole.y - ylimit)) {
		dipole.vy = -dipole.vy;
	}
}

function is_touching(dipole1, dipole2) {
	THRESHOLD = 1.05; //this far away from any of the spheres that comprise the water molecule counts as a collisional area.

	//First compute the centers of the circles comprising each molecule
	oxygen_1 = {
		x: dipole1.x,
		y: dipole1.y,
	};
	hydrogen_11 = {
		x: oxygen_1.x + (waterplayground_oxygenwidth + waterplayground_hydrogenwidth) * Math.cos(dipole1.rotation + 52.25),
		y: oxygen_1.y + (waterplayground_oxygenwidth + waterplayground_hydrogenwidth) * Math.sin(dipole1.rotation + 52.25),
	};
	hydrogen_12 = {
		x: oxygen_1.x + (waterplayground_oxygenwidth + waterplayground_hydrogenwidth) * Math.cos(dipole1.rotation - 52.25),
		y: oxygen_1.y + (waterplayground_oxygenwidth + waterplayground_hydrogenwidth) * Math.sin(dipole1.rotation - 52.25),
	};

	oxygen_2 = {
		x: 0,
		y: 0,
	};
	hydrogen_21 = {
		x: oxygen_2.x + (waterplayground_oxygenwidth + waterplayground_hydrogenwidth) * Math.cos(dipole1.rotation + 52.25),
		y: oxygen_2.y + (waterplayground_oxygenwidth + waterplayground_hydrogenwidth) * Math.sin(dipole1.rotation + 52.25),
	};
	hydrogen_22 = {
		x: oxygen_2.x + (waterplayground_oxygenwidth + waterplayground_hydrogenwidth) * Math.cos(dipole1.rotation - 52.25),
		y: oxygen_2.y + (waterplayground_oxygenwidth + waterplayground_hydrogenwidth) * Math.sin(dipole1.rotation - 52.25),
	};

	//Now pairwise compare distance between the components of the molecules. If they're within the threshold then you have a touch.
	if (distance_compute(oxygen_1, oxygen_2) / waterplayground_distancescale <= 2 * r_O * THRESHOLD) {
		return true;
	}
	else if (distance_compute(oxygen_1, hydrogen_21) / waterplayground_distancescale <= (r_O + r_H) * THRESHOLD) {
		return true;
	} 
	else if (distance_compute(oxygen_1, hydrogen_22) / waterplayground_distancescale <= (r_O + r_H) * THRESHOLD) {
		return true;
	}
	else if (distance_compute(hydrogen_11, oxygen_2) / waterplayground_distancescale <= (r_O + r_H) * THRESHOLD) {
		return true;
	}
	else if (distance_compute(hydrogen_11, hydrogen_21) / waterplayground_distancescale <= 2 * r_H * THRESHOLD) {
		return true;
	} 
	else if (distance_compute(hydrogen_11, hydrogen_22) / waterplayground_distancescale <= 2 * r_H * THRESHOLD) {
		return true;
	} 
	else if (distance_compute(hydrogen_12, oxygen_2) / waterplayground_distancescale <= (r_O + r_H) * THRESHOLD) {
		return true;
	}
	else if (distance_compute(hydrogen_12, hydrogen_21) / waterplayground_distancescale <= 2 * r_H * THRESHOLD) {
		return true;
	} 
	else if (distance_compute(hydrogen_12, hydrogen_22) / waterplayground_distancescale <= 2 * r_H * THRESHOLD) {
		return true;
	}
	else {
		return false;
	}
}

function fix_touching(dipole1, dipole2) {

}