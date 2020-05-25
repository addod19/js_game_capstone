import 'phaser';

/* global Phaser */
/* eslint no-undef: "error" */

class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('background', 'assets/sci1.png');
    this.load.image('shooter', 'assets/play.gif');
    this.load.spritesheet('enemy', 'assets/enemy.png', {
      frameWidth: 125,
      frameHeight: 100,
    });
  }

  create() {
    this.scene.start('Preloader');
  }
}

export default BootScene;