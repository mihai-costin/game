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
        
        // cursors
        this.cursor = this.game.input.keyboard.createCursorKeys();
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        
        // bullet of the player
        this.bullet = this.game.add.sprite(x, y, 'bullet');

        if (this.game.physics.arcade) this.game.physics.arcade.enableBody(this.bullet);

        // kill on world collide
        if (this.bullet.body) {
            this.bullet.body.collideWorldBounds = true;
            this.bullet.body.onWorldBounds = new Phaser.Signal();
            this.bullet.body.onWorldBounds.add(function (bullet) {
                bullet.kill();
            }, this.game, this.bullet);
        }
        
        this.bullet.visible = false;
    }

    move() {
      this.rotation = this.game.physics.arcade.moveToPointer(this, 60, this.game.input.activePointer, 400);
      this.animations.play('up');
    }

    fire() {

        if (this.game.input.activePointer.isDown && !this.bullet.visible) {

            this.bullet.reset(this.x, this.y);
            this.bullet.rotation = this.rotation;
            this.game.physics.arcade.moveToPointer(this.bullet, 500);
        }
    }
}

export default Player;