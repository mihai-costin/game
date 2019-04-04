class Enemy extends Phaser.Sprite {
    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);

        this.anchor.setTo(0.5, 0.5);

        // setup physics properties
        if (this.game.physics.arcade) this.game.physics.arcade.enableBody(this);

        if (this.body) {
            this.body.collideWorldBounds = true;
        }

        this.animations.add('move', [1, 2, 3, 4, 5], 3);
        this.animations.add('idle', [0], 1);

        // start up angle
        this.angle = 90;
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;

        // time for direction changing
        this.dirTime = 0;
    }

    // naive enemy movement
    moveEnemy(rate, y) {
        // top enemy -- y = 0
        // bottom -- y  = 768
        this.animations.play('move');
        if (this.game.time.now > this.dirTime) {
            this.dirTime = this.game.time.now + rate;
            this.rdnX = Math.floor(Math.random() * 900);
            this.game.physics.arcade.moveToXY(this, this.rdnX, y, 400);
        }
    }
}

export default Enemy;
