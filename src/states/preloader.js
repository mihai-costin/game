class Preloader extends Phaser.State {

  constructor() {
    super();
  }

  preload() {
    // setup loading and its events
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.loadResources();
  }

  loadResources() {
   
    this.game.load.image('bgPlay', 'assets/bg_play.png');
    this.game.load.image('bullet', 'assets/bullet.png');
    this.game.load.image('bullet_red', 'assets/bullet_red.png');

    // menu screen
    this.game.load.spritesheet('play', 'assets/spritesheets/menu_screen/play.png', 200, 200);
    this.game.load.spritesheet('option', 'assets/spritesheets/menu_screen/options.png', 200, 200);
    this.game.load.spritesheet('credit', 'assets/spritesheets/menu_screen/credits.png', 200, 200);
    this.game.load.spritesheet('exit', 'assets/spritesheets/menu_screen/exit.png', 200, 200);  
      
    // characters & effects
    this.game.load.spritesheet('player', 'assets/spritesheets/player/player.png', 56, 56, 9);
    this.game.load.spritesheet('enemy', 'assets/spritesheets/enemy/enemy.png', 59, 59, 2);
    this.game.load.spritesheet('blueExpl', 'assets/spritesheets/blue_explosion/blue_explosion.png', 60, 60, 16);
    this.game.load.spritesheet('redExpl', 'assets/spritesheets/red_explosion/red_explosion.png', 60, 50, 16);
      
    // audio
    this.game.load.audio('shot','assets/audio/NovaShot.mp3');
    this.game.load.audio('expl', 'assets/audio/explosion_01.mp3');
    this.game.load.audio('selNoise', 'assets/audio/selectNoise.wav');
    this.game.load.audio('track1', 'assets/audio/Ove Melaa - Dark Blue.mp3');
    this.game.load.audio('track2', 'assets/audio/Ove Melaa - High Stakes,Low Chances.mp3');
  }

  onLoadComplete() {
    this.game.state.start('menu');
  }
}

export default Preloader;
