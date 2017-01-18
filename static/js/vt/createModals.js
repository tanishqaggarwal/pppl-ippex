document.addEventListener('keydown', onKeyDown);

function onKeyDown(key) {
    if (key.keyCode == 67) {//c
        if (stateVar.modal.auxSlider) {
            // console.log("here");
            window.open("https://youtu.be/N4yWhA1mVxA?t=282");
        }
    }
    if (key.keyCode == 68) {//d
        if (stateVar.modal.densLimit) window.open("http://wiki.fusenet.eu/fusionwiki/index.php/Disruption");
        if (stateVar.modal.health) window.open("http://wiki.fusenet.eu/fusionwiki/index.php/Disruption");
    }
    if (key.keyCode == 72) {//h
        if (stateVar.modal.magSlider) window.open("http://en.wikipedia.org/wiki/High-temperature_superconductivity");
    }
    if (key.keyCode == 77) {//m

        if (stateVar.modal.aux) window.open("https://www.iter.org/mach/heating");
        if (stateVar.modal.auxSlider) window.open("https://youtu.be/N4yWhA1mVxA?t=282");
        if (stateVar.modal.blanket) window.open("https://www.iter.org/mach/Blanket");
        if (stateVar.modal.centerStack) window.open("https://youtu.be/N4yWhA1mVxA?t=282");
        if (stateVar.modal.city) window.open("https://www.iter.org/sci/FusionFuels");
        if (stateVar.modal.exchanger) window.open("http://science.howstuffworks.com/fusion-reactor4.htm");
        if (stateVar.modal.heat) window.open("http://fusionforenergy.europa.eu/understandingfusion/demo.aspx");
        if (stateVar.modal.coils) window.open("https://youtu.be/N4yWhA1mVxA?t=163");        
        if (stateVar.modal.reactor) window.open("https://en.wikipedia.org/wiki/Tokamak");
        if (stateVar.modal.steam) window.open("http://www.ccfe.ac.uk/fusion_power.aspx");
        if (stateVar.modal.tritium) window.open("http://www.sciencedirect.com/science/article/pii/S0920379610002486");
        if (stateVar.modal.vessel) window.open("https://www.iter.org/mach/VacuumVessel");
    }
    if (key.keyCode == 78) {//n
        if (stateVar.modal.auxSlider) window.open("https://en.wikipedia.org/wiki/Neutral_beam_injection");
    }
    if (key.keyCode == 80) {//p
        if (stateVar.modal.vessel) window.open("https://en.wikipedia.org/wiki/Plasma_(physics)");
    }
    if (key.keyCode == 81) {//q
        if (stateVar.modal.score) window.open("https://en.wikipedia.org/wiki/Fusion_energy_gain_factor");
    }
    if (key.keyCode == 82) {//r
        if (stateVar.modal.reactor) window.open("http://scied-web.pppl.gov/rgdx/");
    }
    if (key.keyCode == 84) {//t
        if (stateVar.modal.reactor) window.open("http://scied-web.pppl.gov/rgdx/");
        if (stateVar.modal.betaLimit) window.open("http://wiki.fusenet.eu/fusionwiki/index.php/Beta");
        if (stateVar.modal.electric) window.open("https://en.wikipedia.org/wiki/Closed-cycle_gas_turbine");
    }
    if (key.keyCode == 87) {//w
        if (stateVar.modal.auxSlider) window.open("https://www.psfc.mit.edu/research/topics/plasma-heating-current-drive");
    }
}

