class Enemy extends Phaser.Sprite {
  constructor(game, x, y, frame) {
    super(game, x, y, 'enemy', frame);

    this.anchor.setTo(0.5, 0.5);
      
    // etup physics properties
    if (this.game.physics.arcade) this.game.physics.arcade.enableBody(this); 
    
  }

  update() {
    this.x = this.game.input.mousePointer.x;
    this.y = this.game.input.mousePointer.y;
  }
}

export default Crosshairs;
