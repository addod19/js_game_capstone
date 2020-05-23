import 'phaser';

class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('background', 'assets/sci1.png');
    this.load.image('plane', 'assets/play.gif');
    this.load.spritesheet('birds', 'assets/enemy.png', {
      frameWidth: 125,
      frameHeight: 100,
    });
  }

  create() {
    this.scene.start('Preloader');
  }
}

export default BootScene;