var game = new Phaser.Game(640, 512, Phaser.CANVAS, "game", {
    init: init,
    preload: preload,
    create: create,
    update: update
});

var font;
var letters = [];
var pos = [];

var data;
var scale;
var page = -1;

var scroller = [
                "----------",
                "- PHASER -",
                "----------",
                "- 2.11.1 -",
                "----------",

                "          ",
                "  AXE MAN ",
                "KHALADEERS",
                "   SAGA   ",
                "          ",
                ];

function init() {

}

function preload() {

    game.load.image("knightHawks", "images/fonts/knighthawks.png");
    game.load.image("raster", "images/fonts/multi-color-raster.png");
    //game.load.image('raster', 'images/fonts/sunset-raster.png');

}

function create() {

    // (name of the font, char width, char height, chars used(arrangment of font set), chars per row, Xdistance, Ydistance)
    font = game.add.retroFont("knightHawks", 31, 25, Phaser.RetroFont.TEXT_SET2, 10, 1, 0);

    var x = 0;
    var y = 0;

    //  Scale 2:1
    scale = 2;
    var tx = 64;
    var ty = 64;
    var hx = 32;
    var hy = 32;

    game.stage.smoothed = false;

    for (var i = 0; i < 50; i++) {

        var letter = game.add.sprite(game.world.centerX, game.world.centerY, "knightHawks");

        /*
        // the various blend modes supported by pixi
        PIXI.blendModes = {
            NORMAL:0,
            ADD:1,
            MULTIPLY:2,
            SCREEN:3,
            OVERLAY:4,
            DARKEN:5,
            LIGHTEN:6,
            COLOR_DODGE:7,
            COLOR_BURN:8,
            HARD_LIGHT:9,
            SOFT_LIGHT:10,
            DIFFERENCE:11,
            EXCLUSION:12,
            HUE:13,
            SATURATION:14,
            COLOR:15,
            LUMINOSITY:16
        };
         */

        letter.scale.set(0);
        letter.anchor.set(0.5);
        letter.animations.loadFrameData(font.frameData, 48);
        this.world.sendToBack(letter);

        letters.push(letter);
        pos.push({
            x: x + hx,
            y: y + hy
        });

        x += tx;

        if (x === game.width) {
            x = 0;
            y += ty;
        }
    }

    var raster = game.add.sprite(0, 0, "raster");
    raster.width = game.width;
    raster.height = game.height;
    raster.blendMode = PIXI.blendModes.COLOR;

    bringIn();

}

function setLetters() {

    page++;


    if (page === 2) {
        page = 0;
    }

    var i = 0;

    for (var y = 0; y < 5; y++) {
        for (var x = 0; x < 10; x++) {
            letters[i].frame = font.grabData[scroller[(page * 5) + y].charCodeAt(x)];
            i++;
        }
    }

}

function bringIn() {

    setLetters();

    var delay = 0;
    var speed = 300;

    for (var i = 0; i < 50; i++) {
        if (page % 2 === 1) {
            game.add.tween(letters[i].position).to({
                x: pos[i].x,
                y: pos[i].y
            }, speed, Phaser.Easing.Back.Out, true, delay);
            game.add.tween(letters[i].scale).to({
                x: scale,
                y: scale
            }, speed, Phaser.Easing.Back.Out, true, delay);
        } else {
            game.add.tween(letters[i].position).to({
                x: pos[i].x,
                y: pos[i].y
            }, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
            game.add.tween(letters[i].scale).to({
                x: scale,
                y: scale
            }, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
        }

        delay += 100;
    }

    game.time.events.add(delay + 2000, takeAway, this);

}

function takeAway() {

    var delay = 0;
    var speed = 200;

    for (var i = 49; i >= 0; i--) {
        game.add.tween(letters[i].position).to({
            x: game.world.centerX,
            y: game.world.centerY
        }, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
        game.add.tween(letters[i].scale).to({
            x: 0,
            y: 0
        }, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
        delay += 50;
    }

    game.time.events.add(delay + 200, bringIn, this);

}

function update() {

    game.context.clearRect(0, 0, game.width, game.height);

}
