class Enemy extends Phaser.Sprite {
    constructor(game, x, y, frame) {
        super(game, x, y, 'enemy', frame);

        this.anchor.setTo(0.5, 0.5);

        // setup physics properties
        if (this.game.physics.arcade) this.game.physics.arcade.enableBody(this);

        if (this.body) {
            this.body.collideWorldBounds = true;
        }

        this.animations.add('move', [1, 2, 3, 4, 5], 3);
        this.animations.add('idle', [0], 1);

        // movement
        this.body.drag.set(100);
        this.body.maxVelocity.set(200);

        // start up angle
        this.angle = 180;

    }
}

export default Enemy;
