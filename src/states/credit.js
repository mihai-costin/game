class Credit extends Phaser.State {

    constructor() {
        super();
    }

    create() {
        this.background = this.game.add.sprite(0, 0, 'backStart');
        this.background.height = this.game.world.height;
        this.background.width = this.game.world.width;

        var button = this.game.add.button(this.game.world.centerX - 125, this.game.world.centerY - 80, 'exit', function () {
            this.music.stop();
            this.game.sound.play('track1', 0.85, true);
            this.game.state.start('menu');
        }, this, 0, 1);

        button.onInputOver.add(function () {
            this.game.sound.play('selNoise');
        }, this);

        button.onInputDown.add(function () {
            this.game.sound.play('selClick');
        }, this);

        this.music = this.game.add.sound('track2', 0.85, true);
        this.music.play();
    }

    update() {}
}

export default Credit;
