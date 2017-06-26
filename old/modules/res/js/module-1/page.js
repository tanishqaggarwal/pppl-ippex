$(document).ready(function() {
	//$("#intro-text-2").hide();
	//$("#ac-disclaimer-text").hide();
	//$("#traffic-jam").hide();
	//$("#particle-interactions").hide();
	//$("#positive-page-2").hide();
});

$("#show-electrons").click(function() {
	$("#intro-text-1").fadeOut(function() {
		$("#intro-text-2").fadeIn();
	});	
});

$("#ac-disclaimer").click(function() {
	$("#ac-disclaimer-text").show();
});

$("#show-traffic-jam").click(function() {
	$("#intro").fadeOut(function() {
		$("#traffic-jam").fadeIn();
	});
});

$("#positive-page-action-2").click(function() {
	$("#positive-page-1").fadeOut(function() {
		$("#positive-page-2").fadeIn();
	});
});

$("#atom-conundrum-action").click(function() {
	$("#violent-but-balanced-force").fadeOut(function() {
		$("#atom-conundrum").fadeIn();
	});
});

function electron_texture(particlewidth, renderer) {
	dottexture = new PIXI.RenderTexture(renderer, 2 * particlewidth, 2 * particlewidth);
	var graphics = new PIXI.Graphics();
	graphics.beginFill(0x0000ff);
	graphics.drawCircle(particlewidth, particlewidth, particlewidth);
	graphics.endFill();
	dottexture.render(graphics);

	return dottexture;
}