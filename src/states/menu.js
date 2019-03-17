class Menu extends Phaser.State {

    constructor() {
        super();
    }

    create() {
        // add background image
        this.background = this.game.add.sprite(0, 0, 'backStart');
        this.background.height = this.game.world.height;
        this.background.width = this.game.world.width;

        // menu buttons
        this.buttonGroup = this.game.add.group();

        var button1 = this.game.add.button(250, this.game.world.centerY, 'play', this.playGame, this, 0, 2, 1);
        var button2 = this.game.add.button(450, this.game.world.centerY, 'option', this.options, this, 0, 1);
        var button3 = this.game.add.button(650, this.game.world.centerY, 'credit', this.credits, this, 0, 1);

        this.buttonGroup.add(button1);
        this.buttonGroup.add(button2);
        this.buttonGroup.add(button3);

        this.buttonGroup.y -= 150;

        this.buttonGroup.onChildInputOver.add(this.overSfx, this);
        this.buttonGroup.onChildInputDown.add(this.downSfx, this);
    }

    downSfx() {
        this.game.sound.play('selClick');
    }

    overSfx() {
        this.game.sound.play('selNoise');
    }

    playGame() {
        this.game.state.start('choose');
    }

    options() {
        this.game.state.start('option');
    }

    credits() {
        //this.music.stop();
        this.game.sound.stopAll();
        this.game.state.start('credit');
    }
}

export default Menu;
