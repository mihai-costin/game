class Gameover extends Phaser.State {

    constructor() {
        super();
    }

    create() {
        // add background image
        this.background = this.game.add.sprite(0, 0, 'backStart');
        this.background.alpha = 0.3;
        this.background.height = this.game.world.height;
        this.background.width = this.game.world.width;

        if (!this.game.global.winLose) {
            this.font = this.game.add.retroFont('style2', 31, 25, Phaser.RetroFont.TEXT_SET2, 10, 1, 0);
            this.text = "Game Over";
        } else {
            this.font = this.game.add.retroFont('style', 32, 32, Phaser.RetroFont.TEXT_SET2);
            this.text = "You Won"
        }

        // music
        this.game.sound.stopAll();
        this.game.sound.play('track2', 0.85, true);

        // add intro text
        this.txt = this.game.add.image(this.game.world.centerX, this.game.world.centerY - 40, this.font);
        this.txt.anchor.set(0.5);

        this.gameoverText = this.add.text(this.game.world.centerX, this.game.world.centerY, "Levels Cleared = " + this.game.global.score, {
            font: '42px sans-serif Arial',
            fill: 'red',
            align: 'center'
        });
        this.gameoverText.anchor.set(0.5);

        // buttons
        this.buttonGroup = this.game.add.group();

        var button1 = this.game.add.button(250, this.game.world.centerY, 'play', this.playAgain, this, 0, 2, 1);

        var button2 = this.game.add.button(450, this.game.world.centerY, 'exit', this.back, this, 0, 1);

        this.buttonGroup.add(button1);
        this.buttonGroup.add(button2);

        this.buttonGroup.x += 55;

        this.buttonGroup.onChildInputOver.add(function () {
            this.game.sound.play('selNoise');
        }, this);
        this.buttonGroup.onChildInputDown.add(function () {
            this.game.sound.play('selClick');
        }, this);

        this.saveVarsToLocalStorage();
        this.resetGlobalVariables();
    }

    saveVarsToLocalStorage() {
        const max = localStorage.maxScore || 0; //default value of 0 is it does not exist
        if (this.game.global.score > max) {
            localStorage.maxScore = this.game.global.score;
        }
    }

    resetGlobalVariables() {
        this.game.global.winLose = false;
    }

    playAgain() {
        this.game.sound.stopAll();
        this.game.state.start('game');
    }

    back() {
        this.game.sound.stopAll();
        this.game.sound.play('track1', 0.85, true);
        this.game.state.start('menu');
    }

    update() {
        this.font.text = this.text;
    }

}

export default Gameover;