function createModals() {

        modalPos = {
            left1 : {
                x : 18.2,
                y : 90
            },
            right1 : {
                x : 650,
                y : 90
            },
            center1 : {
                x : 165,
                y : 90
            }
        };


        // greenModal = new PIXI.RoundedRectangle(0,0,modalPos.coils.w,modalPos.coils.h);


	    modalMagnet = new PIXI.Sprite(idM["modalMagnet.png"]);
        modalMagnet.position.set(modalPos.left1.x,modalPos.left1.y);
        modalMagnet.alpha = 0.8;
        tokaModals.addChild(modalMagnet);

        modalAux = new PIXI.Sprite(idM["modalAux.png"]);
        modalAux.position.set(modalPos.right1.x,modalPos.right1.y);
        modalAux.alpha = 0.8;
        tokaModals.addChild(modalAux);

        modalCentralSolenoid = new PIXI.Sprite(idM["modalCentralSolenoid.png"]);
        modalCentralSolenoid.position.set(modalPos.left1.x,modalPos.left1.y);
        modalCentralSolenoid.alpha = 0.8;
        tokaModals.addChild(modalCentralSolenoid);

        modalVessel = new PIXI.Sprite(idM["modalVessel.png"]);
        modalVessel.position.set(modalPos.left1.x,modalPos.left1.y);
        modalVessel.alpha = 0.8;
        tokaModals.addChild(modalVessel);

        modalBlanket = new PIXI.Sprite(idM["modalBlanket.png"]);
        modalBlanket.position.set(modalPos.right1.x,modalPos.right1.y);
        modalBlanket.alpha = 0.8;
        exchangerModals.addChild(modalBlanket);

        modalTritium = new PIXI.Sprite(idM["modalTritium.png"]);
        modalTritium.position.set(modalPos.right1.x,modalPos.right1.y);
        modalTritium.alpha = 0.8;
        exchangerModals.addChild(modalTritium);

        modalHeat = new PIXI.Sprite(idM["modalHeat.png"]);
        modalHeat.position.set(modalPos.left1.x,modalPos.left1.y);
        modalHeat.alpha = 0.8;
        exchangerModals.addChild(modalHeat);

        modalSteam = new PIXI.Sprite(idM["modalSteam.png"]);
        modalSteam.position.set(modalPos.left1.x,modalPos.left1.y);
        modalSteam.alpha = 0.8;
        exchangerModals.addChild(modalSteam);

        modalReactor = new PIXI.Sprite(idM["modalReactor.png"]);
        modalReactor.position.set(modalPos.center1.x,modalPos.center1.y);
        modalReactor.alpha = 0.8;
        topModals.addChild(modalReactor);

        modalExchanger = new PIXI.Sprite(idM["modalExchanger.png"]);
        modalExchanger.position.set(modalPos.center1.x,modalPos.center1.y);
        modalExchanger.alpha = 0.8;
        topModals.addChild(modalExchanger);

        modalCity = new PIXI.Sprite(idM["modalCity.png"]);
        modalCity.position.set(modalPos.center1.x,modalPos.center1.y);
        modalCity.alpha = 0.8;
        topModals.addChild(modalCity);

        modalDensity = new PIXI.Sprite(idGM["modalDensity.png"]);
        modalDensity.position.set(modalPos.center1.x,modalPos.center1.y);
        modalDensity.alpha = 0.8;
        topModals.addChild(modalDensity);

        modalAuxSlider = new PIXI.Sprite(idGM["modalAuxSlider.png"]);
        modalAuxSlider.position.set(modalPos.center1.x,modalPos.center1.y);
        modalAuxSlider.alpha = 0.8;
        topModals.addChild(modalAuxSlider);

        modalMagSlider = new PIXI.Sprite(idGM["modalMagSlider.png"]);
        modalMagSlider.position.set(modalPos.center1.x,modalPos.center1.y);
        modalMagSlider.alpha = 0.8;
        topModals.addChild(modalMagSlider);

        modalWall = new PIXI.Sprite(idGM["modalWall.png"]);
        modalWall.position.set(modalPos.center1.x,modalPos.center1.y);
        modalWall.alpha = 0.8;
        topModals.addChild(modalWall);

        modalTemperature = new PIXI.Sprite(idGM["modalTemperature.png"]);
        modalTemperature.position.set(modalPos.center1.x,modalPos.center1.y);
        modalTemperature.alpha = 0.8;
        topModals.addChild(modalTemperature);

        modalElectric = new PIXI.Sprite(idGM["modalElectric.png"]);
        modalElectric.position.set(modalPos.center1.x,modalPos.center1.y);
        modalElectric.alpha = 0.8;
        topModals.addChild(modalElectric);

        modalScore = new PIXI.Sprite(idGM["modalScore.png"]);
        modalScore.position.set(modalPos.center1.x,modalPos.center1.y);
        modalScore.alpha = 0.8;
        topModals.addChild(modalScore);

        modalDensLimit = new PIXI.Sprite(idGM["modalDensLimit.png"]);
        modalDensLimit.position.set(modalPos.left1.x,modalPos.left1.y);
        modalDensLimit.alpha = 0.8;
        topModals.addChild(modalDensLimit);

        modalBetaLimit = new PIXI.Sprite(idGM["modalBetaLimit.png"]);
        modalBetaLimit.position.set(modalPos.left1.x,modalPos.left1.y);
        modalBetaLimit.alpha = 0.8;
        topModals.addChild(modalBetaLimit);




        modalVesselSpace = new PIXI.Sprite(id["outerWall.png"]);
        modalVesselSpace.anchor.set(0.5,0.5);
        modalVesselSpace.width = Machine.diam;
        modalVesselSpace.height = Machine.diam;
        modalVesselSpace.position.set(torCenter.x,torCenter.y);
        modalVesselSpace.alpha = 0.0;
        tokaModals.addChild(modalVesselSpace);
        modalVesselSpace.txt = "vessel";
        buttonizeModal(modalVesselSpace);


        modalCenterStackSpace = new PIXI.Sprite(id["innerWall.png"]);
        modalCenterStackSpace.anchor.set(0.5,0.5);
        modalCenterStackSpace.width = 2 * (Torus.R - Torus.r) - 2 * Machine.sol;
        modalCenterStackSpace.height = 2 * (Torus.R - Torus.r) - 2 * Machine.sol;
        modalCenterStackSpace.position.set(torCenter.x,torCenter.y);
        modalCenterStackSpace.alpha = 0.0;
        tokaModals.addChild(modalCenterStackSpace);
        modalCenterStackSpace.txt = "centerStack";
        buttonizeModal(modalCenterStackSpace);

        modalAntennaSpace = new PIXI.Sprite(id["antennaRed.png"]);
	    modalAntennaSpace.position.set(antennaPos[0],antennaPos[1]);
        modalAntennaSpace.alpha = 0.0;
        tokaModals.addChild(modalAntennaSpace);
        modalAntennaSpace.txt = "aux";
        buttonizeModal(modalAntennaSpace);

        coilSquares = [1/Math.sqrt(2)*(Torus.R-Torus.r-Machine.sol/2),1/Math.sqrt(2)*Torus.R,1/Math.sqrt(2)*(Torus.R+Torus.r+Machine.sol/2),40]

        allCoilSquares = [];
        coilGraph = new PIXI.Graphics();
        coilGraph.beginFill(0x8bc5ff, 0.4);
        coilGraph.drawRect(0,0,coilSquares[3],coilSquares[3]);

        for(var i=0 ; i<12 ; i++) {
	        modalCoil = new PIXI.Sprite(coilGraph.generateTexture(false));
	        modalCoil.anchor.set(0.5,0.5);
	        modalCoil.position.set(torCenter.x+Math.pow(-1,Math.floor(i/6)%2)*coilSquares[i%3],torCenter.y+Math.pow(-1,Math.floor(i/3)%2)*coilSquares[i%3]);
	        // modalCoil.position.set(torCenter.x+Math.pow(-1,(Math.floor(i/6)%2))*coilSquares[1],torCenter.y+coilSquares[1];
            allCoilSquares.push(modalCoil);
            tokaModals.addChild(modalCoil);
            modalCoil.txt="coils";
            buttonizeModal(modalCoil);
            modalCoil.alpha=0.;
        }

        modalTririumSpace = new PIXI.Sprite(id["tritiumRed.png"]);
        modalTririumSpace.position.set(361.9,248.2);
        exchangerModals.addChild(modalTririumSpace);
        modalTririumSpace.txt = "tritium";
        buttonizeModal(modalTririumSpace);
        modalTririumSpace.alpha = 0;

        modalHeatSpace = new PIXI.Sprite(id["heatRed.png"]);
        modalHeatSpace.position.set(576.5,248.2);
        exchangerModals.addChild(modalHeatSpace);
        modalHeatSpace.txt = "heat";
        buttonizeModal(modalHeatSpace);
        modalHeatSpace.alpha = 0;

        modalSteamSpace = new PIXI.Sprite(id["steamRed.png"]);
        modalSteamSpace.position.set(797.5,248.2);
        exchangerModals.addChild(modalSteamSpace);
		modalSteamSpace.txt = "steam";
		buttonizeModal(modalSteamSpace);
		modalSteamSpace.alpha = 0;

        modalBlanketSpace = new PIXI.Sprite(id["redBlanket.png"]);
        modalBlanketSpace.position.set(43.978,193.111);
        exchangerModals.addChild(modalBlanketSpace);
        modalBlanketSpace.txt = "blanket";
        buttonizeModal(modalBlanketSpace);
        modalBlanketSpace.alpha = 0;

        modalCitySpace = new PIXI.Sprite(id["cityRed.png"]);
        modalCitySpace.position.set(386.5,193.1);
        // modalCitySpace.position.set(405.3,174);
        cityModals.addChild(modalCitySpace);
        modalCitySpace.txt = "cityscape";
        buttonizeModal(modalCitySpace);
        modalCitySpace.alpha = 0;


        densTextRed = new PIXI.Text("Density:");
        densTextRed.style = {fill:"red", font:"20px calibri"};
        // densTextRed.text = "Density: ";
        densTextRed.anchor.set(0.5,1);
        densTextRed.position.set(contPos.densText.pos[0],contPos.densText.pos[1]);
        topControls.addChild(densTextRed);
        densTextRed.txt = "densitySlider";
        buttonizeModal(densTextRed);


        auxTextRed = new PIXI.Text("Auxiliary Power:");
        auxTextRed.style = {fill:"red", font:"20px calibri"};
        // auxTextRed.text = "Density: ";
        auxTextRed.anchor.set(0.5,1);
        auxTextRed.position.set(contPos.auxText.pos[0],contPos.auxText.pos[1]);
        topControls.addChild(auxTextRed);   
        auxTextRed.txt = "auxSlider"
        buttonizeModal(auxTextRed);

        magTextRed = new PIXI.Text("Magnetic Field:");
        magTextRed.style = {fill:"red", font:"20px calibri"};
        // magTextRed.text = "Density: ";
        magTextRed.anchor.set(0.5,1);
        magTextRed.position.set(contPos.magText.pos[0],contPos.magText.pos[1]);
        topControls.addChild(magTextRed);     
        magTextRed.txt = "magSlider"
        buttonizeModal(magTextRed);


        healthTextRed = new PIXI.Text("Wall Health:");
        healthTextRed.style = {fill:"red", font:"20px calibri"};
        // healthTextRed.text = "Density: ";
        healthTextRed.anchor.set(0,1);
        healthTextRed.position.set(contPos.box.pos[0] + contPos.outputLeft , contPos.box.pos[1] + contPos.healthBot);
        topModals.addChild(healthTextRed);
        healthTextRed.txt = "health";
        buttonizeModal(healthTextRed);


        tempTextRed = new PIXI.Text("Temperature:");
        tempTextRed.style = {fill:"red", font:"20px calibri"};
        // tempTextRed.text = "Density: ";
        tempTextRed.anchor.set(0,1);
        tempTextRed.position.set(contPos.box.pos[0] + contPos.outputLeft , contPos.box.pos[1] + contPos.tempBot);
        topModals.addChild(tempTextRed);
        tempTextRed.txt = "temperature";
        buttonizeModal(tempTextRed);

        elecTextRed = new PIXI.Text("Electric Power:");
        elecTextRed.style = {fill:"red", font:"20px calibri"};
        // elecTextRed.text = "Density: ";
        elecTextRed.anchor.set(0,1);
        elecTextRed.position.set(contPos.box.pos[0] + contPos.outputLeft , contPos.box.pos[1] + contPos.elecBot);
        topModals.addChild(elecTextRed);
        elecTextRed.txt = "electric";
        buttonizeModal(elecTextRed);

        scoreTextRed = new PIXI.Text("Score:");
        scoreTextRed.style = {fill:"red", font:"40px calibri"};
        scoreTextRed.anchor.set(0,1);
        scoreTextRed.position.set(contPos.box.pos[0] + contPos.outputLeft , contPos.box.pos[1] + contPos.scoreBot);
        topModals.addChild(scoreTextRed);
        scoreTextRed.txt = "score";
        buttonizeModal(scoreTextRed);




}

