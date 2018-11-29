var state0 = {

    init: function () {

        this.letters = [];
        this.pos = [];

        this.scale = 2;
        this.page = -1;

        this.scroller = [
                "----------",
                "- PHASER -",
                "----------",
                "- 2.11.1 -",
                "----------",

                "          ",
                "SPACE SHIP",
                "  ATTACK  ",
                "BATTLE OF ",
                "   ORION  ",
        ];
    },

    preload: function () {
        this.load.image("knightHawks", "assets/images/fonts/knighthawks.png");
        this.load.image("space", "assets/images/backgroundSpace.jpg");
    },

    // add.retroFont(name of the font, char width, char height, chars used(arrangment of font set), chars per row, Xdistance, Ydistance)
    create: function () {
        this.font = this.add.retroFont("knightHawks", 31, 25, Phaser.RetroFont.TEXT_SET2, 10, 1, 0);

        var x = 0;
        var y = 0;

        // scale 2:1
        var tx = 64;
        var ty = 64;
        var hx = 32;
        var hy = 32;

        this.stage.smoothed = false;

        for (var i = 0; i < 50; i++) {

            this.letter = this.add.sprite(this.world.centerX, this.world.centerY,
                "knightHawks");

            this.letter.scale.set(0);
            this.letter.anchor.set(0.5);
            this.letter.animations.loadFrameData(this.font.frameData, 48);
            this.world.sendToBack(this.letter);

            this.letters.push(this.letter);
            this.pos.push({
                x: x + hx,
                y: y + hy
            });

            x += tx;

            if (x === 640) {
                x = 0;
                y += ty;
            }
        }

        this.bringIn();

    },

    setLetters: function () {

        this.page++;

        if (this.page == 2)
            this.state.start("state1");

        else {

            if (this.page % 2 == 1) {
                this.back = this.add.image(0, 0, "space");
                this.back.alpha = 0.3;
            }

            var i = 0;

            for (var y = 0; y < 5; y++) {
                for (var x = 0; x < 10; x++) {
                    this.letters[i].frame = this.font.grabData[this.scroller[(this.page * 5) + y].charCodeAt(x)];
                    i++;
                }
            }
        }
    },

    bringIn: function () {

        this.setLetters();

        var delay = 0;
        var speed = 300;

        for (var i = 0; i < 50; i++) {
            if (this.page % 2 === 1) {
                this.add.tween(this.letters[i].position).to({
                    x: this.pos[i].x,
                    y: this.pos[i].y
                }, speed, Phaser.Easing.Back.Out, true, delay);

                game.add.tween(this.letters[i].scale).to({
                    x: this.scale,
                    y: this.scale
                }, speed, Phaser.Easing.Back.Out, true, delay);

            } else {
                this.add.tween(this.letters[i].position).to({
                    x: this.pos[i].x,
                    y: this.pos[i].y
                }, speed, Phaser.Easing.Sinusoidal.Out, true, delay);

                this.add.tween(this.letters[i].scale).to({
                    x: this.scale,
                    y: this.scale
                }, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
            }

            delay += 100;
        }

        this.time.events.add(delay + 2000, this.takeAway, this);

    },

    takeAway: function () {

        var delay = 0;
        var speed = 200;

        for (var i = 49; i >= 0; i--) {
            this.add.tween(this.letters[i].position).to({
                x: this.world.centerX,
                y: this.world.centerY
            }, speed, Phaser.Easing.Sinusoidal.Out, true, delay);

            this.add.tween(this.letters[i].scale).to({
                x: 0,
                y: 0
            }, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
            delay += 50;
        }

        this.time.events.add(delay + 200, this.bringIn, this);
    }
}

var state1 = {

    preload: function () {
        this.load.image("back", "assets/images/backgroundSpace.jpg");
        this.load.spritesheet("play", "assets/spriteSheet/menu_screen/play.png", 100, 100);
        this.load.spritesheet("option", "assets/spriteSheet/menu_screen/options.png", 100, 100);
        this.load.spritesheet("credit", "assets/spriteSheet/menu_screen/credits.png", 100, 100);
        this.load.image("larg", "assets/images/larger.png");
        this.load.image("small", "assets/images/smaller.png");

    },

    create: function () {

        this.add.image(0, 0, "back");

        var buttonsGroup = this.add.group();

        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL; // full screen options

        this.buttonA = this.add.button(0, 0, "larg", function () {
            this.scale.startFullScreen();
        }, this); // full screen button

        this.buttonB = this.add.button(0, 0, "small", function () {
            this.scale.stopFullScreen();
        }, this);

        this.buttonB.visible = false; // dont show the small button

        this.scale.onFullScreenChange.add(function () {
            if (this.scale.isFullScreen) {
                this.buttonA.visible = false;
                this.buttonB.visible = true;
            } else {
                this.buttonA.visible = true;
                this.buttonB.visible = false;
            }
        }, this);

        var button1 = this.make.button(50, 10, "play", this.playGame, this, 0, 2, 1);
        var button2 = this.make.button(150, 10, "option", this.options, this, 0, 1);
        var button3 = this.make.button(250, 10, "credit", this.credits, this, 0, 1);

        buttonsGroup.add(button1);
        buttonsGroup.add(button2);
        buttonsGroup.add(button3);

        buttonsGroup.x += 125;
        buttonsGroup.y += 150;

    },

    playGame: function () {
        this.state.start("state2");
    },

    options: function () {

    },

    credits: function () {

    }
}

var state2 = {

    init: function () {

        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.game.physics.arcade.gravity.y = 0;
    },

    preload: function () {
        this.load.image("space", "assets/images/Background1.jpg");
        this.load.spritesheet("player", "assets/spriteSheet/player/player.png", 56, 56, 9);
        this.load.image("larg", "assets/images/larger.png");
        this.load.image("small", "assets/images/smaller.png");
    },

    create: function () {

        this.add.image(0, 0, "space");
        this.world.setBounds(0, 0, 640, 3200);

        this.buttonC = this.add.button(0, 0, "larg", function () {
            this.scale.startFullScreen();
        }, this);

        this.buttonD = this.add.button(0, 0, "small", function () {
            this.scale.stopFullScreen();
        }, this);

        this.player = this.add.sprite(320, 3150, "player", 0);
        this.player.anchor.setTo(0.5);

        this.player.animations.add("back", [4, 5, 6, 7], 2);
        this.player.animations.add("up", [2, 3, 4, 1, 8], 3);
        this.player.animations.add("idle", [0], 1);

        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL; // maintain aspect ratio

        this.physics.enable(this.player);
        this.camera.follow(this.player);

    },

    update: function () {

        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        this.player.angle = 0;
        this.player.animations.play("idle");

        this.buttonC.x = this.camera.x;
        this.buttonC.y = this.camera.y;

        this.buttonD.x = this.camera.x;
        this.buttonD.y = this.camera.y;

        if (this.scale.isFullScreen) {
            this.buttonC.visible = false;
            this.buttonD.visible = true;
        } else {
            this.buttonC.visible = true;
            this.buttonD.visible = false;
        }

        if (this.cursors.down.isDown) {
            this.player.animations.stop("up");
            this.player.body.velocity.y = 100;
            this.player.animations.play("back");

        } else if (this.cursors.up.isDown) {
            this.player.animations.stop("back");
            this.player.body.velocity.y = -96;
            this.player.animations.play("up");
        }

        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -100;
            this.player.angle = -15;

            if (!this.cursors.up.isDown && !this.cursors.down.isDown)
                this.player.animations.play("back");

        } else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 100;
            this.player.angle = 15;

            if (!this.cursors.up.isDown && !this.cursors.down.isDown) this.player.animations.play("up");
        }

    },
}

var game = new Phaser.Game(640, 512, Phaser.AUTO);

game.state.add("state0", state0);
game.state.add("state1", state1);
game.state.add("state2", state2);
game.state.start("state0");
