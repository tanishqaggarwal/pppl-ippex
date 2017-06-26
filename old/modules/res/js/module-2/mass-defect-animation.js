$(document).ready(function() {
	$("#mass-defect-2").hide();
});

$(".change-mass-defect-text").click(function() {
	$("#mass-defect-1").fadeOut(function() {
		$("#mass-defect-2").fadeIn();
	});
});

$("#mass-defect-animation-trigger").click(function() {
	animationLoop();
});