class ChoosePlay extends Phaser.State {

    constructor() {
        super();
    }

    create() {

        this.bg = this.game.add.image(0, 0, 'backStart');
        this.bg.alpha = 0.3;

        this.btnGroup = this.game.add.group();

        var button1 = this.game.make.button(this.game.world.centerX, this.game.world.centerY - 100, 'aiNaive', this.startGame, this);
        var button2 = this.game.make.button(this.game.world.centerX, this.game.world.centerY, 'aiDnn', this.startGame, this);

        this.btnGroup.add(button1);
        this.btnGroup.add(button2);

        this.btnGroup.x -= 100;

    }

    startGame() {
        this.game.sound.play('selClick');
        this.game.sound.stopAll();
        this.game.state.start('game');
    }
}

export default ChoosePlay;
