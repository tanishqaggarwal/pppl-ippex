function play() {
        stateVar.endonce = true;
        introContainer.visible = false;
        gameContainer.visible = true;
        endContainer.visible = false;
// console.log("here now")
        ext.dens.value = (((densBut.x - contPos.densSlider.pos[0] - contPos.arrowWidth - contPos.buffer)/contPos.sliderRange)*(ext.dens.max-ext.dens.min) + ext.dens.min).toFixed(2);
        ext.aux.value = (((auxBut.x - contPos.auxSlider.pos[0] - contPos.arrowWidth - contPos.buffer)/contPos.sliderRange)*(ext.aux.max-ext.aux.min) + ext.aux.min).toFixed(2);
        ext.mag.value = (((magBut.x - contPos.magSlider.pos[0] - contPos.arrowWidth - contPos.buffer)/contPos.sliderRange)*(ext.mag.max-ext.mag.min) + ext.mag.min).toFixed(2);

        magVal = ext.mag.value;
        densVal = ext.dens.value;
        powVal = ext.aux.value;

        if (count % 2 < 0.1 || count == 0 || forceCalculation) {
            forceCalculation = false;
            finalTemptemp = bisectionAdvanced();
            finalTemp = (isNaN(finalTemptemp) || finalTemptemp<0) ? 0 : finalTemptemp;
            // console.log(finalTemp);

            finalOut = calcScore(finalTemp);
            tempToText = finalOut.tempkev;
            powToText = (finalOut.P_elec > 0) ? finalOut.P_elec : 0

            if (finalOut.betalimited || finalOut.densitylimited) {  //Plasma is off because of limits
                stateVar.plasmaon = false;
                tempToText = 0;
                powToText = 0;
                

                if (!stateVar.justexploded) {
                    stateVar.justexploded = true;
                    explosion3.play();
                    turnon.stop();
                    running.stop();
                    disruptions += 1;
                    if (disruptions >= maxDisruptions) {
                        dragAndDropManager.releaseAll();
                        state = endgame;
                        stateVar.countStart.state = true;
                        stateVar.countStart.timer = count;


                    }
                }
                } else {
                if (stateVar.justexploded) {
                    turnon.play()
                    running.play();
                }


                stateVar.plasmaon = true;
                stateVar.justexploded = false;

            }
                // running.play();

            // shoot.play();
            // if (justexploded) {
            //     // alert("justexploded");
            //     // shoot.play();
            // }
        }
        if (stateVar.plasmaon) {
            lastdens = densVal;
            lastaux = powVal;
            lastmag = magVal;
        }
        tempNum.text = tempToText.toFixed(3) + " keV";
        elecNum.text = (powToText*1.e-6).toFixed(0) + " MW";
        scoreNum.text = finalOut.score.toFixed(0);
        highScore = Math.max(finalOut.score, highScore);
        // if (finalOut.P_elec < 0) elecNum.style.fill = "red"; else elecNum.style.fill = "white";

        if (finalOut.betalimited) {
            betaLimitText.visible = true;
            // console.log("true");
            } else betaLimitText.visible = false;
        if (finalOut.densitylimited) densLimitText.visible = true; else densLimitText.visible = false;

        densNum.text = ext.dens.value + " E20";
        auxNum.text = ext.aux.value;
        magNum.text = ext.mag.value;
        // console.log(ext.mag.value)



        waveMove = (count % 6) * 10 ;
        wave.position.x =  torCenter.x - 255 + waveMove;

        vel = 20/3;
        Per1 = 3;
        Per2 = 2* Per1;
        Lamb1 = vel * Per1;
        Lamb2 = vel * Per2;
        

        // tube1Move = (count % (0.011*tube1Pos[2]*2)) * 5 ;
        tube1Move = (count % Per1) ;
        tube2Move = (count % Per2) ;

        // wave_tube1.position.x = tube1Pos[0] + 0.5*tube1Pos[2] - Lamb1/4 + Lamb1/Per1 * tube1Move ;
        wave_tube1.position.x = tube1Pos[0] + 0.5*tube1Pos[2] - Lamb1/2 + vel * tube1Move;
        wave_tube2.position.x = tube2Pos[0] + 0.5*tube2Pos[2] - Lamb1/2 + vel * tube1Move;
        wave_tube3.position.y = tube3Pos[1] + 0.5*tube3Pos[3] - Lamb2/2 + vel * tube2Move;
        wave_tube4.position.x = tube4Pos[0] + 0.5*tube4Pos[2] + Lamb2/2 - vel * tube2Move;
        wave_tube5.position.y = tube5Pos[1] + 0.5*tube5Pos[3] + Lamb2/2 - vel * tube2Move;
        wave_tube6.position.y = tube6Pos[1] + 0.5*tube6Pos[3] - Lamb2/2 + vel * tube2Move;
        wave_tube7.position.x = tube7Pos[0] + 0.5*tube7Pos[2] + Lamb2/2 - vel * tube2Move;
        wave_tube8.position.y = tube8Pos[1] + 0.5*tube8Pos[3] + Lamb2/2 - vel * tube2Move;
        wave_tube9.position.y = tube9Pos[1] + 0.5*tube9Pos[3] + Lamb1/2 - vel * tube1Move;
        wave_tube10.position.x = tube10Pos[0] + 0.5*tube10Pos[2] - Lamb1/2 + vel * tube1Move;
        wave_tube11.position.y = tube11Pos[1] + 0.5*tube11Pos[3] - Lamb1/2 + vel * tube1Move;

        wave_tube1.alpha = scoreNum.text/202;
        wave_tube2.alpha = scoreNum.text/202;
        wave_tube3.alpha = scoreNum.text/202;
        wave_tube4.alpha = scoreNum.text/202;
        wave_tube5.alpha = scoreNum.text/202;
        wave_tube6.alpha = scoreNum.text/202;
        wave_tube7.alpha = scoreNum.text/202;
        wave_tube8.alpha = scoreNum.text/202;
        wave_tube9.alpha = scoreNum.text/202;
        wave_tube10.alpha = scoreNum.text/202;
        wave_tube11.alpha = scoreNum.text/202;

        tubeTop1.alpha = scoreNum.text/202*0.4;
        tubeTop2.alpha = scoreNum.text/202*0.4;
        tubeTop3.alpha = scoreNum.text/202*0.4;
        tubeTop4.alpha = scoreNum.text/202*0.4;
        tubeTop5.alpha = scoreNum.text/202*0.4;
        tubeTop6.alpha = scoreNum.text/202*0.4;
        tubeTop7.alpha = scoreNum.text/202*0.4;
        tubeTop8.alpha = scoreNum.text/202*0.4;
        tubeTop9.alpha = scoreNum.text/202*0.4;
        tubeTop10.alpha = scoreNum.text/202*0.4;
        tubeTop11.alpha = scoreNum.text/202*0.4;



        for (var i = 0; i < tritAliens.length; i++)
        {
            // console.log(tritAliens.length);
            var trit = tritAliens[i];
            // console.log(trit.tube);
            if (trit.tube == "1")
            {
                trit.position.x = trit.position.x + 0.1*vel ;
                if (trit.position.x > tubeTri1[0] + tubeTri1[2]) 
                    {trit.position.x = tubeTri1[0]}
                // trit.visible = false;
                if (i < scoreNum.text/202*trits1)
                        trit.visible = true;
                    else
                        trit.visible = false;
            }
            if (trit.tube == "2")
            {
                trit.position.y = trit.position.y - 0.1*vel ;
                if (trit.position.y < tubeTri2[1]) 
                    {trit.position.y = tubeTri2[1] + tubeTri2[3]}
               if (i < trits1+scoreNum.text/202*trits2)
                        trit.visible = true;
                    else
                        trit.visible = false;
                // console.log(trit.x);
            }
            if (trit.tube == "3")
            {
                trit.position.x = trit.position.x - 0.1*vel ;
                if (trit.position.x < tubeTri3[0]) 
                    {trit.position.x = tubeTri3[0] + tubeTri3[2]}
               if (i < trits1+trits2+scoreNum.text/202*trits3)
                        trit.visible = true;
                    else
                        trit.visible = false;
                // console.log(trit.x);
            }
            if (trit.tube == "4")
            {
                trit.position.y = trit.position.y + 0.1*vel ;
                if (trit.position.y > tubeTri4[1] + tubeTri4[3]) 
                    {trit.position.y = tubeTri4[1]}
               if (i < trits1+trits2+trits3+scoreNum.text/202*trits4)
                        trit.visible = true;
                    else
                        trit.visible = false;
                // console.log(trit.x);
            }
        }




        // tube2Move = (count % (0.011*tube2Pos[2]*2)) * 5 ;
        // wave_tube2.position.x = tube2Pos[0]+0.5*tube2Pos[2] - tube2Pos[2]*0.11/2 + tube2Move;

        // tube3Move = (count % (0.012*tube3Pos[3]*4)) * 5 ;
        // wave_tube3.position.y = tube3Pos[1]+0.5*tube3Pos[3] - tube3Pos[3]*0.12 + tube3Move;
        // wave_tube3.position.y = tube3Pos[1]+0.5*tube3Pos[3] - tube3Pos[3]*0.12 


        // if (playButton.state == "down") shoot.play();
        // iterate through the dudes and update their position
        // finalTemp = "Here";
        // $("#temperature").html("TEMPERATURE:" +finalTemp);
            // document.getElementById("temperature").value = ("TEMPERATURE: " + finalTemp);
                        // console.log(stateVar.plasmaon);
        // console.log(stateVar.plasmaon);
        // console.log(container.visible);
        // console.log(aliens[0].phi);
        for (var i = 0; i < aliens.length; i++)
        {
            var dude = aliens[i];
            dude.rotation = dude.direction;
            if (i > ext.dens.value*totalDudes/ext.dens.max || !(stateVar.plasmaon)) {
                    dude.visible = false;
                } else {
                    dude.visible = true;
                }
            dude.phiRun += dude.speed * 0.2 * Math.sqrt(finalTemp/1000);
            dude.phi = dude.phiRun + dude.phiStart;
            dude.R = Torus.R * plasmaPath(dude.phi, dude.phase, epsi);
            dude.scale.set(0.2*plasmaPathScale(dude.phi, dude.phase));
            dude.alpha = plasmaPathScale(dude.phi, Math.PI/8);

            dude.newPos.x = Math.cos(dude.phi) * dude.R;
            dude.newPos.y = Math.sin(dude.phi) * dude.R;
            var m = (dude.newPos.y - dude.oldPos.y) / (dude.newPos.x - dude.oldPos.x);
            var mPerp = - 1 / m;
            mPerp = Math.abs(mPerp);
            dude.mPerp = mPerp;
            dude.m = m;

            if (Math.tan(dude.phi) > 0) mPerp *= -1;
            var norm = Math.sqrt(1/(1 + mPerp * mPerp));

            dude.x = torCenter.x + Math.round(dude.newPos.x);
            dude.y = torCenter.y + Math.round(dude.newPos.y);

            dude.oldPos.x = dude.newPos.x;
            dude.oldPos.y = dude.newPos.y;

        }

        allcoilsglow.alpha = 1*magVal/ext.mag.max;
        // overLayGlow.alpha = 1;
        antennaTop.alpha = 1 - powVal/ext.aux.max;



        // for (var i = 0; i<shufWinAliens; i++)
        // {
        //     if (i * winElecNorm > powToText) shufWinAliens[i].visible = true;
        // }

        for (var i=0; i < winAliens.length ; i++)
        {
            shufWinAliens[i].visible = (i * winElecNorm < (powToText * 1.e-6)) ? true : false;
        }

        cityElectricity.alpha = powToText * 1.e-6 / maxElectric;





        if (disruptions == maxDisruptions-1) {
            outerWallDanger.alpha = 0.5 * (1 + Math.cos(count));
            innerWallDanger.alpha = 0.5 * (1 + Math.cos(count));
            lifeBarDanger.alpha = 0.5 * (1 + Math.cos(count));
            if (!stateVar.lastDisruptionStart) {
                alarm.play();
                stateVar.lastDisruptionStart = true;
            }
        } else {
            outerWallDanger.alpha = 0;
            lifeBarDanger.alpha = 0;
            innerWallDanger.alpha = 0;
            stateVar.lastDisruptionStart = false;
        }

        lifeBar.width = Math.abs(lifeBarPos.barSize[0] * Math.abs((1/11 + 10/11 * (maxDisruptions - 1 - disruptions)/(maxDisruptions - 1))));

        if (stateVar.reactor) {
            reactorBot.visible = true;
            reactorTop.visible = true;
            // tokaContainer.visible = true;
            exchangerContainer.visible = false;
            cityContainer.visible = false;
        }

        if (stateVar.exchanger) {
            reactorBot.visible = false;
            reactorTop.visible = false;
            // tokaContainer.visible = false;
            exchangerContainer.visible = true;
            cityContainer.visible = false;
        }
        if (stateVar.city) {
            reactorBot.visible = false;
            reactorTop.visible = false;
            // tokaContainer.visible = false;
            exchangerContainer.visible = false;
            cityContainer.visible = true;
        }
        viewButtonTexture();

        muteBut.texture = (stateVar.mute) ? id["mute.png"] : id["audio.png"];
        if (stateVar.mute) Howler.mute(); else Howler.unmute();

        workModals(); //Makes the modals turn on when hovering over them
        // console.log("magSlider modal: "+stateVar.modal.magSlider);

        // console.log("betamax= " + finalOut.betamax);
        // console.log("beta= " + finalOut.beta);


        // bisecBut.texture = (stateVar.bisec) ? id["buttonOn.png"] : id["buttonOff.png"];
        // if (densBut.x > contPos.densSlider.pos[0] + contPos.arrowWidth + contPos.buffer + contPos.sliderBoxLength/2)
        //     densBut.x = contPos.densSlider.pos[0] + contPos.arrowWidth + contPos.buffer;


    }
