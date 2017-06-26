$(document).ready(function() {
	$("#proton-collision-animation").hide();
	$("#strong-nuclear-animation").hide();
	$("#protoncollision-newtext").hide();
	$("#mass-defect-explanation").hide();

	$("#mass-defect-2").hide();
});

$(".change-mass-defect-text").click(function() {
	$("#mass-defect-1").fadeOut(function() {
		$("#mass-defect-2").fadeIn();
	});
});

$("#mass-defect-slide").click(function() {
	$("#strong-nuclear-animation").fadeOut(function() {
		$("#mass-defect-explanation").fadeIn();
	});
});

$("#mass-defect-animation-trigger").click(function() {
	animationLoop();
});

$("#proton-collision-slide").click(function() {
	$("#intro").fadeOut(function() {
		$("#proton-collision-animation").fadeIn();
	});
});