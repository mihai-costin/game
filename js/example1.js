class GRState extends Phaser.State {


    preload() {

        this.load.image("background", "images/enviroment/parallax-mountain-bg.png");
        this.load.spritesheet("play", "images/menu_screen/PlayButtonSprite.png", 195, 132, 2, 5);
        this.load.spritesheet("option", "images/menu_screen/OptionsButtonSprite.png", 195, 68, 2, 5);
        this.load.spritesheet("cr", "images/menu_screen/CreditSprite.png", 195, 132, 2, 5);
        // this.load.image("level", "images/menu_screen/LevelSprite.png");

    };

    create() {
        var img = this.add.image(0, 0, "background");

        img.width = 640;
        img.height = 512;

        var buttonGroup = this.add.group();

        var button1 = this.make.button(32, 200, "play", this.playGame, this, 1, 0);
        var button2 = this.make.button(227, 200, "cr", this.credits, this, 1, 0);
        var button3 = this.make.button(125, 330, "option", this.options, this, 1, 0);

        buttonGroup.add(button1);
        buttonGroup.add(button2);
        buttonGroup.add(button3);

        buttonGroup.x += 100;

    };

    playGame() {

    };

    options() {

    };

    credits() {

    };
};

var game = new Phaser.Game(640, 512, Phaser.AUTO);
game.state.add("StateA", GRState);
game.state.start("StateA");
