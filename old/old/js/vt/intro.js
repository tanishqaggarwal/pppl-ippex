function intro() {
        introContainer.visible = true;
        gameContainer.visible = false;
        endContainer.visible = false;
        forceCalculation = true;
        // console.log(stateVar.countStart.state);
        // console.log(stateVar.continue.state);
        if (stateVar.countStart.state){
            // startManual.visible = false;
            var dif = count - stateVar.countStart.timer;
            startMenu.alpha = 1-Math.pow(dif/5.,2);
            if (dif > 5) {
                startManual.visible = true;
                // introManual.alpha = 1;
            }
            if (dif > 50 || stateVar.continue.state) {
                state = play;
                stateVar.countStart.state = false;
            }
        }
    }