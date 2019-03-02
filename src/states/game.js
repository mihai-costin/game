import Player from '../prefabs/player';

class Game extends Phaser.State {

    constructor() {
        super();
    }

    create() {
        //add background image
        this.background = this.game.add.sprite(0, 0, 'bgPlay');
        this.background.height = this.game.world.height;
        this.background.width = this.game.world.width;

        //set up listeners and game
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 0;
        this.game.world.bounds.setTo(0, 0, 1024, 768);

        //setup audio
        this.bulletShot = this.game.add.audio('shot');
        this.expl = this.game.add.audio('expl');

        //setup prefabs
        this.player = new Player(this.game, this.game.world.centerX, this.game.world.centerY);
        this.game.add.existing(this.player);
    }

    shoot(click) {
        this.gunshot.play();
    }

    update() {
        this.player.move();
        this.player.fire();
    }
    
    render() {
        this.game.debug.spriteInfo(this.player, 32, 32);
    }

    endGame() {
        this.game.state.start('gameover');
    }

}

export default Game;