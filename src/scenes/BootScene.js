import 'phaser';

/* global phaser */
/* eslint no-undef: 'error' */
/* eslint import/no-unresolved: 'error' */

const BootScene = class extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('background', 'assets/sci1.png');

    this.load.image('sprLaserPlayer', 'assets/content/laserGreen.png');
    this.load.image('sprPlayer', 'assets/content/player.png');
    
    this.load.image('sprEnemy1', 'assets/content/enemyShip.png');
    this.load.image('sprEnemy2', 'assets/content/enemyUFO.png');  
    this.load.image('sprLaserEnemy0', 'assets/content/laserRed.png');

    this.load.spritesheet('sprEnemy2', 'assets/content/enemyUFO.png', {
      frameWidth: 125,
      frameHeight: 100,
    });
  }

  create() {
    this.scene.start('Preloader');
  }
};

export default BootScene;