class Option extends Phaser.State {

    constructor() {
        super();
    }

    create() {
        // add background image
        this.background = this.game.add.sprite(0, 0, 'backStart');
        this.background.height = this.game.world.height;
        this.background.width = this.game.world.width;

        var button = this.game.add.button(this.game.world.centerX - 125, this.game.world.centerY - 80, 'exit', this.back, this, 0, 1);

        button.onInputOver.add(function () {
            this.game.sound.play('selNoise');
        }, this);

        button.onInputDown.add(function () {
            this.game.sound.play('selClick');
        }, this);

        this.style = {
            font: "50px sans-serif Arial",
            fill: "darkblue",
            align: "center"
        }

        this.btn = this.game.add.button(this.game.world.centerX + 100, this.game.world.centerY - 125, 'checkbox', this.volume, this);

        this.game.add.text(this.game.world.centerX - 175, this.game.world.centerY - 117, "Mute Sound:", this.style);
    }

    volume() {
        if (this.game.sound.mute) {
            this.game.sound.mute = false;
            this.btn.setFrames(0);
        } else {
            this.game.sound.mute = true;
            this.btn.setFrames(1);
        }
    }

    back() {
        this.game.state.start('menu');
    }
}

export default Option;
