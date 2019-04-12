class ChoosePlay extends Phaser.State {

    constructor() {
        super();
    }

    create() {

        this.bg = this.game.add.image(0, 0, 'backStart');
        this.bg.alpha = 0.3;

        this.btnGroup = this.game.add.group();
        this.btnGroup2 = this.game.add.group();

        var button1 = this.game.make.button(this.game.world.centerX, this.game.world.centerY - 100, 'aiNaive', function () {
            this.game.global.gameType = 3;
            this.startGame();
        }, this);
        var button2 = this.game.make.button(this.game.world.centerX, this.game.world.centerY, 'aiDnn', function () {
            this.game.global.gameType = 4;
            this.startGame();
        }, this);

        this.exitBtn = this.game.add.button(this.game.world.centerX - 125, this.game.world.centerY + 50, 'exit', this.goBack, this, 0, 1);

        this.exitBtn.onInputOver.add(function () {
            this.game.sound.play('selNoise');
        }, this);

        this.exitBtn.onInputDown.add(function () {
            this.game.sound.play('selClick');
        }, this);

        this.btnGroup.add(button1);
        this.btnGroup.add(button2);

        this.btnGroup.x -= 100;

        var button3 = this.game.make.button(this.game.world.centerX, this.game.world.centerY - 200, 'ai2', function () {
            this.game.global.gameType = 0;
            this.startGame();
        }, this);

        var button4 = this.game.make.button(this.game.world.centerX, this.game.world.centerY - 100, 'ai5', function () {
            this.game.global.gameType = 1;
            this.startGame();
        }, this);

        var button5 = this.game.make.button(this.game.world.centerX, this.game.world.centerY, 'ai10', function () {
            this.game.global.gameType = 2;
            this.startGame();
        }, this);

        var button6 = this.game.make.button(this.game.world.centerX + 50, this.game.world.centerY - 300, 'getData', function () {
            this.game.global.gameType = 5;
            this.startGame();
        }, this);

        this.btnGroup2.add(button3);
        this.btnGroup2.add(button4);
        this.btnGroup2.add(button5);
        this.btnGroup2.add(button6);

        this.btnGroup2.x -= 100;
        this.btnGroup2.visible = false;
    }

    startGame() {
        this.game.sound.play('selClick');

        // start state game
        switch (this.game.global.gameType) {
            case 0:
            case 1:
            case 2:
            case 3:
                {
                    this.game.sound.stopAll();
                    this.game.state.start('game');
                    break;
                }
                // return to choose ai or dnn
            case 4:
                {
                    this.exitBtn.x += 30;
                    this.btnGroup.visible = false;
                    this.btnGroup2.visible = true;
                    break;
                }
                // return to main menu
            case 5:
                {
                    this.game.sound.stopAll();
                    this.game.state.start('gameTrain');
                    break;
                }
        }
    }

    goBack() {
        if (this.game.global.gameType === 0) {
            this.game.state.start('menu');
        } else if (this.game.global.gameType === 4) {
            this.game.global.gameType = 0;
            this.exitBtn.x -= 30;
            this.btnGroup2.visible = false;
            this.btnGroup.visible = true;
        }
    }
}

export default ChoosePlay;
