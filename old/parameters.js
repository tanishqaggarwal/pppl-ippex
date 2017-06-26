
    //Parameters




    var epsi = rmin/rmaj;
    var solFactor = 5;
    var machineSize = 365;
    var scaleTorus = machineSize/(2*((solFactor+1)/solFactor+epsi));
    // var epsi = 0.8;
    // console.log(scaleTorus);
    var rad = 0.15;
    var introPlayed = false;
    var Torus = {R:scaleTorus, r:scaleTorus * epsi};
    var Machine = {sol:Torus.R/solFactor , diam: 2*(Torus.R + Torus.r + Torus.R/solFactor)};
    // console.log("Machine diameter: " + Machine.diam);
    var Plasma = {v: 1, wSpread: 0.5/1000, T: 10000};
    var ext = {
        dens : {
            value : 1,
            min : 0.1,
            max : 10
        },
        mag : {
            value : 3,
            min : 1,
            max : 14
        },
        aux : {
            value : 0,
            min : 0,
            max : 10
        }
    };
    var count = 0;
    // var torCenter = {x : 542.3 , y : 298.8};
    var torCenter = {x : 516.473 , y : 276.854};
    var zig = new Ziggurat();
    var showFields
    var antennaLength = 100;
    var coils = [];
    var glowcoils = [];
    var finalTemp = 0;
    var stateVar = {
        plasmaon : false,
        justexploded : true,
        mute : false,
        bisec : true,
        endonce : true,
        lastDisruptionStart : false,
        gaussianSpeeds : true,
        forceCalculation : false,
        countStart : {
            state : false,
            timer : 0
        },
        continue : {
            state : false
        },
        countRestart : {
            state : false,
            timer : 0
        },
        modal : {
            coils : false,
            vessel : false,
            centerStack : false,
            aux : false,
            blanket : false,
            tritium : false,
            heat : false,
            steam : false,
            cityscape : false,
            reactor : false,
            exchanger : false,
            city : false,
            densitySlider : false,
            auxSlider : false,
            magSlider : false,
            health : false,
            temperature : false,
            electric : false,
            score : false,
            densLimit : false,
            betaLimit : false
        },
        reactor : false,
        exchanger : false,
        city : false
    };
    var buttonState = {
        mute : false,
        bisec : true,
        countStart : false,
        continue : false,
        reactor : true,
        exchanger : false,
        city : false
    };
    var lastmag = 0;
    var lastdens = 0;
    var lastaux = 0;
    var disruptions = 0;
    var maxDisruptions = 5;
    var highScore = 0;
    var maxElectric = 1448;
    // var keyObject = keyboard(asciiKeyCodeNumber);



    // //PIXI start
    // var PIXI = require('../pixi.js');
    // var keyboard = require('pixi-keyboard');
    var stage = new PIXI.Container(),
        renderer = PIXI.autoDetectRenderer(1010,660,{
            view : document.getElementById("game-canvas"),
            antialiasing : false,
            transparent : false,
            resolution : 1}
            );
    var interactionManager = new PIXI.interaction.InteractionManager(renderer, {});
    var dragAndDropManager = new PIXI.DragAndDropManager(interactionManager);

    stage.interactive = true;

    var introContainer = new PIXI.Container();
    var startMenu = new PIXI.Container();
    var startManual = new PIXI.Container();
    var gameContainer = new PIXI.Container();
    var reactorBot = new PIXI.Container();
    var reactorTop = new PIXI.Container();
    var bottomLinesContainer = new PIXI.Container();
    var controls = new PIXI.Container();
    var topLinesContainer = new PIXI.Container();
    var rfContainer = new PIXI.Container();
    var rfCover = new PIXI.Container();
    var vessel = new PIXI.Container();
    var container = new PIXI.Container();
    var coilcontainer = new PIXI.Container();
    var topControls = new PIXI.Container();
    var tokaModals = new PIXI.Container();
    var exchangerContainer = new PIXI.Container();
    var exchangerTubesContainer = new PIXI.Container();
    var exchangerBottomContainer = new PIXI.Container();
    var exchangerCoversContainer = new PIXI.Container();
    var exchangerTritsContainer = new PIXI.Container();
    var exchangerElementsContainer = new PIXI.Container();
    var exchangerModals = new PIXI.Container();
    var cityContainer = new PIXI.Container();
    var citySubcontainer = new PIXI.Container();
    var cityModals = new PIXI.Container();
    var alertContainer = new PIXI.Container();
    var topModals = new PIXI.Container();
    var endContainer = new PIXI.Container();


    stage.addChild(introContainer);
    introContainer.addChild(startMenu);
    introContainer.addChild(startManual);
    stage.addChild(gameContainer);
    gameContainer.addChild(reactorBot);
    reactorBot.addChild(bottomLinesContainer);
    gameContainer.addChild(controls);
    gameContainer.addChild(reactorTop);
    reactorTop.addChild(topLinesContainer);
    reactorTop.addChild(rfContainer);
    reactorTop.addChild(rfCover);
    reactorTop.addChild(vessel);
    reactorTop.addChild(container);
    reactorTop.addChild(coilcontainer);
    reactorTop.addChild(tokaModals);
    gameContainer.addChild(exchangerContainer);
    exchangerContainer.addChild(exchangerBottomContainer);
    exchangerContainer.addChild(exchangerTubesContainer);
    exchangerContainer.addChild(exchangerCoversContainer);
    exchangerContainer.addChild(exchangerTritsContainer);
    exchangerContainer.addChild(exchangerElementsContainer);
    exchangerContainer.addChild(exchangerModals);
    gameContainer.addChild(cityContainer);
    cityContainer.addChild(citySubcontainer);
    cityContainer.addChild(cityModals);
    gameContainer.addChild(topControls);
    gameContainer.addChild(topModals);
    gameContainer.addChild(alertContainer);
    stage.addChild(endContainer);
    reactorBot.visible = true;
    reactorTop.visible = true;
    exchangerContainer.visible = false;
    cityContainer.visible = false;
    introContainer.visible = false;
    gameContainer.visible = false;
    endContainer.visible = false;




    var state = intro;


    var loader = PIXI.loader;
    loader
        .add([
        "img/ippexsprites.json"
        ])
        .on("progress", loadProgressHandler)

    var loaderModals = PIXI.loader;
    loaderModals
        .add([
        "img/ippexspritesModals.json"
        ])
        .on("progress", loadProgressHandler)

    var loaderGlobalModals = PIXI.loader;
    loaderGlobalModals
        .add([
        "img/ippexspritesGlobalModals.json"
        ])
        .on("progress", loadProgressHandler)
        .load(setup);


    function gameLoop(){

        requestAnimationFrame(gameLoop);
        state();
        renderer.render(stage);
        count += 0.1;
    }