function workModals() {

        if (stateVar.modal.vessel) {
            outerWallDanger.alpha = 1;
            innerWallDanger.alpha = 0;
            modalVessel.visible = true;
        } else {
            modalVessel.visible = false;
        }

        if (stateVar.modal.centerStack) {
            modalCentralSolenoid.visible = true;
            outerWallDanger.alpha = 0;
            innerWallDanger.alpha = 1;
        } else {
            modalCentralSolenoid.visible = false;
        }
        if (stateVar.modal.aux) {
            antennaRed.visible = true;
            modalAux.visible = true;
            // modalCenterStack.visible = true;
        } else {
            modalAux.visible = false;
            antennaRed.visible = false;
            // modalCenterStack.visible = false;
        }
        if (stateVar.modal.coils) {
            modalMagnet.visible = true;
            coilsRed.visible = true;
            // modalCenterStack.visible = true;
        } else {
            modalMagnet.visible = false;
            coilsRed.visible = false;
            // modalCenterStack.visible = false;
        }
        if (stateVar.modal.tritium) {
            modalTritium.visible = true;
            tritiumRed.visible = true;
            // modalCenterStack.visible = true;
        } else {
            modalTritium.visible = false;
            tritiumRed.visible = false;
            // modalCenterStack.visible = false;
        }
        if (stateVar.modal.heat) {
            modalHeat.visible = true;
            heatRed.visible = true;
            // modalCenterStack.visible = true;
        } else {
            modalHeat.visible = false;
            heatRed.visible = false;
            // modalCenterStack.visible = false;
        }
        if (stateVar.modal.steam) {
            steamRed.visible = true;
            modalSteam.visible = true;
            // modalCenterStack.visible = true;
        } else {
            modalSteam.visible = false;
            steamRed.visible = false;
            // modalCenterStack.visible = false;
        }
        if (stateVar.modal.blanket) {
            modalBlanket.visible = true;
            redBlanket.visible = true;
            // modalCenterStack.visible = true;
        } else {
            modalBlanket.visible = false;
            redBlanket.visible = false;
            // modalCenterStack.visible = false;
        }
        if (stateVar.modal.cityscape) {
        //    cityWindows.visible = true;
          // modalCity.visible = true;
            cityRed.visible = true;
            // modalCenterStack.visible = true;
        } else {
          //  cityWindows.visible = true;
          // modalCity.visible = false;
            cityRed.visible = false;
            // modalCenterStack.visible = false;
        }
        if (stateVar.modal.densitySlider) {
            modalDensity.visible = true;
        } else {
            modalDensity.visible = false;
        }
        if (stateVar.modal.auxSlider) {
            modalAuxSlider.visible = true;
        } else {
            modalAuxSlider.visible = false;
        }
        if (stateVar.modal.magSlider) {
            modalMagSlider.visible = true;
            magText.alpha = 0;
            magTextRed.alpha = 1;
        } else {
            modalMagSlider.visible = false;
            magText.alpha = 1;
            magTextRed.alpha = 0;
        }


        if (stateVar.modal.densitySlider) {
            densText.alpha = 0;
            densTextRed.alpha = 1;
        }
        else {
            densText.alpha = 1;
            densTextRed.alpha = 0;
        }
        if (stateVar.modal.auxSlider) {
            auxText.alpha = 0;
            auxTextRed.alpha = 1;
        }
        else {
            auxText.alpha = 1;
            auxTextRed.alpha = 0;
        }
        if (stateVar.modal.auxSlider) {
            auxText.alpha = 0;
            auxTextRed.alpha = 1;
        }
        else {
            auxText.alpha = 1;
            auxTextRed.alpha = 0;
        }


        if (stateVar.modal.health) {
            modalWall.visible = true;
            healthText.alpha = 0;
            healthTextRed.alpha = 1;
        }
        else {
            modalWall.visible = false;
            healthText.alpha = 1;
            healthTextRed.alpha = 0;
        }
        if (stateVar.modal.temperature) {
            modalTemperature.visible = true;
            tempText.alpha = 0;
            tempTextRed.alpha = 1;
        }
        else {
            modalTemperature.visible = false;
            tempText.alpha = 1;
            tempTextRed.alpha = 0;
        }
        if (stateVar.modal.electric) {
            modalElectric.visible = true;
            elecText.alpha = 0;
            elecTextRed.alpha = 1;
        }
        else {
            modalElectric.visible = false;
            elecText.alpha = 1;
            elecTextRed.alpha = 0;
        }
        if (stateVar.modal.score) {
            modalScore.visible = true;
        	scoreText.alpha = 0;
            scoreTextRed.alpha = 1;
            // console.log(stateVar.modal.health);
        }
        else {
            modalScore.visible = false;
            scoreText.alpha = 1;
            scoreTextRed.alpha = 0;
        }
        if (stateVar.modal.reactor) {
            modalReactor.visible = true;
        } else {
            modalReactor.visible = false;
        }
        if (stateVar.modal.exchanger) {
            modalExchanger.visible = true;
        } else {
            modalExchanger.visible = false;
        }
        if (stateVar.modal.city) {
            modalCity.visible = true;
        } else {
            modalCity.visible = false;
        }
        if (stateVar.modal.densLimit) {
            modalDensLimit.visible = true;
        } else {
            modalDensLimit.visible = false;
        }
        if (stateVar.modal.betaLimit) {
            modalBetaLimit.visible = true;
        } else {
            modalBetaLimit.visible = false;
        }

    //    electricPower = finalOut.P_elec*1.e-6;
    //    if(electricPower > 0) {
    //      cityWindows.visible = true;
      //    cityWindows1.visible = true;
        }
  //      else {
    //      cityWindows.visible = true //false;
    //      cityWindows1.visible = true //false;
    //    }
 // }
