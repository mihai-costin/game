import Player from '../prefabs/player';
import Enemy from '../prefabs/enemy';
import Bullet from '../prefabs/bullet';
import Bomb from '../prefabs/bomb';
import * as getData from '.././getData';

var ready;
var clickPlay;
var fullData = [[]]; // all the movement of the enemy to be used for training
var data; // get the movement of the enemy

class Game extends Phaser.State {

    constructor() {
        super();
    }

    create() {
        // repeat for extracting data for learning
        this.game.global.repeat++;

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
        this.player = new Player(this.game, 0, 0);
        this.game.add.existing(this.player);

        this.enemy = new Enemy(this.game, 1024, 768);
        this.game.add.existing(this.enemy);

        this.bulletPlayer = new Bullet(this.game, 0, 0, 'bullet');
        this.game.add.existing(this.bulletPlayer);

        this.bulletEnemy = new Bullet(this.game, 0, 0, 'bullet_red');
        this.game.add.existing(this.bulletEnemy);

        this.bombs = this.game.add.group();

        // generate a random number of bombs
        // the number will be an integer bettween 10 and 20
        this.numBombs = this.game.rnd.integerInRange(10, 20);

        for (var i = 0; i < this.numBombs; i++) {
            var bomb = new Bomb(this.game, this.game.rnd.integerInRange(100, 900), this.game.rnd.integerInRange(0, 1024));
            //this.game.add.existing(bomb);
            bomb.animations.play('tick', 2, true);

            this.bombs.add(bomb);
        }

        // bring click to play to the top
        this.game.world.bringToTop(clickPlay);
        data = [];
    }

    update() {

        if (ready) {
            if (this.enemy.alive)
                data.push({
                    x: this.enemy.x,
                    y: this.enemy.y
                });
            this.player.move();
            this.firePlayer();
            this.moveEnemy();
            this.fireEnemy(this.player);

            for (var i = 0; i < this.numBombs; i++)
                if (this.game.physics.arcade.distanceBetween(this.enemy, this.bombs.children[i]) < 150)
                    this.fireEnemy(this.bombs.children[i]);
        }

        // collision detection
        this.game.physics.arcade.collide(this.player, this.enemy, this.onHit, null, this);

        this.game.physics.arcade.collide(this.bulletPlayer, this.enemy, this.onHit, null, this);

        this.game.physics.arcade.collide(this.player, this.bombs, this.onHit, null, this);

        this.game.physics.arcade.collide(this.bulletPlayer, this.bombs, this.onHit, null, this);

        this.game.physics.arcade.collide(this.bombs, this.enemy, this.onHit, null, this);

        this.game.physics.arcade.collide(this.bombs, this.bulletEnemy, this.onHit, null, this);

        this.game.physics.arcade.collide(this.player, this.bulletEnemy, this.onHit, null, this);

        this.game.physics.arcade.collide(this.bulletPlayer, this.bulletEnemy, this.onHit, null, this);
    }

    // end game state
    endGame() {
        if (this.game.global.repeat < 2) {
            fullData.push(data);
            this.game.state.start('game');
        } else {
            getData.transferData(data);
            this.game.state.start('gameover');
        }
    }

    // player projectile
    firePlayer() {
        if (this.game.input.activePointer.isDown && !this.bulletPlayer.visible && this.player.alive) {

            this.bulletPlayer.reset(this.player.x, this.player.y);
            this.bulletPlayer.rotation = this.player.rotation;
            this.game.physics.arcade.moveToPointer(this.bulletPlayer, 500);
            this.game.sound.play('shot', 1);
        }
    }

    // naive enemy shooting
    fireEnemy(object) {
        if (!this.bulletEnemy.visible && this.enemy.alive && this.game.physics.arcade.distanceBetween(this.enemy, object) < 300 && object.alive) {
            this.bulletEnemy.reset(this.enemy.x, this.enemy.y);
            this.bulletEnemy.rotation = this.enemy.rotation;
            this.game.physics.arcade.moveToXY(this.bulletEnemy, object.x, object.y, 500);
            this.game.sound.play('shot', 1);
        }
    }

    // naive enemy movement
    moveEnemy() {
        this.enemy.animations.play('move');
        this.enemy.rotation = this.game.physics.arcade.angleBetween(this.enemy, this.player);
        this.game.physics.arcade.moveToXY(this.enemy, this.player.x - 150, this.player.y - 150, 60, 400);
    }

    // callback collision
    onHit(object1, object2) {
        // kill the objects
        object1.kill();
        object2.kill();

        // explosion if player or enemy
        if (object1.key === this.player.key || object2.key === this.player.key) {
            this.blueExp.position.setTo(this.player.x, this.player.y);
            this.blueExp.visible = true;
            this.blueExp.animations.play('blue');
        } else if (object1.key === this.enemy.key || object2.key === this.enemy.key) {
            this.redExp.position.setTo(this.enemy.x, this.enemy.y);
            this.redExp.visible = true;
            this.redExp.animations.play('red');
        }

        // score points for killing bombs = 15
        // 5 points for the enemy bullet
        // or for killing the enemy = 120
        if (object1.key === this.bulletPlayer.key || object2.key === this.bulletPlayer.key) {
            if (object1.key === this.enemy.key || object2.key === this.enemy.key)
                this.game.global.scorePlayer += 120;
            else if (object1.key === this.bulletEnemy.key || object2.key === this.bulletEnemy.key)
                this.game.global.scorePlayer += 5;
            else this.game.global.scorePlayer += 15;
        }

        if (object1.key === this.bulletEnemy.key || object2.key === this.bulletEnemy.key) {
            if (object1.key === this.player.key || object2.key === this.player.key)
                this.game.global.scoreEnemy += 120;
            else if (object1.key === this.bulletPlayer.key || object2.key === this.bulletPlayer.key)
                this.game.global.scoreEnemy += 5;
            else this.game.global.scoreEnemy += 15;
        }

        this.game.sound.play('expl');
    }

    mouseLock() {
        ready = true;
        clickPlay.kill();
    }
}

export default Game;
