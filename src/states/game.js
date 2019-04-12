import * as tf from '@tensorflow/tfjs';
import Player from '../prefabs/player';
import Enemy from '../prefabs/enemy';
import Bomb from '../prefabs/bomb';
require("babel-polyfill");

var ready, clickPlay,
    nextFirePl = 0,
    nextFireEn = 0;
var files = ["Keras-10k/", "Keras-50k/", "Keras-100k/"];

class Game extends Phaser.State {

    constructor() {
        super();
    }

    create() {
        this.game.global.total++;

        //add background image
        this.game.add.image(0, 0, 'bgPlay');

        clickPlay = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'click');

        clickPlay.anchor.setTo(0.5);

        //animations explosions
        this.blueExp = this.game.add.sprite(0, 0, 'blueExpl');
        this.blueAnim = this.blueExp.animations.add('blue', [1, 5, 9, 13], 2);
        this.blueExp.visible = false;

        this.redExp = this.game.add.sprite(0, 0, 'redExpl');
        this.redAnim = this.redExp.animations.add('red', [3, 1, 13, 2], 2);
        this.redExp.visible = false;

        this.blueAnim.onComplete.add(this.endGame, this);
        this.redAnim.onComplete.add(this.endGame, this);

        //set up listeners and game
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 0;
        this.game.world.bounds.setTo(0, 0, 1024, 768);

        // start the ship on click
        ready = false;
        this.game.canvas.addEventListener('mousedown', this.mouseLock);

        //setup prefabs
        this.player = new Player(this.game, this.game.world.centerX, 768, 'player');
        this.game.add.existing(this.player);

        this.enemy = new Enemy(this.game, this.game.world.centerX, 0, 'enemy');
        this.game.add.existing(this.enemy);

        // player's bullets
        this.bulletsPlayer = this.game.add.group();
        this.bulletsPlayer.enableBody = true;
        this.bulletsPlayer.physicsBodyType = Phaser.Physics.ARCADE;

        this.bulletsPlayer.createMultiple(50, 'bullet');
        this.bulletsPlayer.setAll('checkWorldBounds', true);
        this.bulletsPlayer.setAll('outOfBoundsKill', true);

        // enemy's bullets
        this.bulletsEnemy = this.game.add.group();
        this.bulletsEnemy.enableBody = true;
        this.bulletsEnemy.physicsBodyType = Phaser.Physics.ARCADE;

        this.bulletsEnemy.createMultiple(50, 'bullet_red');
        this.bulletsEnemy.setAll('checkWorldBounds', true);
        this.bulletsEnemy.setAll('outOfBoundsKill', true);

        this.bombs = this.game.add.group();

        // generate a random number of bombs
        // the number will be an integer bettween 10 and 20
        this.numBombs = this.game.rnd.integerInRange(20, 30);

        for (var i = 0; i < this.numBombs; i++) {
            var bomb = new Bomb(this.game, this.game.rnd.integerInRange(50, 990), this.game.rnd.integerInRange(100, 638));
            //this.game.add.existing(bomb);
            bomb.animations.play('tick', 2, true);

            this.bombs.add(bomb);
        }

        // bring click to play to the top
        this.game.world.bringToTop(clickPlay);

        // initialize the model
        // check if we want to predict or get data
        // console.log(this.game.global.gameType)
        switch (this.game.global.gameType) {
            case 0:
                {
                    this.initModel(files[0]);
                    break;
                }
            case 1:
                {
                    this.initModel(files[1]);
                    break;
                }
            case 2:
                {
                    this.initModel(files[2]);
                    break;
                }
        }
    }

    update() {

        if (ready) {
            this.player.move();
            this.enemy.moveEnemy(2000, 0);

            this.firePlayer();
            this.fireEnemy();
        }

        // collision detection
        this.game.physics.arcade.collide(this.bulletsPlayer, this.enemy, this.onHit, null, this);

        this.game.physics.arcade.collide(this.bulletsPlayer, this.bombs, this.onHit, null, this);

        this.game.physics.arcade.collide(this.bombs, this.bulletsEnemy, this.onHit, null, this);

        this.game.physics.arcade.collide(this.player, this.bulletsEnemy, this.onHit, null, this);

        this.game.physics.arcade.collide(this.bulletsPlayer, this.bulletsEnemy, this.onHit, null, this);
    }

    // end game state
    endGame() {
        this.game.state.start('gameover');
    }

    async initModel(file) {
        try {
            let path = "http://localhost:9966/src/tfjsConverts/" + file + "model.json";
            this.model = await tf.loadLayersModel(path);

            console.log('Model Loaded Succesfully!');
            //console.log(this.model);
        } catch (error) {
            console.log(error);
        }

    }

    // player projectile
    firePlayer() {
        if (this.game.input.activePointer.isDown && this.player.alive && this.game.time.now > nextFirePl) {
            // fire rate
            nextFirePl = this.game.time.now + 500;

            var bullet = this.bulletsPlayer.getFirstDead();
            bullet.reset(this.player.x, this.player.y);
            bullet.rotation = this.player.rotation;

            this.game.physics.arcade.moveToPointer(bullet, 500);
            this.game.sound.play('shot', 1);

            if (this.game.global.gameType !== 3)
                this.dodgeBullet(bullet);
        }
    }

    // naive enemy shooting
    fireEnemy() {
        if (this.enemy.alive && this.player.alive && this.game.time.now > nextFireEn) {
            nextFireEn = this.game.time.now + 500;

            var bullet = this.bulletsEnemy.getFirstDead();
            bullet.reset(this.enemy.x, this.enemy.y);
            bullet.rotation = this.enemy.rotation;

            this.game.physics.arcade.moveToXY(bullet, this.player.x, this.player.y, 500);
            this.game.sound.play('shot', 1);
        }
    }

    // movement after training for ai
    dodgeBullet(bullet) {
        var move = this.predictMove(bullet);

        // move 40px to left or right depending on pred
        this.game.physics.arcade.moveToXY(this.enemy, this.enemy.x - (25 * move), 0, 400);
    }

    // callback collision
    onHit(object1, object2) {

        // kill the objects
        object1.kill();
        object2.kill();

        // explosion if player or enemy
        if ((object1.key === this.player.key || object2.key === this.player.key) && !this.player.alive) {
            this.blueExp.position.setTo(this.player.x, this.player.y - 20);
            this.blueExp.visible = true;
            this.blueExp.animations.play('blue');

            this.game.global.winLose = false;
        }

        if ((object1.key === this.enemy.key || object2.key === this.enemy.key) && !this.enemy.alive) {
            this.redExp.position.setTo(this.enemy.x, this.enemy.y);
            this.redExp.visible = true;
            this.redExp.animations.play('red');

            this.game.global.winLose = true;
        }

        this.game.sound.play('expl');
    }

    predictMove(bullet) {
        if (typeof this.model !== 'undefined') {
            var dataX = [this.enemy.x, bullet.x];

            var pred = this.model.predict(tf.tensor([dataX]));

            // returns the flattened array of the tensor
            var nextMove = pred.dataSync();
            //console.log(nextMove[0]);

            return ((nextMove[0] === 0) ? nextMove[0] - 1 : nextMove[0]);
        }
    }

    mouseLock() {
        ready = true;
        clickPlay.visible = false;
    }
}

export default Game;
