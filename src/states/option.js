var box = document.getElementById("volMute");

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

        document.getElementsByClassName("volume")[0].style.display = "initial";

        this.style = {
            font: "50px sans-serif Arial",
            fill: "darkblue",
            align: "center"
        }

        this.game.add.text(this.game.world.centerX - 175, this.game.world.centerY - 117, "Mute Sound:", this.style);

    }

    update() {
        if (!box.checked)
            this.game.sound.mute = true;
        else
            this.game.sound.mute = false;
    }

    back() {
        document.getElementsByClassName("volume")[0].style.display = "none";
        this.game.state.start('menu');
    }
}

export default Option;