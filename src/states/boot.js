class Boot extends Phaser.State {

    constructor() {
        super();
    }

    // login & register button created with https://dabuttonfactory.com/
    preload() {
        this.game.load.image('backStart', 'assets/backgroundSpace.jpg');
        this.game.load.image('style', 'assets/fonts/steelpp_font.png');
        this.game.load.image('login', 'assets/button_login.png');
        this.game.load.image('register', 'assets/button_register.png');

    }

    create() {
        this.game.input.maxPointers = 1;

        // setup device scaling
        if (!this.game.device.desktop) {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.minWidth = 480;
            this.game.scale.minHeight = 260;
            this.game.scale.maxWidth = 640;
            this.game.scale.maxHeight = 480;
            this.game.scale.forceOrientation(true);
            this.game.scale.setSize();
        }

        this.buttonLog = this.add.button(this.world.centerX - 150, this.world.centerY + 100, 'login', this.login);
        this.buttonReg = this.add.button(this.world.centerX, this.world.centerY + 100, 'register', this.register);

        // add.retroFont(name of the font, char width, char height, chars used(arrangment of font set), chars per row, Xdistance, Ydistance)
        this.font = this.game.add.retroFont('style', 32, 32, Phaser.RetroFont.TEXT_SET2);

        this.bg = this.game.add.image(0, 0, 'backStart');
        this.bg.alpha = 0.3;

        this.txt = this.game.add.image(this.game.world.centerX, this.game.world.centerY - 40, this.font);
        this.txt.anchor.set(0.5);

        this.initGlobalVariables();
        //this.game.state.start('preloader');

    }

    update() {
        this.font.text = "Space War - Battle Day";
    }

    login() {
        window.open('../../login.html', '_self')
    }

    register() {
        window.open('../../register.html', '_self')
    }

    initGlobalVariables() {
        this.game.global = {
            score: 0
        };
    }

}

export default Boot;