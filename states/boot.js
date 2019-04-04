class Boot extends Phaser.State {

    constructor() {
        super();
    }

    // login & register button created with https://dabuttonfactory.com/
    preload() {
        this.game.load.image('backStart', 'assets/backgroundSpace.png');
        this.game.load.image('style', 'assets/fonts/steelpp_font.png');
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

        // add.retroFont(name of the font, char width, char height, chars used(arrangment of font set), chars per row, Xdistance, Ydistance)
        this.font = this.game.add.retroFont('style', 32, 32, Phaser.RetroFont.TEXT_SET2);

        this.bg = this.game.add.image(0, 0, 'backStart');
        this.bg.alpha = 0.3;

        this.txt = this.game.add.image(this.game.world.centerX, this.game.world.centerY - 40, this.font);
        this.txt.anchor.set(0.5);

        this.initGlobalVariables();
        this.game.state.start('preloader');

    }

    update() {
        this.font.text = "Space War - Battle Day";
    }

    initGlobalVariables() {
        this.game.global = {
            gameType: 0,
            winLose: false,
            wins: 0,
            repeat: 0,
            total: 0
        };

        this.game.trainingData = [[], []];
    }

}

export default Boot;
