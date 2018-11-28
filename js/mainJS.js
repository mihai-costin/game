class state0 extends Phaser.State {

    preload() {
        this.load.image("back", "assets/images/background.jpg");
        this.load.spritesheet("play", "assets/spriteSheet/menu_screen/play.png", 100, 100);
        this.load.spritesheet("option", "assets/spriteSheet/menu_screen/options.png", 100, 100);
        this.load.spritesheet("credit", "assets/spriteSheet/menu_screen/credits.png", 100, 100);

    }

    create() {

        this.add.image(0, 0, "back");

        var buttonsGroup = this.add.group();

        var button1 = this.make.button(50, 10, "play", this.playGame, this, 0, 2, 1);
        var button2 = this.make.button(150, 10, "option", this.options, this, 0, 1);
        var button3 = this.make.button(250, 10, "credit", this.credits, this, 0, 1);

        buttonsGroup.add(button1);
        buttonsGroup.add(button2);
        buttonsGroup.add(button3);

        buttonsGroup.x += 75;
        buttonsGroup.y += 150;

        this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        this.input.onDown.add(function () {
            this.scale.startFullScreen(true, true);
        }, this);
    }

    playGame() {
        this.state.start("state1");
    }

    options() {

    }

    credits() {

    }
}

var state1 = {

    init: function () {

        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.game.physics.arcade.gravity.y = 0;
    },

    preload: function () {
        this.load.image("space", "assets/images/Background1.jpg");
        this.load.spritesheet("player", "assets/spriteSheet/player/player.png", 56, 56, 9);
    },

    create: function () {

        this.add.image(0, 0, "space");
        this.world.setBounds(0, 0, 640, 3200);

        this.player = this.add.sprite(320, 3150, "player", 0);
        this.player.anchor.setTo(0.5);

        this.player.animations.add("back", [4, 5, 6, 7], 2);
        this.player.animations.add("up", [2, 3, 4, 1, 8], 3);
        this.player.animations.add("idle", [0], 1);

        this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        this.physics.enable(this.player);
        this.camera.follow(this.player);

        game.input.onDown.add(this.goFull, this);

    },

    update: function () {

        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        this.player.angle = 0;
        this.player.animations.play("idle");

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

    goFull: function () {

        if (!this.scale.isFullScreen) {
            this.scale.startFullScreen();
        }
    }
}

var game = new Phaser.Game(640, 512, Phaser.AUTO);

game.state.add("state0", state0);
game.state.add("state1", state1);
game.state.start("state0");
