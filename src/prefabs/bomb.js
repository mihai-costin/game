class Bomb extends Phaser.Sprite {

    constructor(game, x, y, frame) {
        super(game, x, y, 'bomb', frame);

        this.anchor.setTo(0.5, 0.5);

        if (this.game.physics.arcade) this.game.physics.arcade.enableBody(this);

        if (this.body) {
            this.body.collideWorldBounds = true;
        }

        this.animations.add('tick', [0, 1, 2, 3], 1);
    }
}

export default Bomb;
