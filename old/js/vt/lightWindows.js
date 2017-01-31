// windowCoordinatesFirstRow = {
//     x: [507.3, 521.3, 535.3, 549.3],
//     y: [390, 390, 390, 390]
// }

// windowCoordinatesSecondRow = {
//   x: [507.3, 521.3, 535.3, 549.3],
//   y: [376, 376, 376, 376]
// }

// windowCoordinatesThirdRow = {
//   x: [507.3, 521.3, 535.3, 549.3],
//   y: [362, 362, 362, 362]
// }

// windowCoordinatesFourthRow = {
//   x: [507.3, 521.3, 535.3, 549.3],
//   y: [358, 358, 358, 358]
// }

// windowCoordinatesFifthRow = {
//   x: [507.3, 521.3, 535.3, 549.3]
// }


// windowCoordinatesFirstBuilding = {
//   x: [507.3, 521.3, 535.3, 547.7],
//   y: [389, 375, 362, 349, 337, 324, 311, 298, ]
// }

function lightWindows(){
	var winw = 8.5;
	var x0 = 489.2;
	var y0 = 249.7;
	var yf = 402.6;
	var winxsep = 4.9;
	var winysep = (yf-y0-12*winw)/12;


	var windows = {
	  x : [],
	  y : []
	}

	var tempx = [];
	var tempy = [];
	for (var i = 0; i < 13; i++)
	{
		for (var j = 0; j < 4; j++)
		{
			windows.y.push(y0 + i * (winw + winysep));
		    windows.x.push(x0 + j * (winw + winxsep));
		}
	}

	x0 = 561.5;
	y0 = 313.4;
	yf = 402.6;
	winysep = (yf-y0-7*winw)/7;

	for (var i = 0; i < 8; i++)
	{
		for (var j = 0; j < 4; j++)
		{
			windows.y.push(y0 + i * (winw + winysep));
		    windows.x.push(x0 + j * (winw + winxsep));
		}
	}

	y0 = 262.5;
	yf = 300.7;
	winysep = (yf-y0-3*winw)/3;

	for (var i = 0; i < 8; i++)
	{
		for (var j = 0; j < 2; j++)
		{
			windows.y.push(y0 + i * (winw + winysep));
		    windows.x.push(x0 + j * (winw + winxsep));
		}
	}

	windows.x.push(x0 + winw + winxsep);
	windows.y.push(249.7);

	x0 = 588.3;
	y0 = 237;
	yf = 249.7;
	winysep = (yf-y0-winw);

	for (var i = 0; i < 2; i++)
	{
		for (var j = 0; j < 2; j++)
		{
			windows.y.push(y0 + i * (winw + winysep));
		    windows.x.push(x0 + j * (winw + winxsep));
		}
	}

	windows.x.push(x0 + winw + winxsep);
	windows.y.push(224.3);	

	x0 = 636.8;
	y0 = 288;
	yf = 402.6;
	winysep = (yf-y0-9*winw)/9;

	for (var i = 0; i < 10; i++)
	{
		for (var j = 0; j < 3; j++)
		{
			windows.y.push(y0 + i * (winw + winysep));
		    windows.x.push(x0 + j * (winw + winxsep));
		}
	}

	x0 = 697.8;
	y0 = 275.2;
	yf = 402.6;
	winysep = (yf-y0-10*winw)/10;

	for (var i = 0; i < 11; i++)
	{
		for (var j = 0; j < 2; j++)
		{
			windows.y.push(y0 + i * (winw + winysep));
		    windows.x.push(x0 + j * (winw + winxsep));
		}
	}

	x0 = 704.5;
	y0 = 211.5;
	yf = 262.5;
	winysep = (yf-y0-4*winw)/4;

	for (var i = 0; i < 5; i++)
	{
		for (var j = 0; j < 1; j++)
		{
			windows.y.push(y0 + i * (winw + winysep));
		    windows.x.push(x0 + j * (winw + winxsep));
		}
	}

	x0 = 684.4;
	y0 = 198.8;


	for (var j = 0; j < 4; j++)
	{
		windows.y.push(y0);
	    windows.x.push(x0 + j * (winw + winxsep));
	}
	
	x0 = 756.1;
	y0 = 224.3;
	yf = 402.6;
	winysep = (yf-y0-14*winw)/14;

	for (var i = 0; i < 15; i++)
	{
		for (var j = 0; j < 2; j++)
		{
			windows.y.push(y0 + i * (winw + winysep));
		    windows.x.push(x0 + j * (winw + winxsep));
		}
	}

	x0 = 806.3;

	for (var i = 0; i < 15; i++)
	{
		for (var j = 0; j < 2; j++)
		{
			windows.y.push(y0 + i * (winw + winysep));
		    windows.x.push(x0 + j * (winw + winxsep));
		}
	}

	x0 = 852.6;
	y0 = 313.4;
	yf = 402.6;
	winysep = (yf-y0-7*winw)/7;

	for (var i = 0; i < 8; i++)
	{
		for (var j = 0; j < 3; j++)
		{
			windows.y.push(y0 + i * (winw + winysep));
		    windows.x.push(x0 + j * (winw + winxsep));
		}
	}

	x0 = 866;
	y0 = 288;
	yf = 300.7;
	winysep = (yf-y0-winw);

	for (var i = 0; i < 2; i++)
	{
		for (var j = 0; j < 2; j++)
		{
			windows.y.push(y0 + i * (winw + winysep));
		    windows.x.push(x0 + j * (winw + winxsep));
		}
	}

	x0 = 879.4;
	y0 = 262.5;
	yf = 275.2;
	winysep = (yf-y0-winw);

	for (var i = 0; i < 2; i++)
	{
		for (var j = 0; j < 1; j++)
		{
			windows.y.push(y0 + i * (winw + winysep));
		    windows.x.push(x0 + j * (winw + winxsep));
		}
	}


	winElecNorm = maxElectric/windows.x.length;

	for (var i=0; i < windows.x.length ; i++)
	{
		wind = new PIXI.Sprite(id["litWin.png"]);
		wind.position.set(windows.x[i],windows.y[i]);
		// citySubcontainer.addChild(wind);
		citySubcontainer.addChild(wind);
		winAliens.push(wind);		
		// console.log(wind.position)
		wind.visible = false;
	}

	var numArray = new Array(winAliens.length);
	for (var i = 0; i < numArray.length; i++) numArray[i]=i;
	shuffle(numArray);
	for (var i = 0; i < numArray.length; i++) shufWinAliens[numArray[i]]=winAliens[i];

	// for (var i=0; i < windows.x.length ; i++)
	// {
	// 	shufWinAliens[i].visible = false;
	// }



}
