/*
 * This state is only for training
 * we have 2 characters prefabs controller by the 'computer' 
 * no sound here
 * get data to learn to dodge bullets
 * we  simulate the dodge
 * input player.x, bulletEnemy.x]
 * output would be 2d [1, 0] or [0, 1] -- [1,0] dodge left, [0,1] dodge right
 * binary classification
 */

import Player from '../prefabs/player';
import Enemy from '../prefabs/enemy';

// no need for bombs here
// all the movement of the player and bullet to be used for training
var dataX = [],
    dataY = [],
    trainLen = 102000;
var nextFireEn = 0;

class gameTrain extends Phaser.State {

    constructor() {
        super();
    }

    create() {

        //add background image
        this.game.add.image(0, 0, 'bgPlay');

        //animations explosions
        this.blueExp = this.game.add.sprite(0, 0, 'blueExpl');
        this.blueAnim = this.blueExp.animations.add('blue', [1, 5, 9, 13], 7);
        this.blueExp.visible = false;

        this.blueAnim.onComplete.add(this.endGame, this);

        //set up listeners and game
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 0;
        this.game.world.bounds.setTo(0, 0, 1024, 768);

        //setup prefabs
        this.player = new Enemy(this.game, this.game.world.centerX, 768, 'player');
        this.game.add.existing(this.player);

        this.enemy = new Enemy(this.game, this.game.world.centerX, 0, 'enemy');
        this.game.add.existing(this.enemy);

        // enemy's bullets
        this.bulletsEnemy = this.game.add.group();
        this.bulletsEnemy.enableBody = true;
        this.bulletsEnemy.physicsBodyType = Phaser.Physics.ARCADE;

        this.bulletsEnemy.createMultiple(50, 'bullet_red');
        this.bulletsEnemy.setAll('checkWorldBounds', true);
        this.bulletsEnemy.setAll('outOfBoundsKill', true);

        this.player.angle = 270;
        // repeat number text
        this.repeatTxt = this.game.add.text(100, 10, "Repeat: " + this.game.global.repeat, {
            font: '34px Arial',
            fill: '#fff'
        });

        // ---
        if (this.game.global.repeat < 1) {
            console.log("Starting to gather data!");
            console.log("...");
        }
    }

    update() {
        // save [bullet.x, player.x]
        // based on this we are going to make our prediction regarding the movement of the ai

        this.enemy.moveEnemy(500, 0);
        this.player.moveEnemy(500, 768);

        for (var i = 0; i < this.bulletsEnemy.length; i++) {
            if (this.bulletsEnemy.children[i].alive && Math.abs(this.bulletsEnemy.children[i].x - this.player.x) <= 60) {
                this.saveData(this.player, this.bulletsEnemy.children[i]);
            }
        }

        if (nextFireEn < this.game.time.now) {
            nextFireEn = this.game.time.now + 500;
            this.fireEnemy(this.enemy, this.player, this.bulletsEnemy);
        }

        this.repeatTxt.text = "Repeat: " + this.game.global.repeat;

        // collision detection
        this.game.physics.arcade.collide(this.player, this.bulletsEnemy, this.onHit, null, this);
    }

    render() {
        this.game.debug.spriteCoords(this.player, 32, 100);
    }

    // end game state
    endGame() {
        // repeat for getting more training data
        if (this.game.global.repeat <= trainLen) {
            this.game.state.start('gameTrain');
        } else {
            this.transferData();
            this.game.state.start('gameover');
        }
    }

    // naive enemy shooting
    fireEnemy() {
        if (this.enemy.alive && this.player.alive) {

            var bullet = this.bulletsEnemy.getFirstDead();
            bullet.reset(this.enemy.x, this.enemy.y);
            bullet.rotation = this.enemy.rotation;
            this.game.physics.arcade.moveToXY(bullet, this.player.x, this.player.y, 500);
        }
    }

    // callback collision
    onHit(object1, object2) {
        // kill the objects
        object1.kill();
        object2.kill();

        // explosion
        if ((object1.key === this.player.key || object2.key === this.player.key) && !this.player.alive) {
            this.blueExp.position.setTo(this.player.x, this.player.y - 20);
            this.blueExp.visible = true;
            this.blueExp.animations.play('blue');
        }
    }

    saveData(player, bullet) {
        // check if would still run
        if (this.game.global.repeat <= trainLen) {
            // current data are in here
            dataX = [player.x, bullet.x];
            var index = (player.x - bullet.x <= 0) ? 0 : 1;

            this.game.trainingData[index].push(dataX);

            // how many frames were saved
            this.game.global.repeat++;
        } else {
            console.log("Gathering ending...");
            this.endGame();
        }
    }

    transferData() {
        // separate data 
        // and create targets
        dataX = [];
        dataY = [];

        console.log("0: %d 1: %d", this.game.trainingData[0].length, this.game.trainingData[1].length);
        var len = Math.min(this.game.trainingData[0].length, this.game.trainingData[1].length);

        for (var i = 0; i < 2; i++) {
            var data = this.game.trainingData[i].slice(0, len);

            for (var j = 0; j < data.length; j++) {
                dataX.push(data[j]);
                dataY.push([i == 0 ? 1 : 0]);
            }
        }

        console.log(dataX);
        console.log(dataY)
        console.log("Retriving data...");
        var a = document.createElement("a");
        var file = new Blob([JSON.stringify({
            x: dataX,
            y: dataY
        })], {
            type: 'application/json'
        });
        a.href = URL.createObjectURL(file);
        a.download = 'trainingData.json';
        a.click();
    }
}

export default gameTrain;
