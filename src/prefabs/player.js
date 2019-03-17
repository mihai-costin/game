class Player extends Phaser.Sprite {

    constructor(game, x, y, frame) {
        super(game, x, y, 'player', frame);

        this.anchor.setTo(0.5, 0.5);

        // setup physics properties
        if (this.game.physics.arcade) this.game.physics.arcade.enableBody(this);

        if (this.body) {
            this.body.collideWorldBounds = true;
            this.body.allowRotation = false;
        }

        // setup animations
        // this.animations.add('back', [4, 5, 6, 7], 2);
        this.animations.add('up', [2, 3, 4, 1, 8], 3);
        this.animations.add('idle', [0], 1);
    }

    move() {
        this.rotation = this.game.physics.arcade.moveToPointer(this, 60, this.game.input.activePointer, 400);
        this.animations.play('up');
    }

}

export default Player;
