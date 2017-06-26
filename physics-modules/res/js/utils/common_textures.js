function circle_texture(particlewidth, renderer, color=0x0000ff) {
	dottexture = new PIXI.RenderTexture(renderer, 2 * particlewidth, 2 * particlewidth);
	var graphics = new PIXI.Graphics();
	graphics.beginFill(color);
	graphics.drawCircle(particlewidth, particlewidth, particlewidth);
	graphics.endFill();
	dottexture.render(graphics);

	return dottexture;
}