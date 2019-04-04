class Credit extends Phaser.State {

    constructor() {
        super();
    }

    create() {
        this.background = this.game.add.sprite(0, 0, 'backStart');
        this.background.height = this.game.world.height;
        this.background.width = this.game.world.width;

        this.background.alpha = 0.3;

        var button = this.game.add.button(this.game.world.centerX - 125, this.game.world.centerY + 50, 'exit', function () {
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

        this.music = this.game.add.sound('track3', 0.85, true);
        this.music.play();

        // text
        this.font = this.game.add.retroFont('style', 32, 32, Phaser.RetroFont.TEXT_SET2);
        this.txt = this.game.add.image(this.game.world.centerX, 100, this.font);
        this.txt.anchor.setTo(0.5);

        this.creditText = this.add.text(this.game.world.centerX, this.game.world.centerY - 80,
            "Menu Screen Background Image -- Aleksander Kowalczyk, Retrocade.net \n Game Art -- Created By UnLuckY Studio, www.unluckystudio.com \n UI checkbox -- created by Artus https://opengameart.org/content/basic-ui-widgets \n Music -- 'Dark Blue',  'Dark', 'High Stake, Low Chances' \n written and produced by Ove Melaa (Omsofware@hotmail.com) \n Menu Selection Click Sound -- created by NenadSimic \n https://opengameart.org/content/menu-selection-click \n Select Sound -- created by Boogle https://opengameart.org/content/select-like-sound \n Explosion Sound -- created by rubberduck https://opengameart.org/content/50-cc0-sci-fi-sfx \n Spaceship Fire -- created by kindland https://opengameart.org/content/spaceship-shoting \n Buttons Player Vs Ai, Click To Play -- created with https://dabuttonfactory.com/", {
                font: '24px sans-serif Arial',
                fill: 'aquamarine',
                align: 'center'
            });

        this.creditText.anchor.setTo(0.5);
    }

    update() {
        this.font.text = "Credit Goes To:";
    }
}

export default Credit;
