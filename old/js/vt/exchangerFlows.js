function exchangerFlows() {
        tube1Pos = [209.6,270.2,195.5,55.2];
        tube2Pos = [439,282.3,185.5,31.7];
        tube3Pos = [595.26,331.007,31.7,116.412];
        tube4Pos = [169.9,446.4,426.3,31.7];
        tube5Pos = [134.013,378.21,31.7,69.2];
        tube6Pos = [664.145,141.855,31.7,125.163];
        tube7Pos = [698.291,111.124,156,31.7];
        tube8Pos = [851.059,143.441,31.7,133.737];
        tube9Pos = [851.06,320.91,31.7,133.73];
        tube10Pos = [694.8,446.378,157.2,31.7];
        tube11Pos = [664.145,329.232,31.7,118.223];
        tubeTri1 = tube1Pos;
        tubeTri2 = [421.927,134.662,20.4,164];
        tubeTri3 = [160.5,112.6,258.5,20.4];
        tubeTri4 = [137.954,134.681,20.4,72.6];




        tubesMask = new PIXI.Graphics();
        tubesMask.beginFill(0x8bc5ff, 0.4);
        tubesMask.drawRect(tube1Pos[0],tube1Pos[1],tube1Pos[2],tube1Pos[3]);
        tubesMask.drawRect(tube2Pos[0],tube2Pos[1],tube2Pos[2],tube2Pos[3]);
        tubesMask.drawRect(tube3Pos[0],tube3Pos[1],tube3Pos[2],tube3Pos[3]);
        tubesMask.drawRect(tube4Pos[0],tube4Pos[1],tube4Pos[2],tube4Pos[3]);
        tubesMask.drawRect(tube5Pos[0],tube5Pos[1],tube5Pos[2],tube5Pos[3]);
        tubesMask.drawRect(tube6Pos[0],tube6Pos[1],tube6Pos[2],tube6Pos[3]);
        tubesMask.drawRect(tube7Pos[0],tube7Pos[1],tube7Pos[2],tube7Pos[3]);
        tubesMask.drawRect(tube8Pos[0],tube8Pos[1],tube8Pos[2],tube8Pos[3]);
        tubesMask.drawRect(tube9Pos[0],tube9Pos[1],tube9Pos[2],tube9Pos[3]);
        tubesMask.drawRect(tube10Pos[0],tube10Pos[1],tube10Pos[2],tube10Pos[3]);
        tubesMask.drawRect(tube11Pos[0],tube11Pos[1],tube11Pos[2],tube11Pos[3]);
        tubesMask.endFill();        


        wave_tube1 = new PIXI.Sprite(id["wave_tube1.png"]);
        wave_tube1.anchor.set(0.5,0.5);
        wave_tube1.position.set(tube1Pos[0]+0.5*tube1Pos[2],tube1Pos[1]+0.5*tube1Pos[3]);
        exchangerTubesContainer.addChild(wave_tube1);
        wave_tube1.alpha = 0;

        // tubeTop1 = new PIXI.Sprite(id["tubeTop1.png"]);
        tubeTop1 = new PIXI.Graphics();
        tubeTop1.beginFill(0xD81414,1);
        tubeTop1.drawRect(tube1Pos[0],tube1Pos[1],tube1Pos[2],tube1Pos[3]);
        tubeTop1.endFill();
        // tubeTop1.position.set(tube1Pos[0],tube1Pos[1]);
        tubeTop1.alpha = 0.4;
        exchangerCoversContainer.addChild(tubeTop1);




        wave_tube2 = new PIXI.Sprite(id["wave_tube2.png"]);
        wave_tube2.anchor.set(0.5,0.5);
        wave_tube2.position.set(tube2Pos[0]+0.5*tube2Pos[2],tube2Pos[1]+0.5*tube2Pos[3]);
        exchangerTubesContainer.addChild(wave_tube2);

        // tubeTop2 = new PIXI.Sprite(id["tubeTop2.png"]);
        tubeTop2 = new PIXI.Graphics();
        tubeTop2.beginFill(0xD81414,1);
        tubeTop2.drawRect(tube2Pos[0],tube2Pos[1],tube2Pos[2],tube2Pos[3]);
        tubeTop2.endFill();
        // tubeTop2.position.set(tube2Pos[0],tube2Pos[1]);
        tubeTop2.alpha = 0.4;
        exchangerCoversContainer.addChild(tubeTop2);


        wave_tube3 = new PIXI.Sprite(id["wave_tube3.png"]);
        wave_tube3.anchor.set(0.5,0.5);
        wave_tube3.position.set(tube3Pos[0]+0.5*tube3Pos[2],tube3Pos[1]+0.5*tube3Pos[3]);
        exchangerTubesContainer.addChild(wave_tube3);

        tubeTop3 = new PIXI.Sprite(id["tubeTop3.png"]);
        tubeTop3.position.set(tube3Pos[0],tube3Pos[1]);
        tubeTop3.alpha = 0.5;
        exchangerCoversContainer.addChild(tubeTop3);

        wave_tube4 = new PIXI.Sprite(id["wave_tube4.png"]);
        wave_tube4.anchor.set(0.5,0.5);
        wave_tube4.position.set(tube4Pos[0]+0.5*tube4Pos[2],tube4Pos[1]+0.5*tube4Pos[3]);
        exchangerTubesContainer.addChild(wave_tube4);

        tubeTop4 = new PIXI.Sprite(id["tubeTop4.png"]);
        tubeTop4.position.set(tube4Pos[0],tube4Pos[1]);
        tubeTop4.alpha = 0.5;
        exchangerCoversContainer.addChild(tubeTop4);

        wave_tube5 = new PIXI.Sprite(id["wave_tube5.png"]);
        wave_tube5.anchor.set(0.5,0.5);
        wave_tube5.position.set(tube5Pos[0]+0.5*tube5Pos[2],tube5Pos[1]+0.5*tube5Pos[3]);
        exchangerTubesContainer.addChild(wave_tube5);

        tubeTop5 = new PIXI.Sprite(id["tubeTop5.png"]);
        tubeTop5.position.set(tube5Pos[0],tube5Pos[1]);
        tubeTop5.alpha = 0.5;
        exchangerCoversContainer.addChild(tubeTop5);

        wave_tube6 = new PIXI.Sprite(id["wave_tube6.png"]);
        wave_tube6.anchor.set(0.5,0.5);
        wave_tube6.position.set(tube6Pos[0]+0.5*tube6Pos[2],tube6Pos[1]+0.5*tube6Pos[3]);
        exchangerTubesContainer.addChild(wave_tube6);

        tubeTop6 = new PIXI.Sprite(id["tubeTop6.png"]);
        tubeTop6.position.set(tube6Pos[0],tube6Pos[1]);
        tubeTop6.alpha = 0.5;
        exchangerCoversContainer.addChild(tubeTop6);

        wave_tube7 = new PIXI.Sprite(id["wave_tube7.png"]);
        wave_tube7.anchor.set(0.5,0.5);
        wave_tube7.position.set(tube7Pos[0]+0.5*tube7Pos[2],tube7Pos[1]+0.5*tube7Pos[3]);
        exchangerTubesContainer.addChild(wave_tube7);

        tubeTop7 = new PIXI.Sprite(id["tubeTop7.png"]);
        tubeTop7.position.set(tube7Pos[0],tube7Pos[1]);
        tubeTop7.alpha = 0.5;
        exchangerCoversContainer.addChild(tubeTop7);

        wave_tube8 = new PIXI.Sprite(id["wave_tube8.png"]);
        wave_tube8.anchor.set(0.5,0.5);
        wave_tube8.position.set(tube8Pos[0]+0.5*tube8Pos[2],tube8Pos[1]+0.5*tube8Pos[3]);
        exchangerTubesContainer.addChild(wave_tube8);

        tubeTop8 = new PIXI.Sprite(id["tubeTop8.png"]);
        tubeTop8.position.set(tube8Pos[0],tube8Pos[1]);
        tubeTop8.alpha = 0.5;
        exchangerCoversContainer.addChild(tubeTop8);

        wave_tube9 = new PIXI.Sprite(id["wave_tube9.png"]);
        wave_tube9.anchor.set(0.5,0.5);
        wave_tube9.position.set(tube9Pos[0]+0.5*tube9Pos[2],tube9Pos[1]+0.5*tube9Pos[3]);
        exchangerTubesContainer.addChild(wave_tube9);

        tubeTop9 = new PIXI.Graphics();
        tubeTop9.beginFill(0xD81414,1);
        tubeTop9.drawRect(tube9Pos[0],tube9Pos[1],tube9Pos[2],tube9Pos[3]);
        tubeTop9.endFill();
        tubeTop9.alpha = 0.4;
        exchangerCoversContainer.addChild(tubeTop9);

        wave_tube10 = new PIXI.Sprite(id["wave_tube10.png"]);
        wave_tube10.anchor.set(0.5,0.5);
        wave_tube10.position.set(tube10Pos[0]+0.5*tube10Pos[2],tube10Pos[1]+0.5*tube10Pos[3]);
        exchangerTubesContainer.addChild(wave_tube10);


        tubeTop10 = new PIXI.Graphics();
        tubeTop10.beginFill(0xD81414,1);
        tubeTop10.drawRect(tube10Pos[0],tube10Pos[1],tube10Pos[2],tube10Pos[3]);
        tubeTop10.endFill();
        tubeTop10.alpha = 0.4;
        exchangerCoversContainer.addChild(tubeTop10);

        wave_tube11 = new PIXI.Sprite(id["wave_tube11.png"]);
        wave_tube11.anchor.set(0.5,0.5);
        wave_tube11.position.set(tube11Pos[0]+0.5*tube11Pos[2],tube11Pos[1]+0.5*tube11Pos[3]);
        exchangerTubesContainer.addChild(wave_tube11);


        tubeTop11 = new PIXI.Graphics();
        tubeTop11.beginFill(0xD81414,1);
        tubeTop11.drawRect(tube11Pos[0],tube11Pos[1],tube11Pos[2],tube11Pos[3]);
        tubeTop11.endFill();
        tubeTop11.alpha = 0.4;
        exchangerCoversContainer.addChild(tubeTop11);


        exchangerCoversContainer.addChild(tubesMask);
        exchangerTubesContainer.mask = tubesMask;

        totalTritspp = 0.5;  //total tritiums per 10 pixels
        trits1 = tubeTri1[2]*totalTritspp;
        trits2 = tubeTri2[3]*totalTritspp;
        trits3 = tubeTri3[2]*totalTritspp;
        trits4 = tubeTri4[3]*totalTritspp;

        // console.log(trits1);

        for (var i = 0; i < trits1; i++)
        {
            var trit = new PIXI.Sprite(id["particle.png"]);
            tritSize = 0.4 + Math.random()*0.6;
            trit.scale.set(0.2*tritSize);

            var posX = tubeTri1[0] + 0.5*trit.width + Math.random()*(tubeTri1[2]-trit.width);
            var posY = tubeTri1[1] + 0.5*trit.height + Math.random()*(tubeTri1[3]-trit.height);

            trit.anchor.set(0.5,0.5);
            trit.position.set(posX,posY);
            trit.tube = "1";
            tritAliens.push(trit);


            exchangerTritsContainer.addChild(trit);
        }


        for (var i = 0; i < trits2; i++)
        {
            var trit = new PIXI.Sprite(id["particle.png"]);
            tritSize = 0.4 + Math.random()*0.6;
            trit.scale.set(0.2*tritSize);

            var posX = tubeTri2[0] + 0.5*trit.width + Math.random()*(tubeTri2[2]-trit.width);
            var posY = tubeTri2[1] + 0.5*trit.height + Math.random()*(tubeTri2[3]-trit.height);

            trit.anchor.set(0.5,0.5);
            trit.position.set(posX,posY);
            trit.tube = "2";
            tritAliens.push(trit);

            exchangerTritsContainer.addChild(trit);
        }

        for (var i = 0; i < trits3; i++)
        {
            var trit = new PIXI.Sprite(id["particle.png"]);
            tritSize = 0.4 + Math.random()*0.6;
            trit.scale.set(0.2*tritSize);

            var posX = tubeTri3[0] + 0.5*trit.width + Math.random()*(tubeTri3[2]-trit.width);
            var posY = tubeTri3[1] + 0.5*trit.height + Math.random()*(tubeTri3[3]-trit.height);

            trit.anchor.set(0.5,0.5);
            trit.position.set(posX,posY);
            trit.tube = "3";
            tritAliens.push(trit);


            exchangerTritsContainer.addChild(trit);
        }
        for (var i = 0; i < trits4; i++)
        {
            var trit = new PIXI.Sprite(id["particle.png"]);
            tritSize = 0.4 + Math.random()*0.6;
            trit.scale.set(0.2*tritSize);

            var posX = tubeTri4[0] + 0.5*trit.width + Math.random()*(tubeTri4[2]-trit.width);
            var posY = tubeTri4[1] + 0.5*trit.height + Math.random()*(tubeTri4[3]-trit.height);

            trit.anchor.set(0.5,0.5);
            trit.position.set(posX,posY);
            trit.tube = "4";
            tritAliens.push(trit);

            exchangerTritsContainer.addChild(trit);
        }


}


















