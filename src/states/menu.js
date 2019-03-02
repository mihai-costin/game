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

        var button1 = this.game.make.button(250, this.game.world.centerY, 'play', this.playGame, this, 0, 2, 1);
        var button2 = this.game.make.button(450, this.game.world.centerY, 'option', this.options, this, 0, 1);
        var button3 = this.game.make.button(650, this.game.world.centerY, 'credit', this.credtis, this, 0, 1);

        this.buttonGroup.add(button1);
        this.buttonGroup.add(button2);
        this.buttonGroup.add(button3);

        this.buttonGroup.y -= 150;

    }

    update() {}

    playGame() {
        this.game.state.start('game');
    }

    options() {
        this.game.state.start('option');
    }

    credits() {
        this.game.state.start('credit');
    }
}

export default Menu;