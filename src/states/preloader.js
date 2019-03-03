class Preloader extends Phaser.State {

    constructor() {
        super();
    }

    create() {

        this.bg = this.game.add.image(0, 0, 'backStart');
        this.bg.alpha = 0.3;

        this.font = this.game.add.retroFont('style', 32, 32, Phaser.RetroFont.TEXT_SET2);
        this.text = this.game.add.image(this.game.world.centerX, this.game.world.centerY - 40, this.font);
        this.text.anchor.set(0.5);

        this.txtStyle = {
            font: "65px sans-serif Arial",
            fill: "darkblue",
            align: "center"
        };

        // setup loading and its events
        this.load.onLoadStart.add(this.loadStart, this);
        this.load.onFileComplete.add(this.loadFile, this);
        this.load.onLoadComplete.addOnce(this.loadComplete, this);
        this.loadResources();

    }

    update() {
        this.font.text = "Space War - Battle Day";
    }

    loadStart() {
        this.txt = this.game.add.text(this.game.world.centerX - 175, this.game.world.centerY, "Loading ...", this.txtStyle);
    }

    loadFile(progress) {
        this.txt.setText("Loading " + progress + "%");
    }

    loadComplete() {
        this.txt.setText("Load Complete");

        //game music
        this.game.sound.play('track1', 0.85, true);
        this.game.state.start('gameover');
    }

    loadResources() {

        this.game.load.image('bgPlay', 'assets/bg_play.png');
        this.game.load.image('bullet', 'assets/bullet.png');
        this.game.load.image('bullet_red', 'assets/bullet_red.png');

        // menu screen
        this.game.load.spritesheet('play', 'assets/spritesheets/menu_screen/play.png', 200, 200);
        this.game.load.spritesheet('option', 'assets/spritesheets/menu_screen/options.png', 200, 200);
        this.game.load.spritesheet('credit', 'assets/spritesheets/menu_screen/credits.png', 200, 200);
        this.game.load.spritesheet('exit', 'assets/spritesheets/menu_screen/exit.png', 200, 200);

        // characters & effects
        this.game.load.spritesheet('player', 'assets/spritesheets/player/player.png', 56, 56, 9);
        this.game.load.spritesheet('enemy', 'assets/spritesheets/enemy/enemy.png', 59, 59, 9);
        this.game.load.spritesheet('blueExpl', 'assets/spritesheets/blue_explosion/blue_explosion.png', 60, 60, 16);
        this.game.load.spritesheet('redExpl', 'assets/spritesheets/red_explosion/red_explosion.png', 60, 50, 16);
        this.game.load.image('style2', 'assets/fonts/knighthawks.png');

        // audio
        this.game.load.audio('shot', ['assets/audio/NovaShot.mp3', 'assets/audio/NovaShot.ogg']);
        this.game.load.audio('expl', ['assets/audio/explosion_01.mp3', 'assets/audio/explosion_01.ogg']);
        this.game.load.audio('selNoise', ['assets/audio/selectNoise.wav', 'assets/audio/selectNoise.ogg']);
        this.game.load.audio('selClick', ['assets/audio/Menu Selection Click.wav', 'assets/audio/Menu Selection Click.ogg']);
        this.game.load.audio('track1', ['assets/audio/Ove Melaa - Dark Blue.mp3', 'assets/audio/Ove Melaa - Dark Blue.ogg']);
        this.game.load.audio('track2', ['assets/audio/Ove Melaa - High Stakes,Low Chances.mp3', 'assets/audio/Ove Melaa - High Stakes,Low Chances.ogg']);

        this.game.load.start();
    }
}

export default Preloader;
