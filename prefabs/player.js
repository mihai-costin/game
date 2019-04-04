class Player extends Phaser.Sprite {

    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);

        this.anchor.setTo(0.5, 0.5);

        // setup physics properties
        if (this.game.physics.arcade) this.game.physics.arcade.enableBody(this);

        if (this.body) {
            this.body.collideWorldBounds = true;
            this.body.allowRotation = false;
        }

        // setup animations
        this.animations.add('move', [2, 3, 4, 1, 8], 3);
        this.animations.add('idle', [0], 1);

        this.angle = 270;
    }

    move() {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.animations.play('move');
        this.game.physics.arcade.moveToXY(this, this.game.input.activePointer.x, 768, 400);
    }
}

export default Player;
