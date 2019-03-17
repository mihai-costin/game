class Bullet extends Phaser.Sprite {

    constructor(game, x, y, key) {
        super(game, x, y, key);

        this.anchor.setTo(0.5, 0.5);

        if (this.game.physics.arcade) this.game.physics.arcade.enableBody(this);

        // kill on world collide
        if (this.body) {
            this.body.collideWorldBounds = true;
            this.body.onWorldBounds = new Phaser.Signal();
            this.body.onWorldBounds.add(function (bullet) {
                bullet.kill();
            }, this.game, this);
        }

        this.visible = false;
    }
}

export default Bullet;
